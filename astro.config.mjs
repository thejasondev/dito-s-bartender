import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon()],
	vite: {
		server: {
		  allowedHosts: ['5258-155-94-247-218.ngrok-free.app', 'localhost']
		}
	}
});
