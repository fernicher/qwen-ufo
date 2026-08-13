import type { RouteMeta } from '../src/data/seo';

/**
 * Escribe una imagen de vista previa por ruta en `<outDir>/og/` y devuelve
 * el mapa `{ '/ruta': '/og/slug.png' }`.
 */
export function generarPortadas(metas: RouteMeta[], outDir: string): Promise<Record<string, string>>;
