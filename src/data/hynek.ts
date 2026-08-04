import type { HynekScale } from './cases';

export interface HynekInfo {
  /** Etiqueta corta para chips y badges. */
  label: string;
  /** Nombre completo del nivel. */
  name: string;
  /** Descripción breve para la leyenda. */
  description: string;
  /** Color identificatorio del nivel. */
  color: string;
}

export const HYNEK_ORDER: HynekScale[] = ['CE1', 'CE2', 'CE3', 'CE4', 'CE5', 'intraterrena'];

export const hynekMeta: Record<HynekScale, HynekInfo> = {
  CE1: {
    label: 'CE1',
    name: 'Encuentro cercano del 1er tipo',
    description: 'Avistamiento a corta distancia, sin interacción física.',
    color: '#38bdf8',
  },
  CE2: {
    label: 'CE2',
    name: 'Encuentro cercano del 2º tipo',
    description: 'Deja efectos físicos: marcas en el suelo, quemaduras, fallas eléctricas o efectos en animales.',
    color: '#34d399',
  },
  CE3: {
    label: 'CE3',
    name: 'Encuentro cercano del 3er tipo',
    description: 'Se observan ocupantes o seres.',
    color: '#fbbf24',
  },
  CE4: {
    label: 'CE4',
    name: 'Encuentro cercano del 4º tipo',
    description: 'Abducción (categoría agregada por Vallée/Hynek).',
    color: '#f472b6',
  },
  CE5: {
    label: 'CE5',
    name: 'Encuentro cercano del 5º tipo',
    description: 'Contacto bidireccional iniciado por el humano (protocolo CE-5 de Greer).',
    color: '#a78bfa',
  },
  intraterrena: {
    label: 'Intraterrena',
    name: 'Ciudad intraterrena',
    description: 'Ciudades intraterrenas o esotéricas (Erks, Iberah, Telos…). Categoría propia del sitio; leyenda.',
    color: '#c084fc',
  },
};
