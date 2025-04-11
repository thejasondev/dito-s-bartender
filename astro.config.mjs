import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://ditos-bartender.vercel.app/",
  integrations: [
    tailwind(),
    icon(),
    react(),
    sitemap(),
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
