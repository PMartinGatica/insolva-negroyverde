// Pipeline de frames para la secuencia scroll-driven del hero.
//
// Uso:
//   node scripts/build-frames.mjs <video> <nombre-secuencia> [nFrames]
//   node scripts/build-frames.mjs assets/source/casa-construccion.mp4 construccion 120
//
// Extrae N frames uniformes del video con ffmpeg, y genera dos juegos WebP
// (desktop 1440px, mobile 720px) en public/frames/<secuencia>/<desktop|mobile>/.
// Impone un presupuesto DURO de peso por secuencia y falla si se supera.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

// ── Config ──────────────────────────────────────────────────────────────
const WIDTHS = { desktop: 1440, mobile: 720 };
const WEBP_QUALITY = 70;
const BUDGET_MB = { desktop: 6, mobile: 2.5 }; // presupuesto duro por juego
const SCRATCH = join(os.tmpdir(), 'insolva-frames-tmp');

// ffmpeg: intentar PATH y fallback al binario de winget
function findFfmpeg() {
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return 'ffmpeg'; }
  catch {}
  const wingetGlob = join(
    os.homedir(),
    'AppData/Local/Microsoft/WinGet/Packages'
  );
  try {
    const dirs = readdirSync(wingetGlob).filter((d) => d.startsWith('Gyan.FFmpeg'));
    for (const d of dirs) {
      const base = join(wingetGlob, d);
      const sub = readdirSync(base).find((x) => x.startsWith('ffmpeg'));
      if (sub) {
        const bin = join(base, sub, 'bin', 'ffmpeg.exe');
        if (existsSync(bin)) return bin;
      }
    }
  } catch {}
  throw new Error('ffmpeg no encontrado (ni en PATH ni en winget).');
}

// ffprobe vive junto al binario de ffmpeg
function findFfprobe(ffmpegBin) {
  if (ffmpegBin === 'ffmpeg') return 'ffprobe';
  return ffmpegBin.replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1');
}

function probeVideo() {
  const out = execFileSync(FFPROBE, [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'format=duration',
    '-show_entries', 'stream=width,height,nb_frames',
    '-of', 'default=noprint_wrappers=1',
    videoPath,
  ], { encoding: 'utf8' }).toString();
  const num = (key) => {
    const m = out.match(new RegExp('^' + key + '=([\\d.]+)', 'm'));
    return m ? parseFloat(m[1]) : null;
  };
  return { duration: num('duration'), width: num('width'), nbFrames: num('nb_frames') };
}

// ── Args ────────────────────────────────────────────────────────────────
const [, , videoArg, seqName, nFramesArg] = process.argv;
if (!videoArg || !seqName) {
  console.error('Uso: node scripts/build-frames.mjs <video> <secuencia> [nFrames]');
  process.exit(1);
}
const videoPath = resolve(videoArg);
const nFrames = Number(nFramesArg) || 120;
if (!existsSync(videoPath)) {
  console.error('No existe el video:', videoPath);
  process.exit(1);
}

const FFMPEG = findFfmpeg();
const FFPROBE = findFfprobe(FFMPEG);
const SRC = probeVideo();
const outRoot = resolve('public/frames', seqName);

// Nunca pedir más frames de los que tiene el video: sólo generaría duplicados.
const FRAMES = SRC.nbFrames ? Math.min(nFrames, SRC.nbFrames) : nFrames;
if (FRAMES < nFrames) {
  console.warn(`⚠ El video tiene ${SRC.nbFrames} frames: se usan ${FRAMES} en vez de ${nFrames}.`);
}

// ── 1. Extraer PNG uniformes con ffmpeg ─────────────────────────────────
function extractPngs() {
  rmSync(SCRATCH, { recursive: true, force: true });
  mkdirSync(SCRATCH, { recursive: true });

  const fps = SRC.duration ? FRAMES / SRC.duration : 30; // fps que produce ~FRAMES muestras uniformes
  const extractW = Math.min(WIDTHS.desktop, SRC.width || WIDTHS.desktop);
  console.log(`→ Extrayendo ~${FRAMES} frames a ${extractW}px (fps=${fps.toFixed(2)})...`);
  execFileSync(FFMPEG, [
    '-y', '-i', videoPath,
    '-vf', `fps=${fps},scale=${extractW}:-2:flags=lanczos`,
    '-vsync', 'vfr',
    join(SCRATCH, 'raw-%04d.png'),
  ], { stdio: 'ignore' });

  return readdirSync(SCRATCH).filter((f) => f.endsWith('.png')).sort();
}

// ── 2. Convertir a WebP en dos tamaños con presupuesto ──────────────────
async function buildSet(pngs, variant) {
  const width = Math.min(WIDTHS[variant], SRC.width || WIDTHS[variant]);
  const dir = join(outRoot, variant);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  let total = 0;
  let quality = WEBP_QUALITY;

  for (let attempt = 0; attempt < 4; attempt++) {
    total = 0;
    for (let i = 0; i < pngs.length; i++) {
      const src = join(SCRATCH, pngs[i]);
      const out = join(dir, `frame-${String(i + 1).padStart(4, '0')}.webp`);
      await sharp(src).resize({ width }).webp({ quality }).toFile(out);
      total += statSync(out).size;
    }
    const mb = total / (1024 * 1024);
    if (mb <= BUDGET_MB[variant]) {
      console.log(`  [${variant}] ${pngs.length} frames · calidad ${quality} · ${mb.toFixed(2)} MB · media ${(total / pngs.length / 1024).toFixed(1)} KB ✓`);
      return;
    }
    console.log(`  [${variant}] ${mb.toFixed(2)} MB > ${BUDGET_MB[variant]} MB — bajando calidad y reintentando...`);
    quality -= 12;
    if (quality < 35) break;
  }
  throw new Error(`[${variant}] no se pudo bajar del presupuesto de ${BUDGET_MB[variant]} MB. Reducí nFrames o resolución.`);
}

// ── Run ─────────────────────────────────────────────────────────────────
const pngs = extractPngs();
if (!pngs.length) { console.error('ffmpeg no produjo frames.'); process.exit(1); }
console.log(`✓ ${pngs.length} PNG extraídos.`);

await buildSet(pngs, 'desktop');
await buildSet(pngs, 'mobile');

rmSync(SCRATCH, { recursive: true, force: true });
console.log(`\n✓ Listo. Frames en public/frames/${seqName}/ (${pngs.length} por juego).`);
console.log(`  Recordá poner FRAME_COUNT = ${pngs.length} en el componente ScrollSequence.`);
