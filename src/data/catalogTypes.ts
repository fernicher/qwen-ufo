import { Film, Tv, Radio } from 'lucide-react';
import type { CatalogType } from './catalog';

export interface CatalogTypeInfo {
  label: string;
  icon: typeof Film;
  accent: string;
  /** Degradado del marcador de posición cuando no hay carátula. */
  grad: string;
}

/**
 * Etiqueta, icono y color por tipo de título. Vive aparte del componente porque
 * lo usan tanto las tarjetas del catálogo como la referencia cruzada del
 * expediente, y así las dos muestran lo mismo.
 */
export const catalogTypeMeta: Record<CatalogType, CatalogTypeInfo> = {
  pelicula: { label: 'Película', icon: Film, accent: '#22d3ee', grad: 'from-cyan-500/20 to-blue-600/10' },
  serie: { label: 'Serie', icon: Tv, accent: '#c084fc', grad: 'from-purple-500/20 to-fuchsia-600/10' },
  documental: { label: 'Documental', icon: Radio, accent: '#fbbf24', grad: 'from-amber-500/20 to-orange-600/10' },
};
