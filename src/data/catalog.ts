export type CatalogType = 'pelicula' | 'serie' | 'documental';

/** ids de las colecciones temáticas de la Home (ver src/data/collections.ts). */
export type CatalogTheme = 'pentagono' | 'encuentros' | 'abducciones' | 'area51';

export interface CatalogItem {
  id: string;
  title: string;
  year: number;
  director: string;
  type: CatalogType;
  synopsis: string;
  /** Título del artículo en Wikipedia (EN) usado para traer el póster sin API key. */
  wiki: string;
  /** id de un expediente relacionado, si corresponde. */
  caseId?: string;
  /** Colecciones temáticas a las que pertenece este título (ver Home / Catálogo). */
  themes?: CatalogTheme[];
}

export const catalog: CatalogItem[] = [
  // ---------------- PELÍCULAS ----------------
  { id: 'day-earth-stood-still-1951', title: 'The Day the Earth Stood Still', year: 1951, director: 'Robert Wise', type: 'pelicula', synopsis: 'Un emisario alienígena aterriza en Washington con una advertencia para la humanidad. El clásico fundacional del cine de contacto.', wiki: 'The_Day_the_Earth_Stood_Still' },
  { id: 'war-worlds-1953', title: 'The War of the Worlds', year: 1953, director: 'Byron Haskin', type: 'pelicula', synopsis: 'La primera gran adaptación de H. G. Wells al cine: una invasión marciana arrasa la Tierra.', wiki: 'The_War_of_the_Worlds_(1953_film)' },
  { id: 'earth-vs-saucers-1956', title: 'Earth vs. the Flying Saucers', year: 1956, director: 'Fred F. Sears', type: 'pelicula', synopsis: 'Platillos voladores atacan la Tierra en este clásico de efectos de Ray Harryhausen que definió la estética del "platillo".', wiki: 'Earth_vs._the_Flying_Saucers' },
  { id: 'close-encounters-1977', title: 'Close Encounters of the Third Kind', year: 1977, director: 'Steven Spielberg', type: 'pelicula', synopsis: 'Un hombre común queda obsesionado tras un avistamiento. El título viene directo de la escala de contacto de J. Allen Hynek.', wiki: 'Close_Encounters_of_the_Third_Kind', themes: ['encuentros'] },
  { id: 'et-1982', title: 'E.T. the Extra-Terrestrial', year: 1982, director: 'Steven Spielberg', type: 'pelicula', synopsis: 'Un niño esconde a un ser de otro mundo que quedó varado en la Tierra. La cara más tierna del contacto.', wiki: 'E.T._the_Extra-Terrestrial', themes: ['encuentros'] },
  { id: 'the-thing-1982', title: 'The Thing', year: 1982, director: 'John Carpenter', type: 'pelicula', synopsis: 'En la Antártida, una forma de vida extraterrestre imita a quien devora. Paranoia pura en el hielo.', wiki: 'The_Thing_(1982_film)' },
  { id: 'starman-1984', title: 'Starman', year: 1984, director: 'John Carpenter', type: 'pelicula', synopsis: 'Un alienígena toma forma humana y cruza Estados Unidos junto a una viuda para volver a su nave.', wiki: 'Starman_(film)', themes: ['encuentros'] },
  { id: 'cocoon-1985', title: 'Cocoon', year: 1985, director: 'Ron Howard', type: 'pelicula', synopsis: 'Un grupo de ancianos recupera la juventud gracias a unos visitantes extraterrestres benévolos.', wiki: 'Cocoon_(film)', themes: ['encuentros'] },
  { id: 'flight-navigator-1986', title: 'Flight of the Navigator', year: 1986, director: 'Randal Kleiser', type: 'pelicula', synopsis: 'Un chico desaparece y vuelve ocho años después sin haber envejecido, con una nave inteligente como única pista.', wiki: 'Flight_of_the_Navigator', themes: ['encuentros'] },
  { id: 'communion-1989', title: 'Communion', year: 1989, director: 'Philippe Mora', type: 'pelicula', synopsis: 'Adaptación del best-seller de Whitley Strieber sobre su propia experiencia de abducción. Christopher Walken como Strieber.', wiki: 'Communion_(film)', themes: ['encuentros', 'abducciones'] },
  { id: 'the-abyss-1989', title: 'The Abyss', year: 1989, director: 'James Cameron', type: 'pelicula', synopsis: 'Buzos de una plataforma submarina se topan con una inteligencia no humana en el fondo del océano.', wiki: 'The_Abyss' },
  { id: 'fire-in-the-sky-1993', title: 'Fire in the Sky', year: 1993, director: 'Robert Lieberman', type: 'pelicula', synopsis: 'Basada en la abducción que denunció el leñador Travis Walton en 1975. Una de las escenas de abducción más perturbadoras del cine.', wiki: 'Fire_in_the_Sky_(film)', themes: ['abducciones'] },
  { id: 'independence-day-1996', title: 'Independence Day', year: 1996, director: 'Roland Emmerich', type: 'pelicula', synopsis: 'Naves colosales aparecen sobre las ciudades del mundo en el blockbuster de invasión por excelencia.', wiki: 'Independence_Day_(1996_film)' },
  { id: 'mars-attacks-1996', title: 'Mars Attacks!', year: 1996, director: 'Tim Burton', type: 'pelicula', synopsis: 'Sátira desopilante de las invasiones marcianas de los 50, con un elenco estelar y marcianos de gatillo fácil.', wiki: 'Mars_Attacks!' },
  { id: 'men-in-black-1997', title: 'Men in Black', year: 1997, director: 'Barry Sonnenfeld', type: 'pelicula', synopsis: 'Una agencia secreta vigila a los alienígenas que viven de incógnito en la Tierra. Toma el mito real de los "hombres de negro".', wiki: 'Men_in_Black_(1997_film)', themes: ['area51'] },
  { id: 'contact-1997', title: 'Contact', year: 1997, director: 'Robert Zemeckis', type: 'pelicula', synopsis: 'Basada en la novela de Carl Sagan: una científica del SETI recibe la primera señal inequívoca de inteligencia extraterrestre.', wiki: 'Contact_(1997_American_film)', themes: ['encuentros'] },
  { id: 'signs-2002', title: 'Signs', year: 2002, director: 'M. Night Shyamalan', type: 'pelicula', synopsis: 'Aparecen círculos en los cultivos de una granja y algo empieza a acechar. El fenómeno de los crop circles llevado al terror.', wiki: 'Signs_(film)' },
  { id: 'war-worlds-2005', title: 'War of the Worlds', year: 2005, director: 'Steven Spielberg', type: 'pelicula', synopsis: 'Relectura moderna de Wells: máquinas alienígenas emergen de la tierra y un padre intenta salvar a sus hijos.', wiki: 'War_of_the_Worlds_(2005_film)' },
  { id: 'fourth-kind-2009', title: 'The Fourth Kind', year: 2009, director: 'Olatunde Osunsanmi', type: 'pelicula', synopsis: 'Falso documental sobre supuestas abducciones en Nome, Alaska, mezclando ficción con material "de archivo".', wiki: 'The_Fourth_Kind' },
  { id: 'district-9-2009', title: 'District 9', year: 2009, director: 'Neill Blomkamp', type: 'pelicula', synopsis: 'Refugiados alienígenas viven segregados en un gueto de Johannesburgo. Ciencia ficción con carga social filmada como documental.', wiki: 'District_9' },
  { id: 'super-8-2011', title: 'Super 8', year: 2011, director: 'J. J. Abrams', type: 'pelicula', synopsis: 'Unos chicos filman una película casera y captan por accidente un descarrilamiento que esconde algo del espacio. Homenaje al Spielberg ochentoso.', wiki: 'Super_8_(2011_film)', themes: ['encuentros'] },
  { id: 'cowboys-aliens-2011', title: 'Cowboys & Aliens', year: 2011, director: 'Jon Favreau', type: 'pelicula', synopsis: 'Western y ciencia ficción se cruzan cuando naves alienígenas atacan un pueblo del lejano oeste.', wiki: 'Cowboys_&_Aliens' },
  { id: 'attack-the-block-2011', title: 'Attack the Block', year: 2011, director: 'Joe Cornish', type: 'pelicula', synopsis: 'Una banda de pibes de un barrio de Londres defiende su edificio de una invasión alienígena. De culto.', wiki: 'Attack_the_Block' },
  { id: 'paul-2011', title: 'Paul', year: 2011, director: 'Greg Mottola', type: 'pelicula', synopsis: 'Comedia: dos nerds ayudan a un alienígena escapado del Área 51 a volver a casa. Guiños a todo el género.', wiki: 'Paul_(film)', themes: ['area51'] },
  { id: 'dark-skies-2013', title: 'Dark Skies', year: 2013, director: 'Scott Stewart', type: 'pelicula', synopsis: 'Una familia de suburbio empieza a sufrir fenómenos inexplicables ligados a los "grises" y las abducciones.', wiki: 'Dark_Skies_(2013_film)', themes: ['abducciones'] },
  { id: 'edge-of-tomorrow-2014', title: 'Edge of Tomorrow', year: 2014, director: 'Doug Liman', type: 'pelicula', synopsis: 'Un soldado revive el mismo día de combate contra una invasión alienígena una y otra vez.', wiki: 'Edge_of_Tomorrow' },
  { id: 'arrival-2016', title: 'Arrival', year: 2016, director: 'Denis Villeneuve', type: 'pelicula', synopsis: 'Doce naves aterrizan en el mundo y una lingüista debe descifrar cómo comunicarse con sus ocupantes. Ciencia ficción adulta y profunda.', wiki: 'Arrival_(film)', themes: ['encuentros'] },
  { id: 'phoenix-forgotten-2017', title: 'Phoenix Forgotten', year: 2017, director: 'Justin Barber', type: 'pelicula', synopsis: 'Found-footage inspirado en las Luces de Phoenix de 1997: tres adolescentes desaparecen filmando las luces.', wiki: 'Phoenix_Forgotten', caseId: 'phoenix-1997' },
  { id: 'nope-2022', title: 'Nope', year: 2022, director: 'Jordan Peele', type: 'pelicula', synopsis: 'Dos hermanos de un rancho de caballos intentan capturar en video algo que sobrevuela su valle. Terror y espectáculo sobre el acto de mirar al cielo.', wiki: 'Nope_(film)' },

  // ---------------- SERIES ----------------
  { id: 'v-1983', title: 'V', year: 1983, director: 'Kenneth Johnson', type: 'serie', synopsis: 'Visitantes de apariencia humana llegan en son de paz, pero esconden un plan reptiliano. Miniserie ochentosa de culto.', wiki: 'V_(1983_miniseries)' },
  { id: 'x-files-1993', title: 'The X-Files', year: 1993, director: 'Chris Carter', type: 'serie', synopsis: 'Los agentes Mulder y Scully investigan casos paranormales y una conspiración de encubrimiento OVNI. "La verdad está ahí afuera".', wiki: 'The_X-Files', themes: ['area51'] },
  { id: 'taken-2002', title: 'Taken', year: 2002, director: 'Leslie Bohem', type: 'serie', synopsis: 'Miniserie producida por Spielberg que sigue tres familias y medio siglo de abducciones, de Roswell en adelante.', wiki: 'Taken_(miniseries)', themes: ['encuentros', 'abducciones'] },
  { id: 'ancient-aliens-2009', title: 'Ancient Aliens', year: 2009, director: 'Kevin Burns', type: 'serie', synopsis: 'La serie que popularizó la hipótesis del "astronauta ancestral". Muy vista, muy discutida: tomala como entretenimiento especulativo.', wiki: 'Ancient_Aliens' },
  { id: 'project-blue-book-2019', title: 'Project Blue Book', year: 2019, director: 'David O\'Leary', type: 'serie', synopsis: 'Dramatización del programa real de la Fuerza Aérea de EE.UU. y del propio J. Allen Hynek investigando avistamientos.', wiki: 'Project_Blue_Book_(TV_series)', themes: ['pentagono'] },
  { id: 'unidentified-2019', title: 'Unidentified: Inside America\'s UFO Investigation', year: 2019, director: 'History Channel', type: 'serie', synopsis: 'Luis Elizondo, ex jefe del programa AATIP del Pentágono, investiga los encuentros militares con UAP.', wiki: 'Unidentified:_Inside_America\'s_UFO_Investigation', themes: ['pentagono'] },
  { id: 'resident-alien-2021', title: 'Resident Alien', year: 2021, director: 'Chris Sheridan', type: 'serie', synopsis: 'Un alienígena estrellado suplanta a un médico rural mientras aprende a ser humano. Comedia con Alan Tudyk.', wiki: 'Resident_Alien_(TV_series)' },
  { id: 'invasion-2021', title: 'Invasion', year: 2021, director: 'Simon Kinberg', type: 'serie', synopsis: 'Una invasión alienígena contada en simultáneo desde varios puntos del planeta y personajes comunes.', wiki: 'Invasion_(2021_TV_series)' },

  // ---------------- DOCUMENTALES ----------------
  { id: 'strange-harvest-1980', title: 'A Strange Harvest', year: 1980, director: 'Linda Moulton Howe', type: 'documental', synopsis: 'El documental que instaló el misterio de las mutilaciones de ganado. Ganó un Emmy regional.', wiki: 'A_Strange_Harvest' },
  { id: 'out-of-the-blue-2002', title: 'Out of the Blue', year: 2002, director: 'James Fox', type: 'documental', synopsis: 'Repaso serio de los casos y testimonios militares más sólidos del fenómeno OVNI, narrado por Peter Coyote.', wiki: 'Out_of_the_Blue_(2002_film)', themes: ['pentagono'] },
  { id: 'unacknowledged-2017', title: 'Unacknowledged', year: 2017, director: 'Michael Mazzola', type: 'documental', synopsis: 'Documental basado en el trabajo de Steven Greer sobre supuestos programas secretos. Figura muy controvertida: tomalo con pinzas.', wiki: 'Unacknowledged_(film)', themes: ['pentagono', 'area51'] },
  { id: 'bob-lazar-2018', title: 'Bob Lazar: Area 51 & Flying Saucers', year: 2018, director: 'Jeremy Corbell', type: 'documental', synopsis: 'Perfil de Bob Lazar, el hombre que dijo haber trabajado en ingeniería inversa de naves en el Área 51. Narra Mickey Rourke.', wiki: 'Bob_Lazar:_Area_51_&_Flying_Saucers', themes: ['area51'] },
  { id: 'the-phenomenon-2020', title: 'The Phenomenon', year: 2020, director: 'James Fox', type: 'documental', synopsis: 'El documental moderno más completo sobre el fenómeno, con testimonios de funcionarios, astronautas y el caso Ariel School.', wiki: 'The_Phenomenon_(film)', themes: ['pentagono'] },
  { id: 'moment-of-contact-2022', title: 'Moment of Contact', year: 2022, director: 'James Fox', type: 'documental', synopsis: 'Investigación del caso Varginha (Brasil, 1996), el "Roswell brasileño", con testigos directos.', wiki: 'Moment_of_Contact', caseId: 'varginha-1996', themes: ['encuentros'] },
  { id: 'encounters-2023', title: 'Encounters', year: 2023, director: 'Yon Motskin', type: 'documental', synopsis: 'Serie documental de Netflix (producida por Amblin, de Spielberg) sobre cuatro encuentros colectivos alrededor del mundo.', wiki: 'Encounters_(TV_series)', themes: ['encuentros'] },
  { id: 'mirage-men-2013', title: 'Mirage Men', year: 2013, director: 'John Lundberg', type: 'documental', synopsis: 'El lado oscuro: cómo la inteligencia de EE.UU. usó el mito OVNI para desinformar. Imprescindible para no comprar todo.', wiki: 'Mirage_Men', themes: ['pentagono', 'area51'] },
];
