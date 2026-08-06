export interface Channel {
  id: string;
  name: string;
  lang: 'es' | 'en';
  description: string;
  /** Búsqueda de YouTube: robusta, nunca queda rota aunque el canal cambie de handle. */
  query: string;
  /** Nombre exacto del canal para resolver su avatar por búsqueda (menos preciso). */
  ytChannel?: string;
  /** Handle de YouTube (sin @), p. ej. 'cienciaymisterio'. Resuelve exacto. */
  ytHandle?: string;
  /** ID de canal de YouTube (UC…). La forma más precisa; tiene prioridad. */
  ytChannelId?: string;
}

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

/** Clave con la que se resuelve/consulta el avatar: ID > handle > nombre. */
export const channelAvatarKey = (c: Channel): string | undefined =>
  c.ytChannelId ? 'id:' + c.ytChannelId : c.ytHandle ? '@' + c.ytHandle : c.ytChannel;

export const channels: Channel[] = [
  // -------- Español --------
  { id: 'cuarto-milenio', name: 'Cuarto Milenio', lang: 'es', description: 'El programa de Iker Jiménez, la mayor referencia del misterio y la ufología en español.', query: yt('Cuarto Milenio ovnis Iker Jiménez'), ytChannelId: 'UC4vGziRUQcgz_zWrydCnP0Q' },
  { id: 'mundo-desconocido', name: 'Mundo Desconocido', lang: 'es', description: 'Canal español veterano de misterio y ufología con producción propia.', query: yt('Mundo Desconocido ovnis'), ytChannelId: 'UCnOAynBmYKA1neozHQNF0mA' },
  { id: 'ovni-hunters', name: 'National Geographic — OVNIs', lang: 'es', description: 'Documentales de National Geographic en español sobre el fenómeno.', query: yt('National Geographic ovnis documental español') },
  { id: 'maussan-tv', name: 'Tercer Milenio (Jaime Maussan)', lang: 'es', description: 'Canal del divulgador mexicano. Muy popular; mirar con criterio.', query: yt('Tercer Milenio Jaime Maussan ovnis'), ytChannelId: 'UC6ffFUtT43XHlccQbyWsNHA' },
  { id: 'la-senal', name: 'La Señal (ciencia y misterios)', lang: 'es', description: 'Programa argentino conducido por Andrea Pérez Simondini con Joaquín Abenza y José Antonio Caravaca. Casos, entrevistas y análisis de ufología con enfoque serio.', query: yt('La Señal ciencia y misterios cienciaymisterio ovnis'), ytHandle: 'cienciaymisterio' },
  // -------- Inglés --------
  { id: 'why-files', name: 'The Why Files', lang: 'en', description: 'Uno de los canales más grandes de misterio y UAP, con guion cuidado y humor. Muy recomendable para arrancar.', query: yt('The Why Files UFO UAP'), ytHandle: 'TheWhyFiles' },
  { id: 'richard-dolan-yt', name: 'Richard Dolan Intelligent Disclosure', lang: 'en', description: 'El canal del historiador Richard Dolan: enfoque documental y riguroso.', query: yt('Richard Dolan Intelligent Disclosure'), ytChannelId: 'UCnaIeNm-jSa1l8yHrn7PlQg' },
  { id: 'corbell-yt', name: 'Jeremy Corbell / Weaponized', lang: 'en', description: 'Material militar verificado y entrevistas a whistleblowers, junto a George Knapp.', query: yt('Jeremy Corbell Weaponized podcast UAP'), ytChannel: 'WEAPONIZED Jeremy Corbell George Knapp' },
  { id: 'jesse-michels', name: 'American Alchemy (Jesse Michels)', lang: 'en', description: 'Entrevistas largas y bien producidas con figuras clave del tema UAP y la ciencia de frontera.', query: yt('American Alchemy Jesse Michels UAP'), ytHandle: 'JesseMichels' },
  { id: 'news-nation-uap', name: 'NewsNation — Cobertura UAP', lang: 'en', description: 'El canal de noticias que más cubre las audiencias del Congreso sobre UAP, con Ross Coulthart.', query: yt('NewsNation UAP hearing Coulthart'), ytChannel: 'NewsNation' },
];
