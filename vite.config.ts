import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

/** Rutas fijas del menú, en orden de importancia para el buscador. */
const STATIC_ROUTES = [
  '/', '/expedientes', '/mapa', '/catalogo', '/noticias',
  '/biblioteca', '/canales', '/investigadores', '/timeline', '/favoritos',
];

/**
 * Las etiquetas Open Graph necesitan URLs absolutas: WhatsApp, X y Telegram no
 * resuelven rutas relativas. El dominio se toma de SITE_URL (o VITE_SITE_URL);
 * si no está definido, se usa el de producción por defecto.
 */
const FALLBACK_SITE_URL = 'https://fernicher-ufo.vercel.app';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL || env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '');

  return {
    plugins: [
      react(),
      {
        name: 'aurora-site-url',
        transformIndexHtml(html: string) {
          return html.replaceAll('%SITE_URL%', siteUrl);
        },
      },
      {
        // Se generan en el build para que las URLs absolutas salgan del mismo
        // SITE_URL que las etiquetas Open Graph y no se desincronicen.
        name: 'aurora-sitemap',
        apply: 'build',
        generateBundle() {
          // Se leen los identificadores del fichero de datos en vez de importarlo:
          // vite.config se compila con resolución node16 y el import daría error.
          const source = readFileSync('src/data/cases.ts', 'utf8');
          const caseIds = [...source.matchAll(/^\s*\{ id: '([^']+)'/gm)].map((m) => m[1]);
          const urls = [...STATIC_ROUTES, ...caseIds.map((id) => `/expedientes/${id}`)];
          const sitemap = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`),
            '</urlset>',
            '',
          ].join('\n');

          const robots = [
            'User-agent: *',
            'Allow: /',
            '',
            `Sitemap: ${siteUrl}/sitemap.xml`,
            '',
          ].join('\n');

          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
          this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
        },
      },
    ],
  };
})
