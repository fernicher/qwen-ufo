import { ufoCases } from './cases';
import { catalog } from './catalog';
import { investigators } from './investigators';
import { books } from './books';
import { channels } from './channels';

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

  const estaticas: RouteMeta[] = [
    {
      path: '/',
      title: `${SITE_NAME} — Archivo Desclasificado UAP`,
      description: `Archivo en español del fenómeno OVNI/UAP: ${ufoCases.length} expedientes documentados en ${paises} países, mapa global de avistamientos, cine, biblioteca y noticias.`,
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
      title: `Expedientes desclasificados — ${ufoCases.length} casos OVNI documentados`,
      description: `Investigaciones detalladas de ${ufoCases.length} casos del fenómeno OVNI/UAP en ${paises} países, con testigos, documentos, hipótesis y respuesta oficial de cada uno.`,
    },
    {
      path: '/mapa',
      title: 'Mapa global de avistamientos OVNI / UAP',
      description: `Los ${ufoCases.length} casos del archivo situados en el mapa, filtrables por tipo de encuentro y por nivel de la escala de Hynek.`,
    },
    {
      path: '/catalogo',
      title: `Cine OVNI / UAP — ${catalog.length} películas, series y documentales`,
      description: `Selección curada de ${catalog.length} títulos sobre el fenómeno OVNI/UAP, del cine clásico de platillos a los documentales de investigación.`,
    },
    {
      path: '/noticias',
      title: 'Radar de señales — Noticias OVNI / UAP en español',
      description: 'Noticias y menciones del fenómeno OVNI/UAP agregadas en tiempo casi real desde prensa, Reddit y Bluesky, con las fuentes en español priorizadas.',
    },
    {
      path: '/biblioteca',
      title: 'Biblioteca OVNI — Libros, podcasts y divulgadores',
      description: `${books.length} libros de referencia, podcasts, divulgadores y los archivos oficiales desclasificados de ocho países.`,
    },
    {
      path: '/canales',
      title: 'Canales de YouTube sobre OVNIs y UAP',
      description: `${channels.length} canales recomendados sobre el fenómeno OVNI/UAP, en español e inglés.`,
    },
    {
      path: '/investigadores',
      title: 'Investigadores del fenómeno OVNI / UAP',
      description: `Las ${investigators.length} figuras que documentaron, analizaron o divulgaron el fenómeno: de Hynek y Vallée a los referentes iberoamericanos.`,
    },
    {
      path: '/timeline',
      title: 'Línea de tiempo del fenómeno OVNI / UAP',
      description: 'Casos, desclasificaciones e hitos culturales desde Roswell hasta los informes de AARO, ordenados cronológicamente.',
    },
    {
      path: '/escala-hynek',
      title: 'La escala de Hynek — Cómo se clasifican los encuentros',
      description: 'Qué significan los encuentros cercanos del primer, segundo y tercer tipo, explicados con casos reales del archivo.',
    },
    {
      path: '/reportar',
      title: 'Cómo reportar un avistamiento OVNI',
      description: 'Qué descartar primero, qué anotar mientras ocurre, cómo grabar para que el material sirva y a qué organismo oficial acudir en cada país.',
    },
    {
      path: '/favoritos',
      title: 'Mis favoritos',
      description: 'Los títulos del catálogo que guardaste en este navegador.',
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
    title: `${inv.name} — ${inv.specialty}`,
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
