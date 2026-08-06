export interface Channel {
  id: string;
  name: string;
  lang: 'es' | 'en';
  description: string;
  /** Búsqueda de YouTube: robusta, nunca queda rota aunque el canal cambie de handle. */
  query: string;
  /** Nombre exacto del canal para resolver su avatar real vía la API de YouTube.
   *  Solo se define para entradas que son un canal único (no búsquedas temáticas). */
  ytChannel?: string;
}

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const channels: Channel[] = [
  // -------- Español --------
  { id: 'cuarto-milenio', name: 'Cuarto Milenio', lang: 'es', description: 'El programa de Iker Jiménez, la mayor referencia del misterio y la ufología en español.', query: yt('Cuarto Milenio ovnis Iker Jiménez'), ytChannel: 'Cuarto Milenio' },
  { id: 'mundo-desconocido', name: 'Mundo Desconocido', lang: 'es', description: 'Canal español veterano de misterio y ufología con producción propia.', query: yt('Mundo Desconocido ovnis'), ytChannel: 'Mundo Desconocido' },
  { id: 'ovni-hunters', name: 'National Geographic — OVNIs', lang: 'es', description: 'Documentales de National Geographic en español sobre el fenómeno.', query: yt('National Geographic ovnis documental español') },
  { id: 'maussan-tv', name: 'Tercer Milenio (Jaime Maussan)', lang: 'es', description: 'Canal del divulgador mexicano. Muy popular; mirar con criterio.', query: yt('Tercer Milenio Jaime Maussan ovnis'), ytChannel: 'Maussan TV' },
  { id: 'la-senal', name: 'La Señal (ciencia y misterios)', lang: 'es', description: 'Programa argentino conducido por Andrea Pérez Simondini con Joaquín Abenza y José Antonio Caravaca. Casos, entrevistas y análisis de ufología con enfoque serio.', query: yt('La Señal ciencia y misterios cienciaymisterio ovnis') },
  // -------- Inglés --------
  { id: 'why-files', name: 'The Why Files', lang: 'en', description: 'Uno de los canales más grandes de misterio y UAP, con guion cuidado y humor. Muy recomendable para arrancar.', query: yt('The Why Files UFO UAP'), ytChannel: 'The Why Files' },
  { id: 'richard-dolan-yt', name: 'Richard Dolan Intelligent Disclosure', lang: 'en', description: 'El canal del historiador Richard Dolan: enfoque documental y riguroso.', query: yt('Richard Dolan Intelligent Disclosure'), ytChannel: 'Richard Dolan Intelligent Disclosure' },
  { id: 'corbell-yt', name: 'Jeremy Corbell / Weaponized', lang: 'en', description: 'Material militar verificado y entrevistas a whistleblowers, junto a George Knapp.', query: yt('Jeremy Corbell Weaponized podcast UAP'), ytChannel: 'Weaponized' },
  { id: 'jesse-michels', name: 'American Alchemy (Jesse Michels)', lang: 'en', description: 'Entrevistas largas y bien producidas con figuras clave del tema UAP y la ciencia de frontera.', query: yt('American Alchemy Jesse Michels UAP'), ytChannel: 'American Alchemy' },
  { id: 'news-nation-uap', name: 'NewsNation — Cobertura UAP', lang: 'en', description: 'El canal de noticias que más cubre las audiencias del Congreso sobre UAP, con Ross Coulthart.', query: yt('NewsNation UAP hearing Coulthart'), ytChannel: 'NewsNation' },
];
