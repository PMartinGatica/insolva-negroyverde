import { BRAND } from "./constants";

interface WhatsAppLinkOptions {
  message?: string;
  source?: "hero" | "pilar-ingenieria" | "contacto" | "float" | "general";
}

const MESSAGES: Record<string, string> = {
  hero: "Hola INSOLVA, quiero más información.",
  "pilar-ingenieria": "Hola, quiero hablar de ingeniería de procesos.",
  contacto: "Hola INSOLVA, vi su web y quiero coordinar una reunión.",
  float: "Hola INSOLVA, quiero más información.",
  general: "Hola INSOLVA, quiero más información.",
};

export function whatsappLink({ message, source = "general" }: WhatsAppLinkOptions = {}) {
  const finalMsg = message ?? MESSAGES[source] ?? MESSAGES.general;
  const utm = `\n\n[ref: ${source}]`;
  const text = encodeURIComponent(finalMsg + utm);
  return `https://wa.me/${BRAND.whatsapp}?text=${text}`;
}
