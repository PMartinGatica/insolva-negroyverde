import { BRAND } from "./constants";

interface WhatsAppLinkOptions {
  message?: string;
  source?: "hero" | "pilar-ingenieria" | "pilar-seguridad" | "contacto" | "float" | "general";
}

const MESSAGES: Record<string, string> = {
  hero: "Hola INSOLVA, quiero un presupuesto para mi casa/negocio en Ushuaia.",
  "pilar-ingenieria": "Hola INSOLVA, quiero hablar de un proyecto de ingeniería.",
  "pilar-seguridad": "Hola INSOLVA, quiero un presupuesto de cámaras y alarmas.",
  contacto: "Hola INSOLVA, quiero un presupuesto para mi casa, negocio u obra en Ushuaia (seguridad, electricidad o automatización).",
  float: "Hola INSOLVA, quiero más información sobre sus servicios.",
  general: "Hola INSOLVA, quiero más información.",
};

export function whatsappLink({ message, source = "general" }: WhatsAppLinkOptions = {}) {
  const finalMsg = message ?? MESSAGES[source] ?? MESSAGES.general;
  const text = encodeURIComponent(finalMsg + "\n");
  return `https://wa.me/${BRAND.whatsapp}?text=${text}`;
}
