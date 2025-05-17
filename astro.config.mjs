import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://ditos-bartender.vercel.app/",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    icon(),
    react(),
    sitemap({
      // Configuración del sitemap para incluir URLs en varios idiomas
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          es: "es-ES",
        },
      },
    }),
    partytown({
      // Configuración para permitir que los scripts de Google Analytics se ejecuten con Partytown
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],
  vite: {
    server: {},
  },
});
