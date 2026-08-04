export interface ExpedienteExtra {
  /** Título del artículo en Wikipedia (EN) para traer la foto del caso sin API key. */
  wiki?: string;
  /** Texto para buscar videos/documentales del caso en YouTube. */
  youtubeQuery: string;
}

const ytSearch = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

/**
 * Solo se cargan wiki de casos con artículo de Wikipedia confirmado, para evitar
 * fotos equivocadas. Los que no tienen wiki usan el ícono ilustrado como antes.
 * La búsqueda de YouTube siempre está disponible.
 */
const raw: Record<string, { wiki?: string; ytTerms: string }> = {
  'roswell-1947': { wiki: 'Roswell_incident', ytTerms: 'Roswell incident 1947 documental' },
  'rendlesham-1980': { wiki: 'Rendlesham_Forest_incident', ytTerms: 'Rendlesham Forest incident documentary' },
  'phoenix-1997': { wiki: 'Phoenix_Lights', ytTerms: 'Phoenix Lights 1997 documental' },
  'tic-tac-2004': { wiki: 'USS_Nimitz_UFO_incident', ytTerms: 'USS Nimitz Tic Tac UFO documentary' },
  'belgica-1989': { wiki: 'Belgian_UFO_wave', ytTerms: 'Belgian UFO wave 1990 documental' },
  'tehran-1976': { wiki: '1976_Tehran_UFO_incident', ytTerms: '1976 Tehran UFO incident documentary' },
  'varginha-1996': { wiki: 'Varginha_UFO_incident', ytTerms: 'caso Varginha 1996 documental' },
  'gimbal-2015': { wiki: 'Pentagon_UFO_videos', ytTerms: 'Gimbal UFO Pentagon video' },
  'operacao-prato-1977': { wiki: 'Colares_UFO_flap', ytTerms: 'Operação Prato Colares OVNI documentário' },
  'campeche-2004': { wiki: '2004_Mexican_UFO_incident', ytTerms: 'caso Campeche 2004 ovni México' },
  'skinwalker': { wiki: 'Skinwalker_Ranch', ytTerms: 'Skinwalker Ranch documentary' },
  'trelew-1962': { ytTerms: 'caso Trelew 1962 ovni Argentina' },
  'bariloche-1995': { ytTerms: 'caso Bariloche 1995 ovni avión' },
  'la-aurora-1977': { ytTerms: 'caso La Aurora 1977 ovni Uruguay' },
  'cabo-valdes-1977': { ytTerms: 'caso Cabo Valdés 1977 ovni Chile' },
  'anolaima-1969': { ytTerms: 'caso Anolaima 1969 ovni Colombia' },
  'chile-2014': { ytTerms: 'caso ovni Chile 2014 CEFAA helicóptero' },
  'penas-1976': { ytTerms: 'caso Cañas 1976 ovni' },
  'guadalupe-2004': { ytTerms: 'ovni Guadalupe 2004' },
  'san-jose-1979': { ytTerms: 'caso San José 1979 ovni' },
  'mapendulo-1995': { ytTerms: 'caso Mapendulo Papúa Indonesia contacto ovni' },
  'uritorco-1986': { ytTerms: 'cerro Uritorco Capilla del Monte ovni 1986 Sierra del Pajarillo documental' },
  'erks-uritorco': { ytTerms: 'ciudad de Erks Uritorco leyenda documental' },
  'ingeniero-white-1975': { ytTerms: 'Carlos Díaz Ingeniero White ovni Bahía Blanca Constitución documental' },
  'iberah': { ytTerms: 'Iberah ciudad intraterrena La Lobería Viedma Río Negro documental' },
  // Abducciones (CE4)
  'hill-1961': { wiki: 'Barney_and_Betty_Hill_incident', ytTerms: 'Betty Barney Hill abduction 1961 documental' },
  'villas-boas-1957': { ytTerms: 'Antônio Villas Boas 1957 abdução ovni documentário' },
  'pascagoula-1973': { wiki: 'Pascagoula_Abduction', ytTerms: 'Pascagoula abduction 1973 documentary' },
  'allagash-1976': { ytTerms: 'Allagash abductions 1976 documentary' },
  'walton-1975': { wiki: 'Travis_Walton_UFO_incident', ytTerms: 'Travis Walton Fire in the Sky abduction documentary' },
  // Encuentros del 3er tipo (CE3)
  'kelly-hopkinsville-1955': { wiki: 'Kelly–Hopkinsville_encounter', ytTerms: 'Kelly Hopkinsville goblins 1955 encounter documentary' },
  'flatwoods-1952': { wiki: 'Flatwoods_monster', ytTerms: 'Flatwoods monster 1952 documentary' },
  'valensole-1965': { ytTerms: 'Valensole 1965 Maurice Masse ovni documentaire' },
  'voronezh-1989': { ytTerms: 'Voronezh 1989 UFO landing TASS documentary' },
  'ariel-school-1994': { ytTerms: 'Ariel School Ruwa 1994 UFO children John Mack documentary' },
  // Ciudades intraterrenas
  'isidris-mendoza': { ytTerms: 'ciudad de Isidris Mendoza intraterrena Di Noto documental' },
  'telos-shasta': { ytTerms: 'Telos Mount Shasta Lemuria intraterrestrial city documentary' },
  'juan-perez-1978': { ytTerms: 'Testigo de otro mundo documental Juan Pérez Alan Stivelman Jacques Vallée gaucho ovni' },
};

export const expedienteExtras: Record<string, ExpedienteExtra> = Object.fromEntries(
  Object.entries(raw).map(([id, v]) => [id, { wiki: v.wiki, youtubeQuery: ytSearch(v.ytTerms) }])
);

export function getExtra(caseId: string): ExpedienteExtra {
  return expedienteExtras[caseId] || { youtubeQuery: ytSearch('ovni UAP documental') };
}
