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

`public/og.jpg` es la vista previa de la portada al compartir el enlace: se
genera capturando el encabezado a 1200×630.

El resto de las páginas genera la suya en el build (`build/og.mjs`): satori
maqueta el texto y lo pasa a trazos con Space Grotesk e Inter —las fuentes
salen de `node_modules`, no hay binarios versionados— y resvg lo rasteriza a
PNG en `dist/og/`. Cada ruta declara su titular en el campo `og` de
`src/data/seo.ts`; sin él se usa el `title` recortado.

Se hace en el build y no en tiempo de ejecución a propósito: una función que
dibuje la imagen al vuelo sólo se puede probar una vez desplegada, mientras que
esto se verifica en local, no agrega funciones al proyecto y sirve archivos
estáticos. Son 63 imágenes, unos 33 KB cada una y unos 4 s de build.

## Buzón de sugerencias

El pie de página incluye una caja plegada que envía a `api/feedback`. Lo que
llega **no se publica**: se guarda en el mismo Upstash del contador de visitas y
sólo lo lee quien mantiene el archivo. Por eso no hay moderación pública que
hacer ni riesgo de que aparezca spam a la vista.

Defensas: un campo trampa invisible que sólo rellenan los bots, límite de cinco
envíos por día y remitente, y topes de longitud. Si Upstash no está configurado,
la función responde `configured:false` y la caja desaparece sola.

Para leer lo recibido, define `FEEDBACK_TOKEN` y abre:

```
https://fernicher-ufo.vercel.app/api/feedback?token=EL_TOKEN
```

Sin esa variable la lectura devuelve 404 y los mensajes sólo se ven desde la
consola de Upstash.

## Envío de avistamientos

`/reportar` incluye un formulario que manda a `api/avistamiento` y guarda en la
lista `aurora:avistamientos` del mismo Upstash. **Nada se publica solo**: cada
relato queda con `estado: 'pendiente'` a la espera de que alguien lo lea y lo
contraste.

Esa separación no es un detalle de implementación: un testimonio sin verificar
no es un expediente. Si alguna vez se publican, tienen que salir claramente
marcados como testimonios sin verificar y en un espacio propio, distinto de los
expedientes documentados. Mezclarlos costaría la credibilidad del archivo
entero, que es su mayor activo.

No se admiten archivos subidos, sólo un enlace al video o la foto: alojar
material ajeno traería almacenamiento, moderación y responsabilidad legal que el
proyecto no puede sostener.

Defensas: campo trampa invisible, tres envíos por día y remitente, topes de
longitud por campo, validación de fecha (ni futura ni anterior a 1900), de hora
y de enlace (`http://` o `https://`), y casilla de consentimiento obligatoria —
sin ella el envío se rechaza, porque es lo que habilita a publicarlo después.

Para leer lo recibido, con el mismo `FEEDBACK_TOKEN`:

```
https://fernicher-ufo.vercel.app/api/avistamiento?token=EL_TOKEN
```

## Opinión de los lectores

Cada expediente lleva un termómetro de tres opciones (`api/reaccion`, hash
`aurora:reacciones:<caso>` en el mismo Upstash). Los porcentajes aparecen recién
después de votar, para no anclar la respuesta.

Está deliberadamente separado de la clasificación de evidencia **A/B/C**, que se
asigna por la documentación disponible. La pregunta es «¿qué te parece este
caso?», no «¿es creíble?»: un caso no está mejor documentado porque le guste a
más gente, y si se confunden las dos cosas el archivo pasa a ser una encuesta de
popularidad.

Defensas: el id del caso se valida contra un patrón antes de tocar Redis, hay un
tope de 40 votos por día y remitente, y el voto se recuerda en el navegador. No
es infalible —quien quiera votar dos veces puede— pero alcanza para un
termómetro.

## De avistamiento recibido a testimonio publicado

`/testimonios` es donde sale lo que se acepta. Se llena a mano desde
`src/data/testimonios.ts`, y el paso manual es deliberado: nadie publica sin
leer, decidir y escribir qué se pudo contrastar.

```bash
npm run avistamientos -- --token=EL_TOKEN
```

Baja lo pendiente y lo imprime ya con la forma que espera el archivo de datos.
Se pega la entrada, se recorta el relato si hace falta, se agrega el `pais` y se
escribe la `nota`. **Sin `nota` no se publica**: es lo que separa un archivo de
un muro de mensajes, y muchas veces dirá simplemente que no se pudo verificar
nada.

La sección entera cuelga de un solo interruptor, `hayTestimonios`. Con el array
vacío la ruta redirige a `/reportar`, el enlace no aparece en el menú y la URL
no entra al sitemap ni recibe HTML propio: no hay forma de publicar una página
vacía por descuido. Al pegar el primer testimonio se enciende todo solo.

Los testimonios se ven distintos de los expedientes a propósito —sin fotos, con
la marca de «sin verificar» encima del relato y la nota del archivo aparte—.
Si alguno consigue respaldo documental deja de ser un testimonio y pasa a
`cases.ts` como expediente.
