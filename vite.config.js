import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    allowedHosts: ['5258-155-94-247-218.ngrok-free.app', 'localhost']
  },
  plugins: [
    tailwindcss(),
  ],
});