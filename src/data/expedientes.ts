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

  'trelew-1962': buildExpediente('trelew-1962', {
    fullDescription: 'En septiembre de 1962, personal de la Base Aeronaval Almirante Zar, en Trelew, reportó de forma independiente en distintos turnos de guardia un objeto luminoso no identificado sobre la ciudad. Es considerado el caso fundacional de la ufología argentina por tratarse de testigos uniformados, con instrumentación naval disponible y un expediente militar formal.',
    witnesses: [
      { name: 'Personal de guardia de la Base Aeronaval Almirante Zar', role: 'Testigos militares en distintos turnos', credibility: 'alta', testimony: 'Reportaron de forma independiente, en turnos de guardia separados, un objeto luminoso estacionario que luego se desplazó a gran velocidad sobre la base.' },
    ],
    documents: [
      { id: 'trelew-doc-1', title: 'Expediente naval de la Base Almirante Zar', date: '1962-09-15', classification: 'Desclasificado', agency: 'Armada Argentina', pages: 8, summary: 'Registro formal generado por el mando naval a partir de los partes de guardia, incorporado después a la bibliografía histórica de la ufología argentina.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'trelew-hyp-1', title: 'Globo sonda de gran altitud', description: 'La zona patagónica registraba lanzamientos ocasionales de globos meteorológicos de gran altitud que podrían explicar un objeto luminoso estacionario visto desde tierra.', evidence: ['Actividad de globos sonda documentada en la región en esa época'], counterEvidence: ['Los partes de guardia describen un desplazamiento final a alta velocidad, incompatible con un globo'], probability: 'media', source: 'Análisis histórico posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['banchs', 'zerpa'],
    timeline: [
      { date: '1962-09-01', event: 'Primer reporte de un objeto luminoso durante un turno de guardia nocturno.' },
      { date: '1962-09-01', event: 'Un segundo turno confirma de forma independiente el mismo fenómeno.' },
      { date: '1962-09-15', event: 'El mando naval formaliza el expediente con los partes de guardia recopilados.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Referencia fundacional de la ufología argentina, citado por investigadores como Roberto Banchs y Fabio Zerpa en la bibliografía histórica del país.',
  }),

  'bariloche-1995': buildExpediente('bariloche-1995', {
    fullDescription: 'El 31 de julio de 1995, el comandante Jorge Polanco, al mando del vuelo 674 de Aerolíneas Argentinas, reportó una serie de luces que siguieron a su Boeing 727 durante 17 minutos mientras se aproximaba al aeropuerto de Bariloche. El aeropuerto sufrió un corte de energía y fallas de instrumentos durante el episodio. El caso fue incluido en el informe COMETA francés de 1999 y reapareció en mayo de 2026 dentro de una nueva tanda de archivos desclasificados por el gobierno de Estados Unidos.',
    witnesses: [
      { name: 'Cmdte. Jorge Polanco', role: 'Piloto al mando del vuelo AA 674', credibility: 'alta', testimony: 'Describió luces que maniobraron junto al avión durante 17 minutos y coincidieron con un corte de energía en el aeropuerto que lo obligó a abortar el aterrizaje.' },
      { name: 'Personal de la torre de control de Bariloche', role: 'Controladores aéreos en servicio', credibility: 'alta', testimony: 'Confirmaron fallas simultáneas en los instrumentos magnéticos de la torre durante el episodio.' },
    ],
    documents: [
      { id: 'bariloche-doc-1', title: 'Informe COMETA (capítulo Argentina)', date: '1999-01-01', classification: 'Público', agency: 'Institut des Hautes Études de Défense Nationale (Francia)', pages: 4, summary: 'El informe francés sobre OVNIs y defensa incorpora el "Caso Bariloche" como ejemplo de investigación internacional del fenómeno.' },
      { id: 'bariloche-doc-2', title: 'Archivo desclasificado del Pentágono', date: '2026-05-08', classification: 'Desclasificado', agency: 'Departamento de Defensa de EE.UU.', pages: 3, summary: 'El caso reaparece en una nueva tanda de más de 160 documentos sobre UAP publicados por el gobierno estadounidense.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'bariloche-hyp-1', title: 'Fenómeno eléctrico atmosférico', description: 'Se propuso que una anomalía eléctrica atmosférica pudo afectar simultáneamente los instrumentos del avión y de la torre, generando además el efecto visual reportado.', evidence: ['Corte de energía real y documentado en el aeropuerto'], counterEvidence: ['No explica la persistencia y el comportamiento direccional de las luces durante 17 minutos'], probability: 'media', source: 'Informe COMETA 1999' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1995-07-31', event: 'El vuelo AA 674 reporta luces mientras se aproxima a Bariloche.' },
      { date: '1995-07-31', event: 'Corte de energía y fallas de instrumentos obligan a un "go-around".' },
      { date: '1999-01-01', event: 'El caso se incorpora al informe COMETA en Francia.' },
      { date: '2026-05-08', event: 'Reaparece en la nueva desclasificación de archivos UAP de EE.UU.' },
    ],
    investigationStatus: 'sin resolver',
    officialResponse: 'Nunca hubo una explicación oficial del gobierno argentino; el caso ganó respaldo internacional al ser incorporado a estudios de Francia y, más recientemente, de Estados Unidos.',
    culturalImpact: 'Es el caso UAP argentino con mayor repercusión internacional, por involucrar a un piloto comercial identificado y documentación de dos países distintos.',
  }),

  'la-aurora-1977': buildExpediente('la-aurora-1977', {
    fullDescription: 'En la madrugada del 17 de febrero de 1977, en la Estancia La Aurora, sobre el límite entre Salto y Paysandú, el propietario Ángel María "Toto" Tonna reportó el descenso de un objeto luminoso que provocó daños en alambrados, la muerte de animales y un corte de energía que dejó a oscuras a la ciudad de Salto durante horas. Es el caso de referencia de la ufología uruguaya.',
    witnesses: [
      { name: 'Ángel María "Toto" Tonna', role: 'Propietario de la estancia', credibility: 'media', testimony: 'Relató haber visto un objeto luminoso descender sobre el corral, sufrir una quemadura en el brazo y encontrar después animales muertos junto a un ombú partido a la mitad.' },
    ],
    documents: [
      { id: 'aurora-doc-1', title: 'Relevamiento de campo de la Fuerza Aérea Uruguaya', date: '1977-03-01', classification: 'Público', agency: 'Fuerza Aérea Uruguaya', pages: 5, summary: 'Personal de la fuerza aérea relevó el terreno y documentó liebres muertas sin signos de putrefacción junto al hueco dejado por el ombú calcinado.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'aurora-hyp-1', title: 'Descarga eléctrica atmosférica sobre el ombú', description: 'Un rayo pudo partir el ombú y provocar el corte de energía, con el resto de los efectos sumándose después por el impacto mediático del caso.', evidence: ['Los ombúes son frecuentemente alcanzados por rayos en la región pampeana'], counterEvidence: ['No explica la ausencia de olor a putrefacción en los animales hallados ni la quemadura reportada por el propio testigo'], probability: 'media', source: 'Análisis escéptico posterior' },
      { id: 'aurora-hyp-2', title: 'Aterrizaje de un objeto no identificado', description: 'La combinación de daños materiales, el testimonio sostenido del dueño del campo y el relevamiento oficial de la Fuerza Aérea alimentan la hipótesis de un evento físico real y no identificado.', evidence: ['Investigación de campo formal de la Fuerza Aérea Uruguaya', 'Corte de energía documentado en la ciudad de Salto'], counterEvidence: ['El principal relato proviene de un único testigo directo'], probability: 'media', source: 'Testimonios recopilados por la prensa uruguaya' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['zerpa'],
    timeline: [
      { date: '1976-01-01', event: 'Primeros reportes de luces en la estancia, según el propietario.' },
      { date: '1977-02-17', event: 'Episodio principal: descenso del objeto, daños materiales y corte de energía en Salto.' },
      { date: '1977-03-01', event: 'La Fuerza Aérea Uruguaya releva el terreno.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Convirtió a la estancia en un punto de peregrinación de ufólogos, periodistas y turistas durante más de una década, y sigue siendo la referencia obligada de la ufología uruguaya.',
  }),

  'operacao-prato-1977': buildExpediente('operacao-prato-1977', {
    fullDescription: 'Entre 1977 y 1978, la Fuerza Aérea Brasileña desplegó una operación militar secreta, conocida como Operação Prato, para investigar una ola de avistamientos y presuntos ataques luminosos —el fenómeno "chupa-chupa"— sobre la localidad de Colares, en el estado de Pará.',
    witnesses: [
      { name: 'Cap. Uyrangê Hollanda', role: 'Oficial al mando de la Operação Prato', credibility: 'alta', testimony: 'Documentó decenas de avistamientos y, tras retirarse del servicio, declaró públicamente que los objetos no tenían origen convencional; fue hallado muerto poco después, lo que alimentó teorías de encubrimiento nunca confirmadas.' },
      { name: 'Pobladores de Colares', role: 'Pescadores y agricultores locales', credibility: 'media', testimony: 'Reportaron luces que descendían de noche y provocaban quemaduras en la piel, un fenómeno que la prensa local bautizó "chupa-chupa".' },
    ],
    documents: [
      { id: 'prato-doc-1', title: 'Archivo fotográfico y fílmico de la Operação Prato', date: '1977-10-01', classification: 'Parcialmente desclasificado', agency: 'Força Aérea Brasileira', pages: 40, summary: 'Fotografías y filmaciones en Super-8 tomadas por los militares y la prensa paraense durante la operación, liberadas de forma parcial y gradual desde 2008.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'prato-hyp-1', title: 'Fenómeno bioluminiscente amazónico y pánico colectivo', description: 'Parte de la comunidad científica propone insectos o gases de descomposición de la selva como origen de las luces, amplificado por el miedo colectivo en una zona aislada.', evidence: ['La región amazónica registra fenómenos bioluminiscentes documentados'], counterEvidence: ['No explica las quemaduras reportadas por decenas de testigos ni la escala de la respuesta militar'], probability: 'media', source: 'Análisis científico posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1977-08-01', event: 'Comienzan los reportes masivos de luces y ataques en Colares.' },
      { date: '1977-10-01', event: 'La Fuerza Aérea Brasileña despliega la Operação Prato bajo el mando de Hollanda.' },
      { date: '1978-01-01', event: 'Se realizan misiones adicionales de seguimiento durante todo el año.' },
      { date: '2008-01-01', event: 'Comienza la liberación gradual de parte de la documentación al público.' },
    ],
    investigationStatus: 'clasificado',
    officialResponse: 'La Fuerza Aérea Brasileña nunca publicó conclusiones oficiales completas; buena parte del archivo permanece bajo reserva en el Arquivo Nacional de Brasil.',
    culturalImpact: 'Es el mayor operativo militar de investigación OVNI de la historia de Sudamérica y fue retratado en documentales y podcasts recientes sobre el fenómeno.',
  }),

  'cabo-valdes-1977': buildExpediente('cabo-valdes-1977', {
    fullDescription: 'En la madrugada del 25 de abril de 1977, el cabo del Ejército de Chile Armando Valdés Garrido desapareció durante una patrulla nocturna en Pampa Lluscuma, cerca de Putre, y reapareció horas después a varios kilómetros de distancia sin recordar lo sucedido. Es el caso de presunta abducción más conocido de Chile.',
    witnesses: [
      { name: 'Armando Valdés Garrido', role: 'Cabo del Ejército de Chile', credibility: 'media', testimony: 'Relató haber visto una luz intensa acercarse durante la guardia nocturna, y no recordar nada más hasta despertar desorientado, lejos de su posición original.' },
      { name: 'Compañeros de patrulla', role: 'Personal militar presente esa noche', credibility: 'alta', testimony: 'Confirmaron la desaparición repentina del cabo y la posterior búsqueda organizada por el Ejército hasta su reaparición.' },
    ],
    documents: [
      { id: 'valdes-doc-1', title: 'Parte militar del Ejército de Chile', date: '1977-04-25', classification: 'Desclasificado', agency: 'Ejército de Chile', pages: 6, summary: 'Registro oficial de la desaparición y posterior hallazgo del cabo Valdés, incluyendo el operativo de búsqueda desplegado esa noche.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'valdes-hyp-1', title: 'Desorientación por hipotermia o fatiga', description: 'La altura y las bajas temperaturas de la zona altiplánica podrían haber provocado un cuadro de confusión y desorientación que explicaría el alejamiento y la amnesia posterior.', evidence: ['Condiciones extremas de altura documentadas en la zona esa noche'], counterEvidence: ['La distancia recorrida en el tiempo reportado es difícil de explicar por una caminata desorientada'], probability: 'media', source: 'Análisis médico posterior' },
      { id: 'valdes-hyp-2', title: 'Abducción', description: 'La combinación de amnesia, la distancia recorrida y el parte militar oficial alimentó la interpretación ufológica de una abducción, la más citada de la historia chilena.', evidence: ['Parte oficial del Ejército confirmando la desaparición', 'Testimonios coincidentes de la patrulla'], counterEvidence: ['No hay evidencia física verificable del encuentro en sí'], probability: 'baja', source: 'Literatura ufológica chilena' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1977-04-25', event: 'El cabo Valdés desaparece durante la guardia nocturna en Pampa Lluscuma.' },
      { date: '1977-04-25', event: 'El Ejército organiza una búsqueda inmediata en la zona.' },
      { date: '1977-04-25', event: 'Valdés reaparece desorientado, a varios kilómetros de su posición original.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es el caso de abducción más citado de la ufología chilena y referencia obligada en cualquier repaso del fenómeno en el país.',
  }),

  'anolaima-1969': buildExpediente('anolaima-1969', {
    fullDescription: 'En 1969, en una finca de Anolaima, Cundinamarca, el agricultor Arcesio Bermúdez reportó un encuentro cercano con un objeto no identificado; murió poco después en circunstancias que su familia y algunos investigadores asociaron al episodio, aunque nunca se estableció una causa médica concluyente.',
    witnesses: [
      { name: 'Arcesio Bermúdez', role: 'Propietario de la finca donde ocurrió el encuentro', credibility: 'media', testimony: 'Según el relato familiar, describió haber tenido un encuentro cercano con un objeto luminoso poco antes de su muerte repentina.' },
      { name: 'Familiares presentes en la finca', role: 'Testigos indirectos del episodio y su desenlace', credibility: 'baja', testimony: 'Sostuvieron que la salud de Bermúdez, hasta entonces vigorosa, se deterioró de forma abrupta e inexplicable tras el encuentro relatado.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'anolaima-hyp-1', title: 'Causa médica no diagnosticada', description: 'Los propios médicos que atendieron a Bermúdez sugirieron en su momento que una picadura de insecto o una condición preexistente no diagnosticada pudo causar su muerte, sin relación con el encuentro relatado.', evidence: ['Ausencia de una autopsia detallada que confirme una causa distinta'], counterEvidence: ['La familia insiste en la salud vigorosa de Bermúdez previa al episodio'], probability: 'media', source: 'Relato familiar recogido por la prensa colombiana' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1969-01-01', event: 'Arcesio Bermúdez relata el encuentro cercano en su finca.' },
      { date: '1969-01-15', event: 'Muere días después en circunstancias no esclarecidas.' },
      { date: '2019-05-27', event: 'El caso se documenta en profundidad en una investigación periodística especial sobre ufología colombiana.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es uno de los casos fundacionales de la ufología colombiana y motivó el estudio de astrónomos locales sobre el fenómeno en el país.',
  }),

  'campeche-2004': buildExpediente('campeche-2004', {
    fullDescription: 'El 5 de marzo de 2004, un avión C-26A de la Fuerza Aérea Mexicana, al mando del mayor Magdaleno Castañón Muñoz, detectó once objetos luminosos durante un patrullaje de rutina frente a las costas de Campeche. El radar de a bordo registró varios ecos y la cámara infrarroja FLIR Star Safire II confirmó los blancos térmicos en vuelo paralelo a la aeronave.',
    witnesses: [
      { name: 'Mayor Magdaleno Castañón Muñoz', role: 'Piloto al mando del C-26A', credibility: 'alta', testimony: 'Encabezó el patrullaje de rutina durante el cual la tripulación detectó y registró los objetos, con comentarios de sorpresa capturados en el propio video de la cámara infrarroja.' },
    ],
    documents: [
      { id: 'campeche-doc-1', title: 'Video FLIR de la Fuerza Aérea Mexicana', date: '2004-03-05', classification: 'Confirmado oficialmente', agency: 'Secretaría de la Defensa Nacional (SEDENA)', pages: 1, summary: 'Grabación infrarroja del avistamiento, cuya autenticidad fue confirmada por la SEDENA en respuestas a solicitudes de información pública en 2016 y 2021.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'campeche-hyp-1', title: 'Centellas o fenómeno meteorológico', description: 'La SEDENA sugirió en su momento que los objetos podrían corresponder a centellas, un fenómeno atmosférico de burbujas de gas ionizado.', evidence: ['Las centellas son un fenómeno atmosférico reconocido científicamente'], counterEvidence: ['El patrón de vuelo paralelo y sostenido detectado por radar e infrarrojo no es típico de una centella'], probability: 'media', source: 'Declaraciones de la SEDENA (2004)' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['maussan'],
    timeline: [
      { date: '2004-03-05', event: 'El C-26A detecta los objetos en radar y cámara infrarroja frente a Campeche.' },
      { date: '2004-05-11', event: 'El video se presenta públicamente a través del periodista Jaime Maussan.' },
      { date: '2016-08-08', event: 'La SEDENA confirma la autenticidad del caso ante una solicitud de información pública.' },
      { date: '2025-07-09', event: 'La presidencia de México reconoce el caso como el único avistamiento oficialmente admitido por las autoridades del país.' },
    ],
    investigationStatus: 'abierto',
    officialResponse: 'Es, hasta la fecha, el único avistamiento que las autoridades mexicanas han reconocido oficialmente, aunque el material original nunca fue entregado a la comunidad científica sino al periodista Jaime Maussan.',
    culturalImpact: 'Es el caso UAP más citado de México y un antecedente directo del debate sobre transparencia gubernamental en torno al fenómeno OVNI en el país.',
  }),

  'uritorco-1986': buildExpediente('uritorco-1986', {
    fullDescription: 'En el verano de 1986, apareció una marca ovalada de pasto quemado de unos 70 por 120 metros en la Sierra del Pajarillo, junto al cerro Uritorco, en Capilla del Monte, Córdoba. Testigos locales reportaron luces intensas y un objeto suspendido en el aire poco antes del hallazgo. La agencia estatal Télam difundió la noticia a todo el país, y ese episodio consolidó a Capilla del Monte como el epicentro ufológico de Argentina, con un fuerte impacto en el turismo local que se mantiene hasta hoy.',
    witnesses: [
      { name: 'Testigos locales de Capilla del Monte', role: 'Vecinos que reportaron luces y un objeto suspendido', credibility: 'baja', testimony: 'Describieron luces intensas y una forma suspendida en el aire sobre la Sierra del Pajarillo, poco antes de que se descubriera la marca circular en el pastizal.' },
      { name: 'Exbombero de Capilla del Monte (identidad reservada)', role: 'Testigo que décadas después cuestionó el hallazgo', credibility: 'media', testimony: 'Declaró públicamente que la marca y otras evidencias de la época habrían sido exageradas o directamente escenificadas para atraer turismo a la zona.' },
    ],
    documents: [
      { id: 'uritorco-doc-1', title: 'Cobertura de la agencia Télam', date: '1986-02-01', classification: 'Público', agency: 'Agencia Télam', pages: 1, summary: 'La agencia estatal de noticias difundió el hallazgo de la marca de la Sierra del Pajarillo a todo el país, lo que disparó el turismo ufológico en Capilla del Monte.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'uritorco-hyp-1', title: 'Puesta en escena para fomentar el turismo', description: 'Un exbombero de la zona sostuvo años después que la marca y parte de las evidencias fueron preparadas para posicionar a Capilla del Monte como destino turístico.', evidence: ['Declaración pública de un testigo con conocimiento directo de la zona'], counterEvidence: ['La cobertura y el hallazgo original de 1986 no muestran indicios de fraude en su momento'], probability: 'media', source: 'Declaraciones de un exbombero local recogidas por la prensa cordobesa' },
      { id: 'uritorco-hyp-2', title: 'Descenso real de un objeto no identificado', description: 'La combinación de testimonios de luces, un objeto suspendido y la marca física en el pastizal alimentó la hipótesis de un aterrizaje real, reforzada por los reportes previos de actividad anómala en la zona.', evidence: ['Consistencia entre los testigos que reportaron luces esa misma noche', 'Difusión inmediata y masiva del hallazgo por un medio oficial'], counterEvidence: ['Nunca se realizó un peritaje científico independiente del terreno'], probability: 'baja', source: 'Literatura ufológica sobre el Uritorco' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1986-01-01', event: 'Testigos reportan luces y un objeto suspendido sobre la Sierra del Pajarillo.' },
      { date: '1986-01-15', event: 'Se descubre la marca ovalada de pasto quemado de 70x120 metros.' },
      { date: '1986-02-01', event: 'La agencia Télam difunde el caso a nivel nacional.' },
      { date: '1990-01-01', event: 'Capilla del Monte se consolida como "capital ovni" de Argentina, con ferias y congresos de ufología.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Convirtió a Capilla del Monte en el principal destino turístico ufológico de Argentina, con hoteles, ferias esotéricas y congresos anuales de ufología que sostienen buena parte de la economía local.',
  }),

  'erks-uritorco': buildExpediente('erks-uritorco', {
    fullDescription: 'Según la tradición local, bajo el cerro Uritorco existe Erks, una ciudad subterránea o multidimensional fundada por seres no humanos, cuyo nombre sería un acrónimo de "Encuentro de Remanentes Cósmicos Siderales". La leyenda, sin registro documental anterior a 1986, se popularizó en los meses posteriores a la aparición de la marca de la Sierra del Pajarillo, impulsada sobre todo por el investigador Guillermo Terrera, y convive desde entonces con reportes recurrentes de luces nocturnas —las llamadas "luces de Erks"— vistas por visitantes y peregrinos esotéricos que suben al cerro.',
    witnesses: [
      { name: 'Guillermo Terrera', role: 'Investigador y principal divulgador de la leyenda', credibility: 'baja', testimony: 'Sostuvo que Erks es un centro energético de alta concentración asentado sobre un campo de pirita magnética, y que funciona como un "vórtice" antes que como una ciudad física convencional.' },
      { name: 'Visitantes y peregrinos esotéricos', role: 'Turistas que suben al cerro en busca de contacto', credibility: 'baja', testimony: 'Relatan luces nocturnas, sensaciones energéticas y, en algunos casos, encuentros o mensajes que atribuyen a los supuestos habitantes de Erks.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'erks-hyp-1', title: 'Construcción cultural posterior al caso Pajarillo', description: 'No existen menciones documentadas de "Erks" anteriores a 1986. La leyenda se consolidó en paralelo al auge del turismo esotérico en Capilla del Monte tras la marca de la Sierra del Pajarillo, por lo que buena parte de los investigadores la consideran una elaboración moderna más que una tradición ancestral.', evidence: ['Ausencia de referencias a "Erks" en fuentes previas a 1986', 'Coincidencia temporal exacta con el boom turístico posterior al caso Pajarillo'], counterEvidence: ['Sus divulgadores sostienen la existencia de una tradición oral previa no documentada'], probability: 'alta', source: 'Análisis periodístico y folklórico posterior' },
      { id: 'erks-hyp-2', title: 'Anomalía geomagnética real por pirita', description: 'La zona del Uritorco presenta yacimientos de pirita magnética documentados geológicamente, lo que según los defensores de la leyenda explicaría percepciones alteradas, fallas de brújulas y el "magnetismo" atribuido al lugar.', evidence: ['Presencia geológica documentada de pirita en la zona'], counterEvidence: ['Ningún estudio geológico independiente confirmó efectos anómalos verificables sobre las personas'], probability: 'baja', source: 'Divulgación de Guillermo Terrera' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1986-01-15', event: 'La marca de la Sierra del Pajarillo dispara el interés ufológico y esotérico por el Uritorco.' },
      { date: '1986-06-01', event: 'Guillermo Terrera y otros divulgadores popularizan el nombre "Erks" para la supuesta ciudad subterránea.' },
      { date: '1990-01-01', event: 'La leyenda se consolida como parte central del imaginario turístico y esotérico de Capilla del Monte.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Convirtió al Uritorco en un centro de peregrinación esotérica, con encuentros de "contactados" y una identidad turística que combina ufología y espiritualidad new age.',
  }),

  'ingeniero-white-1975': buildExpediente('ingeniero-white-1975', {
    fullDescription: 'En la madrugada del 5 de enero de 1975, el obrero ferroviario Carlos Díaz —que además trabajaba como mozo— terminó un turno en un casamiento en Ingeniero White, Bahía Blanca, cerca de las tres de la mañana, e intentó volver a su casa. Dieciocho minutos después apareció desorientado en el patio de una vivienda del barrio porteño de Constitución, a más de 650 kilómetros de distancia. Relató haber sido interceptado por un objeto volador y haber tenido contacto con seres de piel verdosa y sin manos que "levitaban". Es uno de los casos de abducción con mayor seguimiento médico de la ufología argentina.',
    witnesses: [
      { name: 'Carlos Díaz', role: 'Obrero ferroviario y testigo directo', credibility: 'media', testimony: 'Relató haber visto una luz intensa acercarse, perder la noción del tiempo y aparecer desorientado en Constitución sin recordar el trayecto ni cómo llegó hasta ahí.' },
      { name: 'Andrea Pérez Simondini', role: 'Directora de CEFORA, comisión que estudió el caso', credibility: 'alta', testimony: 'Sostuvo que la historia clínica de Díaz respaldó su relato de pérdida total de vello corporal, y que fue sometido a exámenes psiquiátricos de los que salió sin patología alguna. Señaló además una marca en el abdomen sin cirugía previa y que su reloj se detuvo en el momento del hecho.' },
    ],
    documents: [
      { id: 'white-doc-1', title: 'Historia clínica y exámenes psiquiátricos', date: '1975-02-01', classification: 'Citado por CEFORA', agency: 'CEFORA (Comisión de Estudio del Fenómeno OVNI)', pages: 1, summary: 'Registros médicos citados públicamente por la investigadora Andrea Pérez Simondini, que documentan la pérdida total de vello corporal de Díaz y una marca abdominal sin cirugía previa, además de exámenes psiquiátricos que no hallaron patología.' },
    ],
    photos: [],
    hypotheses: [
      { id: 'white-hyp-1', title: 'Fuga disociativa o episodio psiquiátrico', description: 'Un cuadro de fuga disociativa podría explicar la desorientación y la aparición en un lugar distinto, aunque no resuelve por sí solo la distancia recorrida en tan poco tiempo ni los hallazgos físicos posteriores.', evidence: ['Es la explicación convencional más citada para relatos de este tipo'], counterEvidence: ['Los propios exámenes psiquiátricos de Díaz no hallaron ninguna patología'], probability: 'media', source: 'Literatura psiquiátrica sobre relatos de abducción' },
      { id: 'white-hyp-2', title: 'Abducción con traslado no convencional', description: 'La combinación de la distancia —más de 650 km en dieciocho minutos—, la pérdida de vello corporal, la marca abdominal y el reloj detenido llevó a CEFORA a catalogarlo entre los casos argentinos con mayor respaldo médico documentado.', evidence: ['Respaldo de historia clínica citado por CEFORA', 'Imposibilidad de recorrer esa distancia por medios de transporte convencionales en ese lapso'], counterEvidence: ['No hay testigos independientes del momento exacto del traslado'], probability: 'baja', source: 'Andrea Pérez Simondini (CEFORA)' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1975-01-05', event: 'Carlos Díaz desaparece en Ingeniero White tras terminar su turno como mozo.' },
      { date: '1975-01-05', event: 'Reaparece dieciocho minutos después en el barrio de Constitución, Buenos Aires, a más de 650 km.' },
      { date: '1975-02-01', event: 'Es sometido a exámenes médicos y psiquiátricos que documentan la pérdida de vello corporal y descartan patología.' },
      { date: '2023-08-01', event: 'El caso recobra notoriedad mediática nacional con nuevas entrevistas a Díaz y a la investigadora Andrea Pérez Simondini.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es uno de los casos de abducción más citados de la ufología argentina y uno de los pocos con seguimiento médico documentado a largo plazo.',
  }),

  'iberah': buildExpediente('iberah', {
    fullDescription: 'Iberah es, según la tradición esotérica argentina, una "ciudad intraterrena" ubicada en La Lobería (zona de Punta Bermeja), a unos 60 km de Viedma, sobre la costa atlántica de Río Negro. Pertenece a la misma familia de leyendas que Erks: el ovnílogo Alejandro Adolfo Di Noto, en su libro "Urbes subterráneas", menciona nueve ciudades bajo superficie —entre ellas Iberah (Río Negro), Erks (Uritorco, Córdoba) e Isidris (Mendoza)—, descritas como centros ubicados en una dimensión paralela con "entradas físicas" en la superficie. Según esta creencia, Iberah sería un "centro planetario" dedicado a la transmutación de la materia. No hay ninguna evidencia científica de su realidad física: se trata de un fenómeno de turismo energético y ufológico que en los últimos años generó incluso un "Iberah Fest" en La Lobería.',
    witnesses: [
      { name: 'Difusores del turismo místico local', role: 'Vecinos y guías de La Lobería', credibility: 'baja', testimony: 'Sostienen que en Punta Bermeja se encuentra un "centro planetario" dentro de la cadena de ciudades intraterrenas de América, y organizan meditaciones y vigilias de avistamiento en la zona.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'iberah-hyp-1', title: 'Fenómeno de turismo místico moderno', description: 'Al igual que Erks, Iberah funciona como una propuesta de turismo energético y ufológico centrada en La Lobería —meditaciones, vigilias de avistamiento y charlas—, sin sustento físico verificable y con difusión reciente (desde 2020).', evidence: ['La difusión pública arranca alrededor de 2020 mediante comunicados turísticos', 'La fuente principal es un único libro de un ovnílogo, no registros independientes', 'En 2021 se lanzó el "Iberah Fest" como evento turístico'], counterEvidence: [], probability: 'alta', source: 'Cobertura periodística de Río Negro (Más Río Negro)' },
      { id: 'iberah-hyp-2', title: 'Ciudad intraterrena', description: 'La corriente esotérica sostiene que Iberah es un centro planetario intraterreno, parte de una red de ciudades ocultas de América conectada con Erks e Isidris.', evidence: ['Relatos de contactados locales'], counterEvidence: ['Ausencia total de evidencia física o geológica', 'Sin menciones documentadas anteriores a su difusión turística'], probability: 'descartada', source: 'Libro "Urbes subterráneas" (A. Di Noto) y sitios esotéricos' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '2020-04-06', event: 'La prensa de Río Negro difunde la existencia de la supuesta ciudad de Iberah en La Lobería.' },
      { date: '2021-12-22', event: 'Se lanza la primera edición del "Iberah Fest" en La Lobería.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es la versión patagónica de Erks: convirtió a La Lobería en un punto de turismo místico y ufológico en Río Negro.',
  }),

  'hill-1961': buildExpediente('hill-1961', {
    fullDescription: 'La noche del 19 de septiembre de 1961, Betty y Barney Hill regresaban en auto a New Hampshire cuando reportaron ser seguidos por una luz. Bajo hipnosis relataron por separado un episodio de abducción y examen a bordo, incluido el célebre "mapa estelar" que Betty asoció luego al sistema Zeta Reticuli. El caso, narrado en el libro The Interrupted Journey, fijó el molde de casi todos los relatos de abducción posteriores.',
    witnesses: [
      { name: 'Betty y Barney Hill', role: 'Matrimonio protagonista del caso', credibility: 'media', testimony: 'Relataron por separado, bajo hipnosis regresiva, un encuentro y un examen a bordo de una nave, con lagunas de memoria coincidentes en el tiempo del trayecto.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'hill-hyp-1', title: 'Falsos recuerdos inducidos por hipnosis', description: 'La narración detallada surgió recién bajo hipnosis años después, técnica hoy cuestionada por generar confabulaciones.', evidence: ['El relato se construyó en sesiones de hipnosis posteriores', 'Betty había tenido pesadillas recurrentes antes de las sesiones'], counterEvidence: ['La coincidencia entre ambos relatos, obtenidos por separado', 'La pérdida de tiempo en el trayecto quedó registrada'], probability: 'alta', source: 'Análisis psicológico posterior' },
      { id: 'hill-hyp-2', title: 'Abducción real', description: 'La consistencia entre los dos testimonios y el "mapa estelar" se interpretan como evidencia de un episodio real.', evidence: ['Testimonios independientes coincidentes', 'El mapa estelar asociado a Zeta Reticuli'], counterEvidence: ['La correspondencia del mapa con Zeta Reticuli es estadísticamente débil'], probability: 'baja', source: 'The Interrupted Journey (John G. Fuller)' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1961-09-19', event: 'El matrimonio Hill reporta ser seguido por una luz en la ruta 3 de New Hampshire.' },
      { date: '1964-01-01', event: 'Bajo hipnosis del Dr. Benjamin Simon relatan el episodio de abducción.' },
      { date: '1966-01-01', event: 'Se publica The Interrupted Journey y el caso se vuelve mundialmente conocido.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es el arquetipo del relato moderno de abducción: mapa estelar, "grises" y pérdida de tiempo pasaron a la cultura popular a partir de este caso.',
  }),

  'villas-boas-1957': buildExpediente('villas-boas-1957', {
    fullDescription: 'El 16 de octubre de 1957, el joven agricultor Antônio Villas Boas afirmó haber sido llevado a bordo de una nave mientras araba de noche en Minas Gerais, y sometido a un examen. Es el caso de abducción con repercusión más antiguo que se conozca, anterior incluso al de los Hill.',
    witnesses: [
      { name: 'Antônio Villas Boas', role: 'Agricultor, único testigo', credibility: 'baja', testimony: 'Relató haber sido inmovilizado y llevado a bordo; tras el episodio presentó lesiones en la piel y síntomas atribuidos por un médico a exposición a radiación.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'villas-hyp-1', title: 'Relato individual sin corroboración', description: 'Al tratarse de un único testigo sin pruebas físicas independientes verificables, buena parte de los investigadores lo consideran no comprobable.', evidence: ['No hay testigos adicionales', 'La difusión llegó años después del hecho'], counterEvidence: ['El examen médico posterior documentó lesiones dérmicas'], probability: 'media', source: 'Investigación de Olavo Fontes' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1957-10-16', event: 'Villas Boas reporta el episodio mientras araba de noche.' },
      { date: '1958-01-01', event: 'El médico Olavo Fontes lo examina y documenta lesiones compatibles con radiación.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'pascagoula-1973': buildExpediente('pascagoula-1973', {
    fullDescription: 'La noche del 11 de octubre de 1973, los pescadores Charles Hickson y Calvin Parker afirmaron haber sido abducidos por seres con pinzas mientras pescaban en el río Pascagoula, Mississippi. El caso volvió a la actualidad en 2019 cuando aparecieron testigos independientes que dijeron haber visto algo esa misma noche.',
    witnesses: [
      { name: 'Charles Hickson y Calvin Parker', role: 'Pescadores protagonistas', credibility: 'media', testimony: 'Describieron tres seres con piel arrugada y pinzas que los llevaron flotando al interior de un objeto, donde fueron examinados.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'pascagoula-hyp-1', title: 'Encuentro genuino no explicado', description: 'La consistencia de ambos testigos a lo largo de décadas y la aparición de testigos externos en 2019 dan sustento al relato.', evidence: ['Ambos mantuvieron el relato sin lucrar con él', 'Testigos independientes surgieron en 2019'], counterEvidence: ['No hay evidencia física del objeto'], probability: 'media', source: 'Investigación de J. Allen Hynek y reportes de 2019' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['hynek'],
    timeline: [
      { date: '1973-10-11', event: 'Hickson y Parker reportan la abducción mientras pescaban.' },
      { date: '2019-01-01', event: 'Aparecen testigos independientes que corroboran haber visto algo esa noche.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'allagash-1976': buildExpediente('allagash-1976', {
    fullDescription: 'En agosto de 1976, cuatro campistas —los gemelos Jack y Jim Weiner junto a dos amigos— relataron haber sido abducidos durante una excursión de pesca en la reserva de Allagash, Maine. Los recuerdos emergieron años después bajo hipnosis y fueron documentados por el investigador Raymond Fowler.',
    witnesses: [
      { name: 'Los cuatro campistas de Allagash', role: 'Testigos protagonistas', credibility: 'baja', testimony: 'Relataron bajo hipnosis un examen a bordo tras ser atraídos por una esfera de luz mientras pescaban de noche en canoa.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'allagash-hyp-1', title: 'Recuerdos recuperados por hipnosis', description: 'Como en otros casos, los detalles surgieron por hipnosis regresiva, lo que arroja dudas sobre su fiabilidad.', evidence: ['El relato se reconstruyó años después mediante hipnosis'], counterEvidence: ['Los cuatro testigos coincidieron en elementos centrales'], probability: 'media', source: 'The Allagash Abductions (Raymond Fowler)' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1976-08-20', event: 'Los campistas reportan una esfera de luz sobre el lago Eagle.' },
      { date: '1988-01-01', event: 'Bajo hipnosis emergen los relatos de abducción documentados por Fowler.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'walton-1975': buildExpediente('walton-1975', {
    fullDescription: 'El 5 de noviembre de 1975, el leñador Travis Walton desapareció durante cinco días tras recibir un haz de luz de un objeto frente a su cuadrilla en un bosque de Arizona. Sus compañeros pasaron el polígrafo, y el caso se convirtió en la base de la película Fire in the Sky.',
    witnesses: [
      { name: 'Travis Walton', role: 'Leñador abducido', credibility: 'media', testimony: 'Afirmó despertar dentro de un objeto rodeado de seres antes de reaparecer cinco días después, desorientado.' },
      { name: 'Cuadrilla de leñadores', role: 'Seis compañeros de trabajo', credibility: 'media', testimony: 'Declararon haber visto el haz de luz golpear a Walton y huir del lugar; varios pasaron pruebas de polígrafo.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'walton-hyp-1', title: 'Encuentro corroborado por múltiples testigos', description: 'A diferencia de otras abducciones, hubo seis testigos del momento inicial y una desaparición real de cinco días.', evidence: ['Seis testigos del haz de luz', 'La desaparición fue objeto de una búsqueda policial real', 'Varios pasaron el polígrafo'], counterEvidence: ['El polígrafo no es prueba concluyente', 'No hay evidencia física del objeto'], probability: 'media', source: 'The Walton Experience (Travis Walton)' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1975-11-05', event: 'Walton recibe el haz de luz frente a su cuadrilla y desaparece.' },
      { date: '1975-11-10', event: 'Reaparece a cinco días, desorientado, a las afueras de un pueblo cercano.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Inspiró la película Fire in the Sky (1993), uno de los relatos de abducción más difundidos del cine.',
  }),

  'kelly-hopkinsville-1955': buildExpediente('kelly-hopkinsville-1955', {
    fullDescription: 'La noche del 21 de agosto de 1955, la familia Sutton afirmó haber pasado horas disparando contra pequeñas criaturas de aspecto metálico que rodeaban su granja cerca de Kelly, Kentucky. Investigado por J. Allen Hynek, el caso es un clásico de encuentro con ocupantes y origen del cliché de los "hombrecitos verdes".',
    witnesses: [
      { name: 'Familia Sutton', role: 'Habitantes de la granja', credibility: 'media', testimony: 'Describieron varias criaturas pequeñas de brazos largos y ojos grandes que reaparecían pese a los disparos, hasta que la familia huyó a la comisaría.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'kelly-hyp-1', title: 'Confusión con fauna nocturna', description: 'Una hipótesis escéptica atribuye el episodio a búhos reales agrandados por el miedo y la oscuridad.', evidence: ['Los búhos reales tienen ojos grandes y son territoriales', 'La familia estaba muy alterada'], counterEvidence: ['El relato describe criaturas erguidas y coordinadas', 'Varios adultos coincidieron en la descripción'], probability: 'media', source: 'Análisis escéptico posterior' },
      { id: 'kelly-hyp-2', title: 'Encuentro con ocupantes', description: 'La cantidad de testigos y la coherencia del relato sostienen la versión de un encuentro real con entidades.', evidence: ['Múltiples testigos adultos', 'Intervención policial la misma noche'], counterEvidence: ['Ausencia total de evidencia física'], probability: 'baja', source: 'Investigación de J. Allen Hynek' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['hynek'],
    timeline: [
      { date: '1955-08-21', event: 'La familia Sutton reporta el asedio de las criaturas y acude a la policía.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Popularizó la imagen del "hombrecito verde" como sinónimo de extraterrestre en la cultura anglosajona.',
  }),

  'flatwoods-1952': buildExpediente('flatwoods-1952', {
    fullDescription: 'El 12 de septiembre de 1952, tras ver caer un objeto luminoso, un grupo de vecinos de Flatwoods, Virginia Occidental, describió una entidad enorme y brillante en una colina. El "monstruo de Flatwoods" combina un efecto físico (el objeto en llamas) con la aparición de un ser.',
    witnesses: [
      { name: 'Grupo de Flatwoods', role: 'Vecinos y niños que subieron la colina', credibility: 'baja', testimony: 'Describieron una figura de varios metros con una "capucha" y un resplandor, además de un olor penetrante que les provocó náuseas.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'flatwoods-hyp-1', title: 'Meteoro más lechuza', description: 'La explicación convencional combina un meteoro esa noche con una lechuza posada que, con el miedo, se percibió como una criatura gigante.', evidence: ['Se registró un meteoro sobre la región esa noche', 'Las lechuzas de granero coinciden con la "cara" descrita'], counterEvidence: ['El grupo describió movimiento y gran tamaño', 'Reportaron un olor que les causó malestar físico'], probability: 'alta', source: 'Análisis escéptico posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1952-09-12', event: 'Vecinos ven caer un objeto y describen la entidad en la colina.' },
    ],
    investigationStatus: 'cerrado',
    culturalImpact: 'El "monstruo de Flatwoods" es un ícono del folclore de Virginia Occidental, con festival y estatuas propias.',
  }),

  'valensole-1965': buildExpediente('valensole-1965', {
    fullDescription: 'El 1 de julio de 1965, el agricultor Maurice Masse vio a dos seres pequeños junto a una nave posada en su lavandal de Valensole, Provenza. Tras el episodio, el cultivo dejó de crecer en el sitio exacto del aterrizaje. Es uno de los casos con ocupantes y efecto físico más sólidos de Francia.',
    witnesses: [
      { name: 'Maurice Masse', role: 'Agricultor, testigo directo', credibility: 'media', testimony: 'Relató acercarse a lo que creyó vándalos y encontrar dos seres junto a un objeto ovoide; quedó momentáneamente paralizado antes de que la nave despegara.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'valensole-hyp-1', title: 'Encuentro con efecto físico', description: 'La marca del terreno y la esterilidad posterior del cultivo aportan un elemento físico poco común entre los casos de ocupantes.', evidence: ['El lavandal dejó de crecer en el punto señalado', 'La gendarmería documentó marcas en el suelo'], counterEvidence: ['Un único testigo directo del encuentro'], probability: 'media', source: 'Investigación de la gendarmería francesa y de Aimé Michel' },
    ],
    relatedMedia: [],
    relatedInvestigators: ['vallee'],
    timeline: [
      { date: '1965-07-01', event: 'Masse reporta el encuentro; la gendarmería documenta marcas en el terreno.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'voronezh-1989': buildExpediente('voronezh-1989', {
    fullDescription: 'El 27 de septiembre de 1989, decenas de personas —muchas de ellas niños— reportaron el aterrizaje de un objeto y la aparición de seres altos en un parque de Vorónezh. Lo insólito fue que la agencia oficial soviética TASS difundió la noticia, algo inédito en la URSS.',
    witnesses: [
      { name: 'Testigos del parque de Vorónezh', role: 'Vecinos y niños', credibility: 'baja', testimony: 'Describieron un objeto esférico y uno o varios seres de gran altura acompañados de un "robot", vistos a plena luz en un parque concurrido.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'voronezh-hyp-1', title: 'Histeria colectiva infantil', description: 'La mayoría de los testigos eran niños y el relato varió mucho entre versiones, lo que sugiere una construcción colectiva amplificada por la prensa.', evidence: ['Predominio de testigos infantiles', 'Discrepancias entre las versiones'], counterEvidence: ['La difusión provino de la agencia oficial TASS'], probability: 'alta', source: 'Análisis de prensa y escéptico posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1989-09-27', event: 'Se reporta el avistamiento con seres en el parque de Vorónezh.' },
      { date: '1989-10-09', event: 'La agencia soviética TASS difunde el caso a la prensa internacional.' },
    ],
    investigationStatus: 'sin resolver',
  }),

  'ariel-school-1994': buildExpediente('ariel-school-1994', {
    fullDescription: 'El 16 de septiembre de 1994, alrededor de 62 alumnos de la escuela Ariel, en Ruwa (Zimbabue), afirmaron ver una nave posada y uno o más seres que los observaban durante el recreo. El caso fue investigado por el psiquiatra de Harvard John Mack y sigue siendo citado por la coincidencia entre los relatos infantiles.',
    witnesses: [
      { name: 'Alumnos de la Escuela Ariel', role: 'Unos 62 niños de entre 6 y 12 años', credibility: 'media', testimony: 'Describieron de forma coincidente un objeto plateado posado en la maleza y un ser de ojos grandes que se comunicó con algunos por sensación o mirada.' },
    ],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'ariel-hyp-1', title: 'Encuentro colectivo genuino', description: 'La coincidencia entre decenas de dibujos y relatos infantiles independientes es difícil de explicar por mera sugestión.', evidence: ['Dibujos coincidentes hechos por separado', 'Entrevistas filmadas poco después del hecho'], counterEvidence: ['La influencia entre compañeros no puede descartarse'], probability: 'media', source: 'Investigación de John Mack y Cynthia Hind' },
      { id: 'ariel-hyp-2', title: 'Sugestión y contagio social', description: 'Un primer relato pudo propagarse entre los niños durante el recreo, generando una memoria compartida.', evidence: ['Los niños estaban juntos y conversaron antes de las entrevistas'], counterEvidence: ['La consistencia de detalles específicos entre relatos independientes'], probability: 'media', source: 'Análisis escéptico posterior' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1994-09-16', event: 'Los alumnos reportan el encuentro durante el recreo en Ruwa.' },
      { date: '1994-12-01', event: 'John Mack viaja a Zimbabue y entrevista a los niños.' },
    ],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Es el caso de encuentro con ocupantes con más testigos infantiles simultáneos documentado, y protagonizó documentales recientes.',
  }),

  'isidris-mendoza': buildExpediente('isidris-mendoza', {
    fullDescription: 'Isidris es, según la tradición esotérica, la tercera ciudad intraterrena argentina, mencionada junto a Erks e Iberah en el libro "Urbes subterráneas" del ovnílogo Alejandro Di Noto. Su ubicación en la cordillera mendocina es imprecisa y no hay ninguna evidencia física: se trata de una leyenda.',
    witnesses: [],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'isidris-hyp-1', title: 'Leyenda esotérica moderna', description: 'Isidris aparece únicamente en literatura New Age reciente, sin registros independientes ni evidencia geológica.', evidence: ['La única fuente es el libro de Di Noto', 'No existen coordenadas ni pruebas físicas'], counterEvidence: [], probability: 'alta', source: 'Libro "Urbes subterráneas" (A. Di Noto)' },
      { id: 'isidris-hyp-2', title: 'Ciudad intraterrena real', description: 'La corriente esotérica la considera un centro intraterreno parte de una red junto a Erks e Iberah.', evidence: ['Relatos de contactados'], counterEvidence: ['Ausencia total de evidencia', 'Ubicación imprecisa'], probability: 'descartada', source: 'Sitios esotéricos' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [],
    investigationStatus: 'sin resolver',
    culturalImpact: 'Completa, junto a Erks e Iberah, la tríada de "ciudades intraterrenas" argentinas del imaginario New Age local.',
  }),

  'telos-shasta': buildExpediente('telos-shasta', {
    fullDescription: 'Telos es la ciudad intraterrena más famosa del mundo: una supuesta urbe lemuriana oculta bajo el Monte Shasta, en California, popularizada por la literatura teosófica y New Age del siglo XX. No tiene ninguna evidencia y funciona como el referente internacional de leyendas como Erks e Iberah.',
    witnesses: [],
    documents: [],
    photos: [],
    hypotheses: [
      { id: 'telos-hyp-1', title: 'Folclore New Age', description: 'La ciudad de Telos proviene de obras teosóficas y New Age, sin ningún sustento físico ni geológico.', evidence: ['Origen en literatura esotérica del siglo XX', 'El Monte Shasta es un volcán sin cavidades urbanas conocidas'], counterEvidence: [], probability: 'alta', source: 'Literatura teosófica y New Age' },
    ],
    relatedMedia: [],
    relatedInvestigators: [],
    timeline: [
      { date: '1934-01-01', event: 'La obra "Unveiled Mysteries" de Guy Ballard populariza la ciudad oculta bajo el Monte Shasta.' },
    ],
    investigationStatus: 'cerrado',
    culturalImpact: 'Es el arquetipo internacional de la ciudad intraterrena, referencia obligada para las versiones argentinas Erks e Iberah.',
  }),
};

export const getExpediente = (id: string): Expediente | undefined => expedientes[id];
