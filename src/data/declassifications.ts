export interface Declassification {
  id: string;
  country: string;
  agency: string;
  title: string;
  description: string;
  period: string;
  url: string;
}

export const declassifications: Declassification[] = [
  { id: 'usa-aaro', country: 'Estados Unidos', agency: 'AARO — Departamento de Defensa', title: 'Registros y casos UAP de la Oficina de Resolución de Anomalías', description: 'Archivo oficial de informes anuales al Congreso, videos autenticados (Tic Tac, Gimbal, GoFast) e imágenes de resolución de casos UAP del Pentágono.', period: '2022 – presente', url: 'https://www.aaro.mil/UAP-Records/' },
  { id: 'espana-defensa', country: 'España', agency: 'Ministerio de Defensa / Ejército del Aire', title: 'Expedientes OVNI desclasificados', description: '80 expedientes y cerca de 1.900 páginas de avistamientos investigados por el Ejército del Aire entre 1962 y 1995, liberados y digitalizados en la Biblioteca Virtual de Defensa.', period: '1992 – 1999', url: 'https://bibliotecavirtual.defensa.gob.es/BVMDefensa/es/consulta/registro.do?id=42382' },
  { id: 'francia-geipan', country: 'Francia', agency: 'GEIPAN — CNES', title: 'Archivo de Fenómenos Aeroespaciales No Identificados', description: 'El organismo oficial francés que investiga y publica desde 1977 todos los reportes de PAN, con el histórico informe COMETA (1999) como antecedente directo.', period: '1977 – presente', url: 'https://www.cnes-geipan.fr/en/home' },
  { id: 'chile-cefaa', country: 'Chile', agency: 'CEFAA / SEFAA — DGAC', title: 'Informes técnicos de fenómenos aéreos anómalos', description: 'Casos investigados y resueltos oficialmente por el organismo estatal chileno, publicados de forma periódica desde su creación en 1997.', period: '1997 – presente', url: 'https://www.cefaa.gob.cl' },
  { id: 'uruguay-cridovni', country: 'Uruguay', agency: 'CRIDOVNI — Fuerza Aérea Uruguaya', title: 'Comisión Receptora e Investigadora de Denuncias de OVNI', description: 'Con más de 1.570 denuncias investigadas desde 1979, es una de las comisiones oficiales más antiguas de Latinoamérica y sirvió de modelo para Chile, Argentina y Perú.', period: '1979 – presente', url: 'https://www.fau.mil.uy/es/noticias/481-40-anos-de-existencia-de-la-cridovni.html' },
  { id: 'brasil-arquivo', country: 'Brasil', agency: 'Arquivo Nacional / Força Aérea Brasileira', title: 'Acervo de casos OVNI (1952–2023)', description: 'La fuerza aérea brasileña transfirió al Arquivo Nacional todo su archivo sobre casos ovni, incluidas las 2.000 páginas, 500 fotos y 16 horas de filmación de la Operação Prato.', period: 'Liberado en 2023', url: 'https://querepublicaeessa.an.gov.br/index.php/que-republica-e-essa/assuntos/temas/302-os-ovnis-no-arquivo-nacional' },
  { id: 'mexico-transparencia', country: 'México', agency: 'Plataforma Nacional de Transparencia', title: 'Solicitudes de información sobre el caso Campeche y otros avistamientos', description: 'Vía solicitudes de transparencia, la SEDENA confirmó en 2016 y 2021 la autenticidad del video del caso Campeche (2004), aunque reconoció haber entregado el material original a un particular.', period: '2016 – 2021', url: 'https://www.plataformadetransparencia.org.mx/' },
  { id: 'argentina-bariloche', country: 'Argentina', agency: 'Desclasificación conjunta con EE.UU.', title: 'Reaparición del "caso Bariloche" en archivos UAP', description: 'El caso del comandante Jorge Polanco (1995) reapareció en mayo de 2026 dentro de una nueva tanda de más de 160 documentos UAP desclasificados por el gobierno de Estados Unidos.', period: '2026', url: 'https://www.rionegro.com.ar/el-gobierno-desclasifico-el-caso-bariloche-sobre-avistamiento-de-ovnis-1504511/' },
];
