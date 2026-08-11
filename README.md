# Project Aurora

Archivo multimedia en español sobre el fenómeno OVNI / UAP: expedientes de casos,
mapa global de avistamientos, catálogo de cine y series, biblioteca de libros y
divulgadores, canales de YouTube y un radar de noticias en tiempo casi real.

React 19 + TypeScript + Vite + Tailwind, desplegado en Vercel.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # comprueba tipos y compila a dist/
npm run lint     # oxlint
```

El feed de noticias y el contador de visitas se sirven desde funciones
serverless (`api/`), así que en local necesitan `vercel dev` en lugar de
`npm run dev`. Sin ellas el sitio funciona igual: el radar aparece vacío y el
contador queda oculto.

## Variables de entorno

Todas son opcionales; están documentadas en `.env.example`. El sitio vive en
<https://fernicher-ufo.vercel.app>, que es el valor por defecto del build. Ese
dominio alimenta las URLs absolutas de las etiquetas Open Graph, el canonical,
el `sitemap.xml` y el `robots.txt`; para publicar en otro, define `SITE_URL`.

## De dónde salen las imágenes

No se almacena ninguna fotografía en el repositorio. Las carátulas y los retratos
se piden en el momento a APIs públicas sin clave:

- **Wikipedia** (`useWikiPoster`) para películas, casos, divulgadores e
  investigadores. Acepta `Titulo`, que busca en inglés y reintenta en español, o
  un prefijo explícito `es:` / `en:`.
- **Open Library** (`useBookData`) para las portadas de los libros.
- **YouTube Data API** para los avatares de los canales, vía `api/channel-avatars`.
  Necesita `YOUTUBE_API_KEY`; sin ella las tarjetas usan el monograma.

Si una petición falla, la tarjeta cae a su icono ilustrado. Los casos sin
artículo propio pueden declarar `wikiPlace`: se muestra la foto del lugar, y
siempre con una etiqueta que aclara que es la ubicación y no el suceso.

## Ilustraciones

La portada y las cabeceras de sección (`PageHero`) son SVG dibujado a mano y
animado con CSS, sin dependencias ni imágenes externas. Toda animación se
desactiva con `prefers-reduced-motion`.

`public/og.jpg` es la vista previa al compartir el enlace: se genera capturando
la portada a 1200×630.
