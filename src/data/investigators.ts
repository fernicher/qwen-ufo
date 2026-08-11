export interface Investigator {
  id: string;
  /** Artículo de Wikipedia para la foto. Prefijo `es:` si sólo existe en español. */
  wiki?: string;
  name: string;
  country: string;
  specialty: string;
  bio: string;
  works: string[];
  credibility: string;
}

export const investigators: Investigator[] = [
  { id: 'hynek', wiki: 'J._Allen_Hynek', name: 'J. Allen Hynek', country: 'Estados Unidos', specialty: 'Clasificación de encuentros', bio: 'Astrónomo y consultor del Proyecto Blue Book. Creó la escala de Encuentros Cercanos.', works: ['The UFO Experience (1972)'], credibility: 'histórico' },
  { id: 'vallee', wiki: 'Jacques_Vallée', name: 'Jacques Vallée', country: 'Francia / EE.UU.', specialty: 'Teoría interdimensional', bio: 'Informático y astrofísico. Inspiración para Lacombe en "Encuentros Cercanos".', works: ['Passport to Magonia (1969)'], credibility: 'referente' },
  { id: 'ribas', name: 'Antonio Ribas', country: 'España', specialty: 'Ufología española', bio: 'Pionero de la ufología en España.', works: ['OVNI: El peligro nuclear (1979)'], credibility: 'histórico' },
  { id: 'kean', wiki: 'Leslie_Kean', name: 'Leslie Kean', country: 'Estados Unidos', specialty: 'Periodismo UAP', bio: 'Destapó el programa AATIP del Pentágono en The New York Times.', works: ['UFOs: Generals, Pilots... (2010)'], credibility: 'activo' },
  { id: 'clemente', name: 'Carlos Clemente', country: 'España', specialty: 'Archivo histórico', bio: 'Especializado en expedientes del Ejército del Aire español.', works: ['Expedientes OVNI del Ejército del Aire'], credibility: 'activo' },
  { id: 'zerpa', wiki: 'es:Fabio_Zerpa', name: 'Fabio Zerpa', country: 'Uruguay / Argentina', specialty: 'Divulgación ufológica', bio: 'Actor, profesor de historia y ufólogo uruguayo-argentino. Fundador de la ONIFE, reportó y catalogó miles de casos entre Uruguay y Argentina desde los años 60 hasta su muerte en 2019.', works: ['Los OVNI existen y son extraterrestres (1978)'], credibility: 'histórico' },
  { id: 'banchs', name: 'Roberto Banchs', country: 'Argentina', specialty: 'Análisis psicosocial del fenómeno OVNI', bio: 'Investigador argentino de enfoque académico y escepticismo reflexivo, autor de la Guía Biográfica de la Ufología Argentina.', works: ['Fenómenos aéreos inusuales: un enfoque biopsicosocial (1994)'], credibility: 'histórico' },
  { id: 'maussan', wiki: 'es:Jaime_Maussan', name: 'Jaime Maussan', country: 'México', specialty: 'Periodismo y divulgación ufológica', bio: 'El ufólogo más conocido de México, conductor del programa "Tercer Milenio". Divulgó el video del caso Campeche 2004, aunque trabajos posteriores suyos —como los supuestos cuerpos no humanos presentados al Congreso mexicano en 2023— fueron cuestionados por la comunidad científica.', works: ['Programa Tercer Milenio'], credibility: 'controvertido' },
];