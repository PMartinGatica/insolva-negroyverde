import { BRAND } from "./constants";

interface WhatsAppLinkOptions {
  message?: string;
  source?: "hero" | "pilar-ingenieria" | "pilar-seguridad" | "contacto" | "float" | "general";
}

const MESSAGES: Record<string, string> = {
  hero: "Hola INSOLVA, quiero planificar mi sistema de seguridad.",
  "pilar-ingenieria": "Hola INSOLVA, quiero hablar de un proyecto de ingeniería.",
  "pilar-seguridad": "Hola INSOLVA, quiero un presupuesto de seguridad electrónica.",
  contacto: "Hola INSOLVA, vi su web y quiero coordinar una visita para mi proyecto.",
  float: "Hola INSOLVA, quiero más información sobre seguridad electrónica.",
  general: "Hola INSOLVA, quiero más información.",
};

export function whatsappLink({ message, source = "general" }: WhatsAppLinkOptions = {}) {
  const finalMsg = message ?? MESSAGES[source] ?? MESSAGES.general;
  const text = encodeURIComponent(finalMsg + "\n");
  return `https://wa.me/${BRAND.whatsapp}?text=${text}`;
}
