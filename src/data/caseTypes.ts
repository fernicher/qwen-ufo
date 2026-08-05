import type { CaseType } from './cases';

export interface CaseTypeInfo {
  label: string;
  /** Etiqueta más descriptiva para el detalle del expediente. */
  longLabel: string;
  color: string;
}

/**
 * Color semántico por tipo de caso. Es la paleta que da variedad visual al
 * sitio: se usa en los puntos del mapa, los filtros, las tarjetas y los
 * expedientes, para que cada tipo se reconozca de un vistazo por su color.
 */
export const caseTypeMeta: Record<CaseType, CaseTypeInfo> = {
  avistamiento: { label: 'Avistamiento', longLabel: 'Avistamiento', color: '#22d3ee' }, // cyan
  aterrizaje: { label: 'Aterrizaje', longLabel: 'Aterrizaje', color: '#34d399' }, // verde
  contacto: { label: 'Contacto', longLabel: 'Contacto', color: '#e879f9' }, // fucsia
  radar: { label: 'Radar', longLabel: 'Detección por radar', color: '#fbbf24' }, // ámbar
  fotografico: { label: 'Fotográfico', longLabel: 'Registro fotográfico', color: '#a78bfa' }, // violeta
};
