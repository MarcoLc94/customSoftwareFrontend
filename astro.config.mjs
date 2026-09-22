import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://marcodev.com.mx', output: 'static', trailingSlash: 'never', build: { format: 'directory' } });
