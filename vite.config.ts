import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { routeMetas } from './src/data/seo'

/**
 * Las etiquetas Open Graph necesitan URLs absolutas: WhatsApp, X y Telegram no
 * resuelven rutas relativas. El dominio se toma de SITE_URL (o VITE_SITE_URL);
 * si no está definido, se usa el de producción por defecto.
 */
const FALLBACK_SITE_URL = 'https://fernicher-ufo.vercel.app';

const escapeAttr = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Sustituye el contenido de una etiqueta meta ya presente en la plantilla. */
function setMeta(html: string, selector: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`No encuentro la etiqueta meta ${selector} en index.html`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL || env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '');
  let outDir = 'dist';

  return {
    plugins: [
      react(),
      {
        name: 'aurora-site-url',
        configResolved(config) {
          outDir = config.build.outDir;
        },
        transformIndexHtml(html: string) {
          return html.replaceAll('%SITE_URL%', siteUrl);
        },
      },
      {
        /**
         * Un HTML por ruta, cada uno con su título, descripción, canonical,
         * Open Graph y datos estructurados. La aplicación sigue siendo la misma
         * SPA; esto sólo arregla lo que ven los rastreadores, que no ejecutan
         * JavaScript. Vercel sirve el fichero estático antes de aplicar el
         * rewrite a index.html, así que cada URL entrega su propia versión.
         */
        name: 'aurora-paginas-estaticas',
        apply: 'build',
        closeBundle() {
          const plantilla = readFileSync(join(outDir, 'index.html'), 'utf8');
          const metas = routeMetas(siteUrl);

          for (const meta of metas) {
            const url = `${siteUrl}${meta.path}`;
            let html = plantilla
              .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
              .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(url)}$2`);

            html = setMeta(html, 'name="description"', meta.description);
            html = setMeta(html, 'property="og:url"', url);
            html = setMeta(html, 'property="og:title"', meta.title);
            html = setMeta(html, 'property="og:description"', meta.description);
            html = setMeta(html, 'name="twitter:title"', meta.title);
            html = setMeta(html, 'name="twitter:description"', meta.description);

            if (meta.noindex) {
              html = html.replace('</head>', '  <meta name="robots" content="noindex, follow" />\n  </head>');
            }

            if (meta.jsonLd) {
              const datos = JSON.stringify({ '@context': 'https://schema.org', ...meta.jsonLd })
                .replace(/</g, '\\u003c');
              html = html.replace('</head>', `  <script type="application/ld+json">${datos}</script>\n  </head>`);
            }

            // La portada reescribe el index.html; el resto va a su propia carpeta
            const destino = meta.path === '/' ? join(outDir, 'index.html') : join(outDir, meta.path, 'index.html');
            mkdirSync(dirname(destino), { recursive: true });
            writeFileSync(destino, html);
          }

          // Lo que no se indexa tampoco se ofrece al buscador
          const urls = metas.filter((m) => !m.noindex).map((m) => m.path);
          const sitemap = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`),
            '</urlset>',
            '',
          ].join('\n');

          const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n');

          writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
          writeFileSync(join(outDir, 'robots.txt'), robots);
        },
      },
    ],
  };
})
