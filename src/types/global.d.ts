// Definición de tipos global para Google Analytics
interface Window {
  dataLayer: any[];
  gtag: (
    command: "event" | "config" | "consent" | "js" | "set",
    target: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
}
