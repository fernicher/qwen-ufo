export type CaseType = 'avistamiento' | 'aterrizaje' | 'contacto' | 'radar' | 'fotografico';
export type Credibility = 'A' | 'B' | 'C';

export interface UFOCase {
  id: string;
  title: string;
  date: string;
  location: string;
  country: string;
  type: CaseType;
  credibility: Credibility;
  description: string;
  coordinates: [number, number];
  tags: string[];
}

export const ufoCases: UFOCase[] = [
  { id: 'roswell-1947', title: 'Incidente de Roswell', date: '1947-07-07', location: 'Roswell, Nuevo México', country: 'Estados Unidos', type: 'aterrizaje', credibility: 'B', description: 'El caso más famoso. El ejército anunció la recuperación de un "platillo volante" y luego rectificó.', coordinates: [33.3943, -104.5230], tags: ['militar', 'desclasificado'] },
  { id: 'rendlesham-1980', title: 'Bosque de Rendlesham', date: '1980-12-26', location: 'Suffolk, Inglaterra', country: 'Reino Unido', type: 'aterrizaje', credibility: 'A', description: 'El "Roswell británico". Múltiples testigos militares reportaron una nave triangular.', coordinates: [52.0833, 1.4167], tags: ['militar', 'radiación'] },
  { id: 'phoenix-1997', title: 'Luces de Phoenix', date: '1997-03-13', location: 'Phoenix, Arizona', country: 'Estados Unidos', type: 'avistamiento', credibility: 'A', description: 'Miles de personas observaron una formación en V de luces silenciosas.', coordinates: [33.4484, -112.0740], tags: ['formación'] },
  { id: 'tic-tac-2004', title: 'Encuentro USS Nimitz', date: '2004-11-14', location: 'Costa de San Diego', country: 'Estados Unidos', type: 'radar', credibility: 'A', description: 'El Cmdr. Fravor interceptó un objeto Tic Tac. Confirmado por radar y video FLIR.', coordinates: [32.1482, -119.5736], tags: ['pentágono', 'flir'] },
  { id: 'belgica-1989', title: 'Oleada Belga', date: '1989-11-29', location: 'Eupen, Bélgica', country: 'Bélgica', type: 'radar', credibility: 'A', description: 'Más de 13,000 testigos. F-16 capturaron al objeto en radar.', coordinates: [50.6293, 6.0644], tags: ['triángulo', 'f-16'] },
  { id: 'tehran-1976', title: 'Incidente de Teherán', date: '1976-09-19', location: 'Teherán, Irán', country: 'Irán', type: 'radar', credibility: 'A', description: 'Dos F-4 Phantom interceptaron un objeto. Los sistemas fallaron.', coordinates: [35.6892, 51.3890], tags: ['militar'] },
  { id: 'varginha-1996', title: 'Incidente de Varginha', date: '1996-01-20', location: 'Varginha, Brasil', country: 'Brasil', type: 'contacto', credibility: 'B', description: 'Decenas de testigos reportaron la captura de criaturas.', coordinates: [-21.4945, -45.4328], tags: ['criaturas'] },
  { id: 'penas-1976', title: 'Paso de Peñas', date: '1976-11-03', location: 'Valencia, España', country: 'España', type: 'fotografico', credibility: 'B', description: 'Uno de los casos más documentados de España.', coordinates: [39.4699, -0.3763], tags: ['españa'] },
  { id: 'trans-española-1971', title: 'Caso TransEspaña', date: '1971-07-12', location: 'Valencia - Madrid', country: 'España', type: 'radar', credibility: 'A', description: 'Objeto detectado por radares de control aéreo español.', coordinates: [40.4168, -3.7038], tags: ['españa', 'radar'] },
  { id: 'chile-2014', title: 'Caso CEFAA Chile', date: '2014-08-18', location: 'Valparaíso, Chile', country: 'Chile', type: 'radar', credibility: 'A', description: 'La DGAC chilena investigó oficialmente múltiples avistamientos.', coordinates: [-33.0458, -71.6250], tags: ['oficial'] },
  { id: 'skinwalker', title: 'Ranch Skinwalker', date: '1994-01-01', location: 'Uintah Basin, Utah', country: 'Estados Unidos', type: 'avistamiento', credibility: 'B', description: 'Investigada por el programa AATIP del Pentágono.', coordinates: [40.2500, -109.8833], tags: ['aatip'] },
  { id: 'gimbal-2015', title: 'Caso Gimbal', date: '2015-01-01', location: 'Costa Este, EE.UU.', country: 'Estados Unidos', type: 'radar', credibility: 'A', description: 'Videos grabados por F/A-18. Desclasificados en 2020.', coordinates: [37.5407, -75.8716], tags: ['pentágono'] },
  { id: 'guadalupe-2004', title: 'Isla Guadalupe', date: '2004-03-01', location: 'Isla Guadalupe, México', country: 'México', type: 'avistamiento', credibility: 'B', description: 'Avistamientos reportados por pescadores.', coordinates: [29.1231, -118.2736], tags: ['pescadores'] },
  { id: 'san-jose-1979', title: 'Caso San José', date: '1979-08-22', location: 'San José, Costa Rica', country: 'Costa Rica', type: 'fotografico', credibility: 'B', description: 'Múltiples testigos y fotografías.', coordinates: [9.9281, -84.0907], tags: ['centroamérica'] },
  { id: 'mapendulo-1995', title: 'Caso Mapendulo', date: '1995-06-09', location: 'Papúa, Indonesia', country: 'Indonesia', type: 'contacto', credibility: 'C', description: 'Caso controvertido de contacto.', coordinates: [-4.2500, 139.4000], tags: ['contacto'] },
];
