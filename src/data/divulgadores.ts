export interface Divulgador {
  id: string;
  name: string;
  role: string;
  country: string;
  lang: 'es' | 'en';
  bio: string;
  /** Título del artículo en Wikipedia (para la foto, sin API key). */
  wiki: string;
  tag: 'divulgador' | 'testigo' | 'periodista' | 'militar' | 'científico' | 'controvertido';
}

export const divulgadores: Divulgador[] = [
  { id: 'lue-elizondo', name: 'Luis "Lue" Elizondo', role: 'Ex director del programa AATIP del Pentágono', country: 'EE.UU.', lang: 'en', tag: 'militar', wiki: 'Luis_Elizondo', bio: 'Ex agente de contrainteligencia que dirigió el programa secreto del Pentágono para estudiar fenómenos aéreos no identificados. Su renuncia en 2017 destapó la existencia del AATIP y disparó la conversación moderna sobre UAP.' },
  { id: 'david-grusch', name: 'David Grusch', role: 'Ex oficial de inteligencia y whistleblower', country: 'EE.UU.', lang: 'en', tag: 'militar', wiki: 'David_Grusch', bio: 'Ex oficial de la Fuerza Aérea e inteligencia que en 2023 declaró bajo juramento ante el Congreso que EE.UU. mantiene un programa de recuperación de naves de origen no humano. Sus afirmaciones son tan resonantes como discutidas.' },
  { id: 'bob-lazar', name: 'Bob Lazar', role: 'Supuesto físico del Área 51 / S-4', country: 'EE.UU.', lang: 'en', tag: 'controvertido', wiki: 'Bob_Lazar', bio: 'Afirma haber trabajado en ingeniería inversa de naves extraterrestres en la instalación S-4, cerca del Área 51, a fines de los 80. Su historia es fundacional en el mito moderno del Área 51, aunque nunca pudo probarse.' },
  { id: 'steven-greer', name: 'Dr. Steven Greer', role: 'Fundador del Disclosure Project', country: 'EE.UU.', lang: 'en', tag: 'controvertido', wiki: 'Steven_M._Greer', bio: 'Médico que abandonó la medicina para dedicarse a la divulgación OVNI. Creó el Disclosure Project y los protocolos de "contacto CE-5". Figura muy discutida: sus métodos y afirmaciones no tienen respaldo científico.' },
  { id: 'ross-coulthart', name: 'Ross Coulthart', role: 'Periodista de investigación', country: 'Australia', lang: 'en', tag: 'periodista', wiki: 'Ross_Coulthart', bio: 'Periodista australiano premiado que llevó el tema UAP a los medios masivos con entrevistas a whistleblowers como David Grusch. Autor de "In Plain Sight".' },
  { id: 'leslie-kean', name: 'Leslie Kean', role: 'Periodista de investigación', country: 'EE.UU.', lang: 'en', tag: 'periodista', wiki: 'Leslie_Kean', bio: 'Co-autora del artículo del New York Times de 2017 que reveló el programa AATIP y cambió para siempre la cobertura seria del fenómeno. Autora del best-seller "UFOs".' },
  { id: 'jeremy-corbell', name: 'Jeremy Corbell', role: 'Cineasta e investigador', country: 'EE.UU.', lang: 'en', tag: 'divulgador', wiki: 'Jeremy_Kenyon_Lockyer_Corbell', bio: 'Documentalista que difundió material militar verificado (los videos del Tic Tac, las "esferas") y dirigió documentales sobre Bob Lazar y el fenómeno. Coconduce el podcast Weaponized con George Knapp.' },
  { id: 'richard-dolan', name: 'Richard Dolan', role: 'Historiador del fenómeno OVNI', country: 'EE.UU.', lang: 'en', tag: 'divulgador', wiki: 'Richard_M._Dolan', bio: 'Historiador que documenta el fenómeno con enfoque en los archivos gubernamentales. Su serie "UFOs and the National Security State" es una referencia por su rigor documental.' },
  { id: 'linda-moulton-howe', name: 'Linda Moulton Howe', role: 'Periodista de investigación', country: 'EE.UU.', lang: 'en', tag: 'periodista', wiki: 'Linda_Moulton_Howe', bio: 'Ganadora de premios Emmy, instaló en los 80 el misterio de las mutilaciones de ganado con su documental "A Strange Harvest". Editora de Earthfiles.' },
  { id: 'travis-walton', name: 'Travis Walton', role: 'Testigo / abducido', country: 'EE.UU.', lang: 'en', tag: 'testigo', wiki: 'Travis_Walton', bio: 'Leñador de Arizona que en 1975 denunció haber sido abducido durante cinco días frente a sus compañeros de trabajo. Su caso inspiró la película "Fire in the Sky".' },
  { id: 'stanton-friedman', name: 'Stanton Friedman', role: 'Físico nuclear y ufólogo', country: 'Canadá / EE.UU.', lang: 'en', tag: 'científico', wiki: 'Stanton_T._Friedman', bio: 'Físico nuclear que fue el primer investigador civil de Roswell y defensor de los documentos Majestic-12. Divulgador incansable hasta su muerte en 2019.' },
  { id: 'iker-jimenez', name: 'Iker Jiménez', role: 'Periodista y comunicador', country: 'España', lang: 'es', tag: 'periodista', wiki: 'Iker_Jiménez', bio: 'El gran referente del misterio en español. Conduce "Cuarto Milenio", el programa de televisión sobre fenómenos anómalos más longevo e influyente del mundo hispanohablante.' },
  { id: 'jaime-maussan', name: 'Jaime Maussan', role: 'Periodista y ufólogo', country: 'México', lang: 'es', tag: 'controvertido', wiki: 'Jaime_Maussan', bio: 'El divulgador OVNI más conocido de Latinoamérica. Muy popular pero también muy cuestionado: varias de las "pruebas" que presentó fueron desmentidas. Tomalo con espíritu crítico.' },
];
