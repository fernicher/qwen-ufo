import { ufoCases } from './cases';
import { catalog } from './catalog';
import { investigators } from './investigators';
import { books } from './books';
import { channels } from './channels';
import { testimonios } from './testimonios';

/**
 * Metadatos por ruta. Se consumen en el build (vite.config.ts) para escribir un
 * HTML por URL con su propio título, descripción y etiquetas Open Graph.
 *
 * Hace falta porque los rastreadores de WhatsApp, X, Telegram y Facebook no
 * ejecutan JavaScript: sin esto, todas las URLs comparten la tarjeta de la
 * portada y el mismo <title>.
 */

export interface RouteMeta {
  /** Ruta absoluta, empezando por barra. */
  path: string;
  title: string;
  description: string;
  /** Datos estructurados schema.org, ya listos para serializar. */
  jsonLd?: Record<string, unknown>;
  /** Páginas sin contenido propio para un buscador: se excluyen del índice y del sitemap. */
  noindex?: boolean;
}

const SITE_NAME = 'Project Aurora';
const year = (date: string) => date.slice(0, 4);

/** Recorta al límite que muestran los buscadores, sin cortar palabras por la mitad. */
function clamp(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[.,;:]$/, '') + '…';
}

function breadcrumbs(siteUrl: string, trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${siteUrl}${t.path}`,
    })),
  };
}

export function routeMetas(siteUrl: string): RouteMeta[] {
  const paises = new Set(ufoCases.map((c) => c.country)).size;

  /**
   * Cada ruta apunta a una búsqueda distinta, con el término por delante y la
   * marca fuera: un sitio nuevo no tiene búsquedas por su nombre. Los títulos se
   * mantienen por debajo de 60 caracteres y las descripciones por debajo de 158,
   * que es lo que llegan a mostrar los buscadores.
   */
  const estaticas: RouteMeta[] = [
    {
      path: '/',
      title: `Archivo OVNI y UAP en español — ${ufoCases.length} casos documentados`,
      description: `Expedientes de ${ufoCases.length} casos OVNI en ${paises} países, mapa global de avistamientos, películas y documentales, biblioteca y noticias del fenómeno UAP.`,
      jsonLd: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: `${siteUrl}/`,
        inLanguage: 'es',
        description: 'Archivo multimedia en español sobre el fenómeno OVNI/UAP.',
      },
    },
    {
      path: '/expedientes',
      title: `Casos OVNI: ${ufoCases.length} expedientes desclasificados`,
      description: `Investigaciones detalladas de ${ufoCases.length} casos OVNI en ${paises} países: testigos, documentos oficiales, hipótesis y la respuesta de cada gobierno.`,
    },
    {
      path: '/mapa',
      title: 'Mapa mundial de avistamientos OVNI y UAP',
      description: `Los ${ufoCases.length} casos del archivo situados en el mapa y filtrables por tipo de encuentro y por la escala de Hynek. Explora los avistamientos país por país.`,
    },
    {
      path: '/catalogo',
      title: `Películas y documentales de OVNIs — ${catalog.length} títulos`,
      description: `Selección curada de ${catalog.length} películas, series y documentales sobre OVNIs y UAP, del cine clásico de platillos volantes a las investigaciones actuales.`,
    },
    {
      path: '/noticias',
      title: 'Noticias OVNI y UAP de hoy, en español',
      description: 'Últimas noticias del fenómeno OVNI/UAP agregadas en tiempo casi real desde prensa, Reddit y Bluesky, con las fuentes en español priorizadas.',
    },
    {
      path: '/biblioteca',
      title: 'Libros sobre OVNIs, podcasts y archivos desclasificados',
      description: `${books.length} libros de referencia, podcasts, divulgadores y los archivos OVNI desclasificados por ocho gobiernos, de España a Brasil.`,
    },
    {
      path: '/canales',
      title: 'Canales de YouTube sobre OVNIs en español e inglés',
      description: `${channels.length} canales recomendados para seguir el fenómeno OVNI/UAP: divulgación, investigación y análisis de casos.`,
    },
    {
      path: '/investigadores',
      title: 'Investigadores OVNI: Hynek, Vallée y referentes en español',
      description: `Las ${investigators.length} figuras que documentaron, analizaron o divulgaron el fenómeno OVNI: biografías, obras y los casos que investigó cada una.`,
    },
    {
      path: '/timeline',
      title: 'Historia del fenómeno OVNI: cronología desde Roswell',
      description: 'Casos, desclasificaciones e hitos culturales desde Roswell en 1947 hasta los informes de AARO, ordenados año por año.',
    },
    {
      path: '/escala-hynek',
      title: 'Escala de Hynek: encuentros cercanos del 1º, 2º y 3º tipo',
      description: 'Qué significa cada tipo de encuentro cercano según la clasificación de J. Allen Hynek, explicado con casos reales del archivo.',
    },
    {
      path: '/reportar',
      title: 'Cómo reportar un avistamiento OVNI paso a paso',
      description: 'Qué descartar primero, qué anotar mientras ocurre, cómo grabar para que el video sirva y a qué organismo oficial acudir en cada país.',
    },
    // Mientras no haya relatos publicados no hay página: no entra al sitemap ni
    // se le escribe HTML propio, para no ofrecer a los buscadores una URL vacía
    ...(testimonios.length > 0
      ? [
          {
            path: '/testimonios',
            title: `Testimonios de avistamientos OVNI contados por testigos`,
            description: clamp(
              `${testimonios.length} relatos de avistamientos enviados por quienes los presenciaron, publicados sin verificar y con una nota sobre lo que se pudo contrastar en cada caso.`,
            ),
            jsonLd: {
              '@type': 'CollectionPage',
              inLanguage: 'es',
              name: 'Testimonios de avistamientos',
              description: 'Relatos de avistamientos enviados por el público, publicados sin verificar.',
              breadcrumb: breadcrumbs(siteUrl, [
                { name: 'Inicio', path: '/' },
                { name: 'Testimonios', path: '/testimonios' },
              ]),
            },
          },
        ]
      : []),
    {
      // Depende del navegador de cada visitante: para un buscador siempre está vacía
      path: '/favoritos',
      title: 'Mis favoritos',
      description: 'Los títulos del catálogo que guardaste en este navegador.',
      noindex: true,
    },
  ];

  const casos: RouteMeta[] = ufoCases.map((c) => ({
    path: `/expedientes/${c.id}`,
    title: `${c.title} (${year(c.date)}) — Expediente OVNI en ${c.country}`,
    description: clamp(c.description),
    jsonLd: {
      '@type': 'Article',
      headline: c.title,
      description: clamp(c.description),
      inLanguage: 'es',
      mainEntityOfPage: `${siteUrl}/expedientes/${c.id}`,
      about: {
        '@type': 'Event',
        name: c.title,
        startDate: c.date,
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: c.location,
          address: { '@type': 'PostalAddress', addressCountry: c.country },
          geo: { '@type': 'GeoCoordinates', latitude: c.coordinates[0], longitude: c.coordinates[1] },
        },
      },
      breadcrumb: breadcrumbs(siteUrl, [
        { name: 'Inicio', path: '/' },
        { name: 'Expedientes', path: '/expedientes' },
        { name: c.title, path: `/expedientes/${c.id}` },
      ]),
    },
  }));

  const fichas: RouteMeta[] = investigators.map((inv) => ({
    path: `/investigadores/${inv.id}`,
    title: `${inv.name} — biografía, obras y casos investigados`,
    description: clamp(`${inv.bio} Ficha del investigador en el archivo de ${SITE_NAME}.`),
    jsonLd: {
      '@type': 'ProfilePage',
      inLanguage: 'es',
      mainEntity: {
        '@type': 'Person',
        name: inv.name,
        description: inv.bio,
        nationality: inv.country,
        knowsAbout: inv.specialty,
      },
      breadcrumb: breadcrumbs(siteUrl, [
        { name: 'Inicio', path: '/' },
        { name: 'Investigadores', path: '/investigadores' },
        { name: inv.name, path: `/investigadores/${inv.id}` },
      ]),
    },
  }));

  return [...estaticas, ...casos, ...fichas];
}
