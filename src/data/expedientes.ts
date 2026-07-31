import { ufoCases } from './cases';
import type { UFOCase } from './cases';
import type { Expediente } from '../types/expediente';

type ExpedienteExtra = Omit<Expediente, keyof Omit<UFOCase, 'description'>>;

function buildExpediente(caseId: string, extra: ExpedienteExtra): Expediente {
  const base = ufoCases.find((c) => c.id === caseId);
  if (!base) throw new Error(`No existe el caso base: ${caseId}`);
  const { description: _description, ...rest } = base;
  return { ...rest, ...extra };
}

export const expedientes: Record<string, Expediente> = {
  'roswell-1947': buildExpediente('roswell-1947', {
    fullDescription: 'En julio de 1947, un ranchero encontró restos metálicos no identificados en un campo cercano a Roswell. La base aérea local emitió un comunicado hablando de un "platillo volante" recuperado, y horas después lo corrigió: se trataba de un globo meteorológico. Esa corrección, más que el hallazgo en sí, es lo que convirtió a Roswell en el caso fundacional de la ufología moderna.',
    witnesses: [
      { name: 'Mac Brazel', role: 'Encargado del rancho que halló los restos', credibility: 'alta', testimony: 'Describió fragmentos livianos, resistentes al fuego y con símbolos que no reconocía, esparcidos en una franja del terreno.' },
      { name: 'Jesse Marcel', role: 'Oficial de inteligencia de la base aérea de Roswell', credibility: 'alta', testimony: 'Fue el primer militar en examinar los restos in situ y, décadas después, sostuvo públicamente que el material no correspondía a ningún globo convencional que hubiera visto antes.' },
    ],
    documents: [
      { id: 'roswell-doc-1', title: 'Comunicado de prensa del 8 de julio de 1947', date: '1947-07-08', classification: 'Público', agency: 'Base Aérea de Roswell', pages: 1, summary: 'Anuncio original hablando de un "flying disc" recuperado, retirado y reemplazado por la versión del globo meteorológico en menos de 24 horas.' },
      { id: 'roswell-doc-2', title: 'Informe Project Mogul (desclasificado)', date: '1994-01-01', classification: 'Desclasificado', agency: 'Fuerza Aérea de EE.UU.', pages: 231, summary: 'Investigación oficial de 1994-1997 que vincula los restos con un globo del programa secreto de detección de pruebas nucleares soviéticas Project Mogul.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'roswell-hyp-1', title: 'Globo del Project Mogul', description: 'Los restos corresponden a un globo de gran altitud del programa clasificado Project Mogul, cuya naturaleza secreta explicaría la confusión inicial y el hermetismo militar.', evidence: ['Coincidencia de materiales con los globos Mogul', 'Registro de un lanzamiento cercano en fecha compatible'], counterEvidence: ['Testimonios militares insisten en materiales "no convencionales"'], probability: 'alta', source: 'Informe oficial de la USAF (1994-1997)' },
      { id: 'roswell-hyp-2', title: 'Encubrimiento de tecnología extraterrestre', description: 'El cambio de versión en menos de un día se interpreta como el inicio de un encubrimiento sostenido, reforzado por décadas de reserva militar sobre el caso.', evidence: ['Retractación pública inmediata y sin explicación detallada', 'Testimonios de personal militar décadas después'], counterEvidence: ['El propio programa Mogul era secreto por razones de Guerra Fría, no extraterrestres'], probability: 'baja', source: 'Literatura ufológica clásica' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['hynek'],
    timeline: [
      { date: '1947-06-14', event: 'Mac Brazel encuentra los primeros restos en el rancho.' },
      { date: '1947-07-08', event: 'La base aérea anuncia la recuperación de un "platillo volante".' },
      { date: '1947-07-09', event: 'Retractación: los restos se atribuyen a un globo meteorológico.' },
      { date: '1994-01-01', event: 'La USAF inicia la investigación que derivará en el informe Project Mogul.' },
    ],
    investigationStatus: 'cerrado',
    officialResponse: 'La Fuerza Aérea sostiene desde 1994 que los restos pertenecen al Project Mogul. El caso permanece oficialmente cerrado, aunque sigue siendo el más disputado de la ufología.',
    culturalImpact: 'Dio origen al término "Roswell incident" como sinónimo de encubrimiento gubernamental y disparó el turismo ufológico en Nuevo México.',
  }),

  'rendlesham-1980': buildExpediente('rendlesham-1980', {
    fullDescription: 'Durante tres noches de diciembre de 1980, personal de la fuerza aérea de EE.UU. destacado en una base británica reportó luces y una posible nave triangular en el bosque adyacente. Es el caso con mayor respaldo documental de origen militar directo de toda la ufología europea.',
    witnesses: [
      { name: 'Tte. Cnel. Charles Halt', role: 'Comandante adjunto de la base', credibility: 'alta', testimony: 'Redactó un memo oficial durante los hechos describiendo una forma triangular con luces que se movía entre los árboles y registró mediciones de radiación anómalas.' },
      { name: 'Sgto. Jim Penniston', role: 'Primer militar en acercarse al objeto', credibility: 'media', testimony: 'Afirmó haber tocado una superficie con símbolos grabados antes de que el objeto ascendiera y desapareciera.' },
    ],
    documents: [
      { id: 'rendlesham-doc-1', title: 'El "Halt Memo"', date: '1981-01-13', classification: 'Desclasificado', agency: 'Fuerza Aérea de EE.UU.', pages: 3, summary: 'Memorándum oficial enviado al Ministerio de Defensa británico describiendo los avistamientos y las mediciones de radiación tomadas en el lugar.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'rendlesham-hyp-1', title: 'Confusión con el faro de Orford Ness', description: 'Los destellos observados coincidirían con los barridos del faro cercano, amplificados por la niebla y la sugestión colectiva tras la primera noche.', evidence: ['El faro es visible en línea recta desde el punto de observación', 'Los relatos de la tercera noche difieren notablemente de la primera'], counterEvidence: ['El memo de Halt describe movimiento y forma sólida, no solo destellos'], probability: 'media', source: 'Análisis escéptico posterior (Ian Ridpath)' },
      { id: 'rendlesham-hyp-2', title: 'Objeto físico no identificado', description: 'Las mediciones de radiación y la consistencia entre testigos militares entrenados en observación sugieren un objeto real, no una ilusión óptica.', evidence: ['Marcas físicas encontradas en el suelo', 'Múltiples testigos independientes con formación militar'], counterEvidence: ['Las marcas del suelo también son compatibles con actividad animal previa'], probability: 'media', source: 'Halt Memo y testimonios posteriores' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1980-12-26', event: 'Primera noche: se reportan luces en el bosque de Rendlesham.' },
      { date: '1980-12-27', event: 'Penniston se acerca al objeto y reporta contacto físico.' },
      { date: '1980-12-28', event: 'Segunda incursión liderada por Halt, con mediciones de radiación.' },
      { date: '1981-01-13', event: 'Halt redacta el memo oficial que se filtra años después.' },
    ],
    investigationStatus: 'sin resolver',
    officialResponse: 'El Ministerio de Defensa británico clasificó el caso como de "ningún interés para la defensa" sin ofrecer una explicación alternativa formal.',
    culturalImpact: 'Conocido como el "Roswell británico"; es el caso UAP más citado en el Reino Unido y motivó reformas en cómo la RAF documenta este tipo de reportes.',
  }),

  'phoenix-1997': buildExpediente('phoenix-1997', {
    fullDescription: 'La noche del 13 de marzo de 1997, miles de residentes de Arizona y Nevada observaron una formación de luces en V que cruzó el cielo en silencio durante varios minutos. Es uno de los eventos UAP con mayor cantidad de testigos civiles simultáneos jamás registrado.',
    witnesses: [
      { name: 'Fife Symington', role: 'Gobernador de Arizona en 1997', credibility: 'alta', testimony: 'Negó públicamente el avistamiento durante su mandato y años después reconoció haberlo presenciado personalmente, describiéndolo como "gigantesco y silencioso".' },
    ],
    documents: [
      { id: 'phoenix-doc-1', title: 'Comunicado de la Base Luke AFB', date: '1997-03-14', classification: 'Público', agency: 'Fuerza Aérea de EE.UU.', pages: 1, summary: 'Atribuye una parte de los reportes a bengalas de iluminación lanzadas durante un ejercicio de la Guardia Nacional Aérea, sin cubrir la totalidad de los testimonios de la primera fase del avistamiento.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'phoenix-hyp-1', title: 'Bengalas militares', description: 'La fase final, con luces estáticas que caían lentamente, coincide con bengalas de iluminación lanzadas por A-10 durante un entrenamiento.', evidence: ['Confirmación oficial de un ejercicio esa noche', 'Coincidencia de trayectoria con la zona de entrenamiento'], counterEvidence: ['No explica la formación en V silenciosa reportada una hora antes'], probability: 'alta', source: 'Fuerza Aérea de EE.UU.' },
      { id: 'phoenix-hyp-2', title: 'Aeronave sólida no identificada', description: 'La fase inicial —una formación en V de gran tamaño, sin sonido, moviéndose a baja altitud— no tiene explicación convencional aceptada.', evidence: ['Miles de testimonios coincidentes en forma y trayectoria', 'Reconocimiento posterior del propio gobernador'], counterEvidence: ['No hay registro de radar público confirmado para esa fase'], probability: 'media', source: 'Testimonios recopilados por National UFO Reporting Center' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1997-03-13', event: 'Primeros reportes de una formación en V sobre Nevada.' },
      { date: '1997-03-13', event: 'La formación cruza el área de Phoenix ante miles de testigos.' },
      { date: '1997-03-14', event: 'La Fuerza Aérea atribuye la fase final a bengalas de un ejercicio.' },
      { date: '2007-01-01', event: 'El exgobernador Symington reconoce públicamente haber presenciado el evento.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es, junto a Roswell, el caso más citado en cultura popular estadounidense y reavivó el interés mediático en los UAP tras décadas de baja atención pública.',
  }),

  'tic-tac-2004': buildExpediente('tic-tac-2004', {
    fullDescription: 'En noviembre de 2004, el escuadrón del portaaviones USS Nimitz interceptó un objeto sin alas, sin marcas visibles ni superficies de control, capaz de maniobras que excedían el desempeño de cualquier aeronave conocida. El caso quedó registrado en radar, en video FLIR y en el testimonio directo de los pilotos.',
    witnesses: [
      { name: 'Cmdr. David Fravor', role: 'Piloto líder del escuadrón que interceptó al objeto', credibility: 'alta', testimony: 'Describió un objeto blanco ovalado de unos doce metros que replicaba sus movimientos como si estuviera "consciente" de la presencia del caza, antes de acelerar y desaparecer.' },
      { name: 'Kevin Day', role: 'Operador de radar del USS Princeton', credibility: 'alta', testimony: 'Rastreó objetos descendiendo desde gran altitud a velocidades y con cambios de dirección incompatibles con la aerodinámica convencional durante varios días previos al encuentro.' },
    ],
    documents: [
      { id: 'tictac-doc-1', title: 'Video FLIR "Tic Tac"', date: '2004-11-14', classification: 'Desclasificado (2020)', agency: 'Departamento de Defensa de EE.UU.', pages: 1, summary: 'Grabación infrarroja tomada por el caza que confirma oficialmente la autenticidad del encuentro, publicada por el Pentágono en 2020.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'tictac-hyp-1', title: 'Vehículo aéreo no identificado con capacidades desconocidas', description: 'La combinación de maniobras sin superficies de control visibles, ausencia de firma térmica de propulsión convencional y confirmación multisensor (visual, radar e infrarrojo) no encaja con tecnología aeroespacial conocida en 2004.', evidence: ['Video FLIR desclasificado y autenticado oficialmente', 'Testimonios coincidentes de múltiples pilotos y operadores de radar'], counterEvidence: ['El Pentágono aclara que "no identificado" no equivale a "extraterrestre"'], probability: 'alta', source: 'Informe preliminar UAP de la Oficina del Director de Inteligencia Nacional (2021)' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['kean'],
    timeline: [
      { date: '2004-11-10', event: 'El radar del USS Princeton detecta objetos anómalos durante varios días.' },
      { date: '2004-11-14', event: 'El escuadrón de Fravor intercepta visualmente al objeto "Tic Tac".' },
      { date: '2017-12-16', event: 'The New York Times revela el programa AATIP y publica el video FLIR.' },
      { date: '2020-04-27', event: 'El Pentágono desclasifica y confirma oficialmente la autenticidad del video.' },
    ],
    investigationStatus: 'clasificado',
    officialResponse: 'El Departamento de Defensa confirmó la autenticidad del video en 2020 y desde entonces mantiene una oficina permanente (AARO) dedicada al análisis de fenómenos anómalos no identificados.',
    culturalImpact: 'Marcó el punto de inflexión que sacó a los UAP del estigma cultural y llevó al tema al Congreso de los Estados Unidos.',
  }),

  'belgica-1989': buildExpediente('belgica-1989', {
    fullDescription: 'Entre 1989 y 1990, más de trece mil personas en Bélgica reportaron objetos triangulares silenciosos con luces en cada vértice. La fuerza aérea belga llegó a autorizar la persecución del fenómeno con cazas F-16, cuyos radares llegaron a bloquear brevemente al objeto.',
    witnesses: [
      { name: 'Personal de la Gendarmería belga', role: 'Primeros testigos oficiales', credibility: 'alta', testimony: 'Reportaron un objeto triangular de gran tamaño desplazándose a baja velocidad sobre la localidad de Eupen la noche del 29 de noviembre de 1989.' },
      { name: 'Pilotos de F-16 (identidad reservada por la Fuerza Aérea belga)', role: 'Interceptores enviados en marzo de 1990', credibility: 'alta', testimony: 'Sus radares de a bordo bloquearon brevemente al objeto en varias ocasiones, aunque este aceleró y realizó cambios de altitud que los cazas no pudieron replicar.' },
    ],
    documents: [
      { id: 'belgica-doc-1', title: 'Informe conjunto SOBEPS - Fuerza Aérea belga', date: '1991-06-01', classification: 'Público', agency: 'Fuerza Aérea de Bélgica', pages: 150, summary: 'Análisis oficial de los datos de radar del 30-31 de marzo de 1990, coescrito con la sociedad de estudios SOBEPS, que reconoce el fenómeno como no identificado sin ofrecer explicación convencional.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'belgica-hyp-1', title: 'Fenómeno atmosférico sobre radar (angel echoes)', description: 'Parte de los contactos de radar podrían corresponder a ecos anómalos por inversión térmica, aunque esto no explica los miles de testimonios visuales de una forma triangular sólida.', evidence: ['Los "angel echoes" son un fenómeno documentado en meteorología radar'], counterEvidence: ['No explica la coherencia visual de la forma triangular reportada por miles de testigos independientes'], probability: 'media', source: 'Reanálisis civil de los datos de radar (2011)' },
      { id: 'belgica-hyp-2', title: 'Aeronave experimental o triángulo no identificado real', description: 'La combinación de testimonio masivo, confirmación por radar militar y persecución activa con cazas es, según SOBEPS, el caso mejor documentado de Europa.', evidence: ['Bloqueo de radar de los F-16 en tres ocasiones separadas', 'Consistencia geográfica y temporal de miles de reportes'], counterEvidence: ['Ningún objeto físico fue recuperado ni fotografiado con nitidez'], probability: 'media', source: 'Informe SOBEPS 1991' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1989-11-29', event: 'Primeros reportes masivos en Eupen.' },
      { date: '1990-03-30', event: 'La Fuerza Aérea belga autoriza el despegue de dos F-16.' },
      { date: '1990-03-31', event: 'Los radares de los cazas bloquean brevemente al objeto en varias ocasiones.' },
      { date: '1991-06-01', event: 'Publicación del informe conjunto con SOBEPS.' },
    ],
    investigationStatus: 'sin resolver',
    officialResponse: 'La Fuerza Aérea belga es, hasta hoy, una de las pocas del mundo en reconocer oficialmente y por escrito que no pudo identificar el objeto interceptado.',
    culturalImpact: 'Considerado el caso de "oleada" más importante de Europa y referencia obligada en cualquier debate sobre radar-visuales UAP.',
  }),

  'tehran-1976': buildExpediente('tehran-1976', {
    fullDescription: 'En septiembre de 1976, dos cazas F-4 Phantom de la fuerza aérea iraní fueron enviados a interceptar un objeto brillante sobre Teherán. Ambos aviones sufrieron fallas simultáneas de instrumentos y armamento al acercarse, un patrón que se repite en pocos casos documentados en el mundo.',
    witnesses: [
      { name: 'Gral. Parviz Jafari', role: 'Piloto del segundo F-4 interceptor', credibility: 'alta', testimony: 'Relató que, al intentar bloquear al objeto para disparar, perdió todos los sistemas de armamento y comunicación, que se restablecieron recién al alejarse del objeto.' },
    ],
    documents: [
      { id: 'tehran-doc-1', title: 'Cable DIA (Defense Intelligence Agency)', date: '1976-09-19', classification: 'Desclasificado', agency: 'Defense Intelligence Agency (EE.UU.)', pages: 4, summary: 'Reporte enviado a Washington horas después del incidente detallando fallas de instrumentos en ambos cazas y calificando el caso como "clásico" por la calidad de los testigos y equipos involucrados.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'tehran-hyp-1', title: 'Falla de sistemas por interferencia real', description: 'La coincidencia de fallas de armamento y comunicación en dos aeronaves distintas, en el mismo punto del espacio, es difícil de explicar por error humano o falla mecánica casual.', evidence: ['Reporte de la propia DIA calificando el caso de alta calidad', 'Fallas replicadas en ambos cazas de forma independiente'], counterEvidence: ['No hay registro de radar terrestre que corrobore la posición exacta del objeto'], probability: 'media', source: 'Cable DIA desclasificado (1976)' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['hynek'],
    timeline: [
      { date: '1976-09-19', event: 'Primer F-4 despega para interceptar el objeto y pierde instrumentación.' },
      { date: '1976-09-19', event: 'Un segundo F-4 pilotado por Jafari intenta el bloqueo y pierde armamento.' },
      { date: '1976-09-20', event: 'La DIA en Washington recibe el reporte y lo clasifica como caso relevante.' },
    ],
    investigationStatus: 'clasificado',
    culturalImpact: 'Es el caso de radar-visual con mayor respaldo de inteligencia militar de la Guerra Fría y referencia recurrente en informes gubernamentales posteriores sobre UAP.',
  }),

  'varginha-1996': buildExpediente('varginha-1996', {
    fullDescription: 'En enero de 1996, testigos en la ciudad brasileña de Varginha reportaron la presencia y posterior captura de una o más criaturas de aspecto no humano por parte de personal militar. Es el caso de "contacto" más citado de Sudamérica.',
    witnesses: [
      { name: 'Testigos civiles (identidad reservada)', role: 'Vecinas que reportaron el primer avistamiento', credibility: 'media', testimony: 'Describieron una criatura de piel oscura y ojos rojos agazapada en un terreno baldío, antes de que el ejército acordonara la zona.' },
      { name: 'Bomberos de Varginha', role: 'Personal que participó en la respuesta inicial', credibility: 'media', testimony: 'Confirmaron públicamente haber sido convocados a un operativo inusual, aunque negaron haber visto a la criatura directamente.' },
    ],
    documents: [
      { id: 'varginha-doc-1', title: 'Registro municipal del operativo', date: '1996-01-20', classification: 'Público', agency: 'Cuerpo de Bomberos de Varginha', pages: 2, summary: 'Confirma la movilización de personal de emergencias a la zona señalada, sin especificar la causa del llamado.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'varginha-hyp-1', title: 'Confusión con un paciente con síndrome de Down o discapacidad', description: 'Parte de la comunidad escéptica sostiene que los primeros reportes correspondieron a una persona con una condición médica, malinterpretada en la oscuridad y amplificada por el rumor local.', evidence: ['Descripciones iniciales vagas y nocturnas', 'Ausencia de evidencia física recuperada'], counterEvidence: ['No explica la movilización militar de gran escala reportada por múltiples fuentes'], probability: 'media', source: 'Análisis periodístico posterior' },
      { id: 'varginha-hyp-2', title: 'Encubrimiento militar de un ser no humano', description: 'La escala del operativo militar, sostenida por testimonios de bomberos y policías, alimenta la hipótesis de que se ocultó algo más que un animal o una persona.', evidence: ['Confirmación oficial de un operativo de emergencia inusual', 'Consistencia de testimonios civiles independientes'], counterEvidence: ['Nunca se presentó evidencia física verificable'], probability: 'baja', source: 'Literatura ufológica brasileña' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1996-01-20', event: 'Primeros testigos reportan una criatura en un terreno baldío.' },
      { date: '1996-01-20', event: 'Bomberos y personal militar acordonan la zona.' },
      { date: '1996-01-22', event: 'Trasciende públicamente el rumor de una segunda criatura capturada.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Se convirtió en el caso de referencia de la ufología brasileña, con múltiples documentales y su propio museo local dedicado al incidente.',
  }),

  'penas-1976': buildExpediente('penas-1976', {
    fullDescription: 'El "Paso de Peñas" reúne una serie de avistamientos fotografiados en la Comunidad Valenciana durante 1976, en un contexto de alta actividad ufológica en España que llevó al Ejército del Aire a abrir expedientes oficiales sobre el fenómeno.',
    witnesses: [
      { name: 'Testigos civiles de la zona', role: 'Fotógrafos aficionados', credibility: 'media', testimony: 'Capturaron una serie de imágenes de un objeto luminoso estático seguido de un rápido desplazamiento, entregadas después a investigadores civiles.' },
    ],
    documents: [
      { id: 'penas-doc-1', title: 'Expediente del Ejército del Aire español', date: '1976-11-15', classification: 'Desclasificado', agency: 'Ejército del Aire de España', pages: 18, summary: 'Uno de los expedientes desclasificados en el marco del programa de transparencia sobre OVNIs del Ejército del Aire español, iniciado en los años 90.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'penas-hyp-1', title: 'Fenómeno óptico o reflejo fotográfico', description: 'Algunos analistas atribuyen la secuencia a un artefacto de la cámara o reflejo de una fuente de luz terrestre.', evidence: ['Cámaras de la época propensas a reflejos internos'], counterEvidence: ['La secuencia muestra desplazamiento consistente entre varios cuadros'], probability: 'media', source: 'Análisis fotográfico civil' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['ribas'],
    timeline: [
      { date: '1976-11-03', event: 'Se toma la secuencia fotográfica original.' },
      { date: '1976-11-15', event: 'El Ejército del Aire abre expediente sobre el caso.' },
      { date: '1992-01-01', event: 'El expediente se desclasifica junto a otros casos españoles.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Parte del corpus de expedientes desclasificados que convirtió a España en uno de los países con archivo militar OVNI más accesible al público.',
  }),

  'trans-española-1971': buildExpediente('trans-española-1971', {
    fullDescription: 'En julio de 1971, los radares de control aéreo civil español detectaron un objeto no identificado en la ruta entre Valencia y Madrid, generando uno de los primeros expedientes de la serie que hoy conserva el Ejército del Aire.',
    witnesses: [
      { name: 'Controladores aéreos civiles', role: 'Personal de control de tránsito aéreo', credibility: 'alta', testimony: 'Confirmaron un contacto de radar sin correspondencia con ningún vuelo autorizado en la ruta, sostenido durante varios minutos.' },
    ],
    documents: [
      { id: 'transespanola-doc-1', title: 'Parte de tránsito aéreo civil', date: '1971-07-12', classification: 'Desclasificado', agency: 'Ejército del Aire de España', pages: 6, summary: 'Registro técnico del contacto de radar, incorporado después al archivo desclasificado de expedientes OVNI del Ejército del Aire.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'transespanola-hyp-1', title: 'Aeronave militar no reportada', description: 'Es posible que se tratara de una aeronave militar en vuelo no coordinado con el control civil, un problema de procedimiento más que un fenómeno anómalo.', evidence: ['Existían vuelos militares frecuentes sin coordinación total con control civil en la época'], counterEvidence: ['El expediente oficial no encontró ningún vuelo militar que coincidiera en horario'], probability: 'media', source: 'Expediente del Ejército del Aire' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['clemente'],
    timeline: [
      { date: '1971-07-12', event: 'Control aéreo detecta el contacto de radar no identificado.' },
      { date: '1990-01-01', event: 'El caso pasa a formar parte del archivo histórico desclasificado.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Uno de los primeros expedientes radar-visuales documentados en España, referencia habitual en los archivos de Carlos Clemente.',
  }),

  'chile-2014': buildExpediente('chile-2014', {
    fullDescription: 'En 2014, el Comité de Estudios de Fenómenos Aéreos Anómalos (CEFAA) de la Dirección General de Aeronáutica Civil chilena investigó de forma oficial múltiples avistamientos en la región de Valparaíso, en uno de los pocos programas gubernamentales activos de investigación UAP en el mundo.',
    witnesses: [
      { name: 'Personal técnico del CEFAA', role: 'Investigadores oficiales del organismo', credibility: 'alta', testimony: 'Analizaron videos y datos de radar entregados por pilotos comerciales y militares, clasificando el caso como no identificado tras descartar tráfico aéreo conocido.' },
    ],
    documents: [
      { id: 'chile-doc-1', title: 'Informe técnico CEFAA 2014', date: '2014-08-18', classification: 'Público', agency: 'CEFAA / DGAC Chile', pages: 22, summary: 'Análisis oficial de video y datos de radar que concluye la imposibilidad de identificar el objeto con el tráfico aéreo registrado esa noche.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'chile-hyp-1', title: 'Fenómeno atmosférico o astronómico', description: 'El CEFAA evaluó y descartó explicaciones astronómicas convencionales para el patrón de movimiento observado.', evidence: ['Trayectoria incompatible con objetos astronómicos conocidos'], counterEvidence: ['Ninguna, según el propio informe oficial'], probability: 'descartada', source: 'Informe técnico CEFAA 2014' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['kean'],
    timeline: [
      { date: '2014-08-18', event: 'Pilotos y radar registran el objeto sobre Valparaíso.' },
      { date: '2014-09-01', event: 'El CEFAA abre investigación técnica oficial.' },
      { date: '2015-03-01', event: 'Publicación del informe técnico final.' },
    ],
    investigationStatus: 'abierto',
    officialResponse: 'El CEFAA mantiene el caso catalogado oficialmente como "no identificado" dentro de su programa gubernamental permanente.',
    culturalImpact: 'Referencia obligada al hablar de investigación estatal seria sobre UAP en América Latina.',
  }),

  skinwalker: buildExpediente('skinwalker', {
    fullDescription: 'El rancho conocido como Skinwalker, en Utah, acumula décadas de reportes de fenómenos anómalos —desde luces y desapariciones de ganado hasta encuentros directos— que en los años 90 y 2000 atrajeron programas de investigación financiados de forma privada y, más tarde, al propio Pentágono.',
    witnesses: [
      { name: 'Propietarios del rancho (bajo acuerdo de confidencialidad)', role: 'Familia residente durante la oleada de reportes de los 90', credibility: 'media', testimony: 'Reportaron pérdida reiterada de ganado y avistamientos de luces sin explicación que motivaron la venta de la propiedad a un equipo de investigación privado.' },
    ],
    documents: [
      { id: 'skinwalker-doc-1', title: 'Informe AATIP (parcial)', date: '2018-01-01', classification: 'Parcialmente desclasificado', agency: 'Departamento de Defensa de EE.UU.', pages: 40, summary: 'Parte de los fondos del programa AATIP del Pentágono se destinaron a estudiar reportes asociados a la zona, según reportes periodísticos de 2017-2018.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'skinwalker-hyp-1', title: 'Combinación de folclore local y sesgo de confirmación', description: 'La reputación previa del área en la tradición navajo podría generar un sesgo de interpretación sobre eventos naturales ambiguos.', evidence: ['Fuerte tradición oral previa sobre la zona'], counterEvidence: ['Reportes de personal de seguridad sin conocimiento previo del folclore local'], probability: 'media', source: 'Análisis antropológico del caso' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1994-01-01', event: 'Inicio de la oleada de reportes documentada por la familia residente.' },
      { date: '1996-01-01', event: 'El empresario Robert Bigelow compra el rancho para investigarlo.' },
      { date: '2018-01-01', event: 'Se confirma que fondos del programa AATIP financiaron estudios asociados.' },
    ],
    investigationStatus: 'clasificado',
    culturalImpact: 'Es el estudio de caso más largo y mejor financiado de fenómenos anómalos recurrentes en un mismo lugar, origen de libros, series y documentales.',
  }),

  'gimbal-2015': buildExpediente('gimbal-2015', {
    fullDescription: 'Grabado en 2015 por un caza F/A-18 frente a la costa este de EE.UU., el video "Gimbal" muestra un objeto ovalado rotando sobre sí mismo mientras se desplaza contra un fuerte viento en sentido opuesto, sin firma térmica compatible con propulsión convencional.',
    witnesses: [
      { name: 'Pilotos de la Armada de EE.UU. (identidad no divulgada)', role: 'Tripulación del F/A-18 que grabó el encuentro', credibility: 'alta', testimony: 'Documentaron en el propio audio de cabina su sorpresa ante el movimiento del objeto, que rotaba mientras avanzaba contra el viento predominante.' },
    ],
    documents: [
      { id: 'gimbal-doc-1', title: 'Video Gimbal desclasificado', date: '2020-04-27', classification: 'Desclasificado', agency: 'Departamento de Defensa de EE.UU.', pages: 1, summary: 'El Pentágono confirmó oficialmente la autenticidad del video en abril de 2020, junto con otros dos grabados por aeronaves de la Armada.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'gimbal-hyp-1', title: 'Artefacto óptico del sistema de rastreo (glare)', description: 'Analistas independientes propusieron que la "rotación" observada es un artefacto del sistema de cámara al rastrear un avión distante contra el viento, no del objeto en sí.', evidence: ['Simulaciones que replican el efecto de rotación con aviones convencionales lejanos'], counterEvidence: ['La Armada no ha confirmado ni descartado esta explicación oficialmente'], probability: 'media', source: 'Análisis independiente de Mick West (2019)' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['kean'],
    timeline: [
      { date: '2015-01-01', event: 'Un F/A-18 graba el video durante un ejercicio de entrenamiento.' },
      { date: '2017-12-16', event: 'El video trasciende públicamente junto al caso Tic Tac.' },
      { date: '2020-04-27', event: 'El Pentágono confirma oficialmente su autenticidad.' },
    ],
    investigationStatus: 'clasificado',
    culturalImpact: 'Junto al video "Tic Tac", es uno de los tres videos oficiales que institucionalizaron el estudio de los UAP dentro del gobierno de EE.UU.',
  }),

  'guadalupe-2004': buildExpediente('guadalupe-2004', {
    fullDescription: 'Pescadores de la Isla Guadalupe, frente a la costa de Baja California, reportaron en 2004 luces submarinas y aéreas de comportamiento errático en una zona con escaso tránsito aéreo o marítimo que justifique una explicación convencional inmediata.',
    witnesses: [
      { name: 'Pescadores locales', role: 'Testigos de los avistamientos nocturnos', credibility: 'baja', testimony: 'Describieron luces que emergían del agua y ascendían a gran velocidad, repitiéndose en varias jornadas de pesca.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'guadalupe-hyp-1', title: 'Actividad militar o pesquera no identificada', description: 'La zona registra tránsito naval ocasional que podría explicar parte de las luces reportadas sin necesidad de recurrir a explicaciones anómalas.', evidence: ['Presencia documentada de tránsito naval en la región'], counterEvidence: ['Los testigos insisten en un patrón de ascenso incompatible con embarcaciones'], probability: 'media', source: 'Recopilación de testimonios locales' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '2004-03-01', event: 'Primeros reportes de pescadores locales.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'san-jose-1979': buildExpediente('san-jose-1979', {
    fullDescription: 'En agosto de 1979, varios testigos en San José capturaron fotografías de un objeto discoidal sobre la ciudad, en uno de los casos fotográficos más citados de la ufología centroamericana.',
    witnesses: [
      { name: 'Testigos civiles de San José', role: 'Autores de las fotografías originales', credibility: 'media', testimony: 'Relataron haber fotografiado un objeto estático en el cielo antes de que se desplazara rápidamente fuera de cuadro.' },
    ],
    documents: [
      { id: 'sanjose-doc-1', title: 'Análisis fotográfico independiente', date: '1980-01-01', classification: 'Público', pages: 12, summary: 'Estudio civil de las fotografías originales que no encontró evidencia de doble exposición ni montaje evidente con la tecnología de análisis disponible en la época.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'sanjose-hyp-1', title: 'Objeto lanzado o suspendido', description: 'Una hipótesis escéptica plantea un objeto pequeño lanzado al aire y fotografiado desde un ángulo que exagera su tamaño aparente.', evidence: ['Técnica de falsificación conocida y documentada para la época'], counterEvidence: ['El análisis de 1980 no encontró indicios de hilos o soportes en las imágenes'], probability: 'media', source: 'Análisis fotográfico independiente (1980)' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1979-08-22', event: 'Se toman las fotografías originales del objeto.' },
      { date: '1980-01-01', event: 'Un análisis fotográfico independiente descarta manipulación evidente.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Referencia habitual en los archivos ufológicos de Centroamérica por la calidad relativa de las fotografías para su época.',
  }),

  'mapendulo-1995': buildExpediente('mapendulo-1995', {
    fullDescription: 'El caso Mapendulo, reportado en 1995 en una zona remota de Papúa, describe un presunto encuentro de contacto directo relatado por un pequeño grupo de testigos, sin corroboración documental independiente hasta la fecha.',
    witnesses: [
      { name: 'Testigos locales (relato de segunda mano)', role: 'Miembros de la comunidad que reportaron el hecho', credibility: 'baja', testimony: 'El relato original describe un encuentro breve con una figura no humana en una zona boscosa, transmitido oralmente antes de llegar a investigadores externos.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'mapendulo-hyp-1', title: 'Relato folclórico reinterpretado', description: 'Al no existir registro documental contemporáneo al hecho, buena parte de la comunidad ufológica lo trata como un relato folclórico local reinterpretado bajo el prisma de la ufología moderna.', evidence: ['Ausencia total de registro escrito o fotográfico contemporáneo'], counterEvidence: ['El relato mantiene detalles consistentes entre los distintos testigos originales'], probability: 'baja', source: 'Recopilación etnográfica posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1995-06-09', event: 'Fecha reportada del encuentro original.' },
    ],
    investigationStatus: 'sin resolver',
  }),
};

export const getExpediente = (id: string): Expediente | undefined => expedientes[id];
