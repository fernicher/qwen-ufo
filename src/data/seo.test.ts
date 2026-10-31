import { describe, expect, it } from 'vitest';
import { routeMetas } from './seo';
import { ufoCases } from './cases';
import { investigators } from './investigators';
import { testimonios } from './testimonios';

const SITE = 'https://ejemplo.test';
const metas = routeMetas(SITE);
const paths = metas.map((m) => m.path);

describe('routeMetas', () => {
  it('no repite rutas', () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('cada ruta empieza por barra y lleva título y descripción', () => {
    for (const m of metas) {
      expect(m.path.startsWith('/')).toBe(true);
      expect(m.title.length).toBeGreaterThan(0);
      expect(m.description.length).toBeGreaterThan(0);
    }
  });

  it('da una página a cada caso y a cada investigador', () => {
    for (const c of ufoCases) expect(paths).toContain(`/expedientes/${c.id}`);
    for (const i of investigators) expect(paths).toContain(`/investigadores/${i.id}`);
  });

  it('marca /favoritos como noindex', () => {
    expect(metas.find((m) => m.path === '/favoritos')?.noindex).toBe(true);
  });

  it('sólo publica /testimonios cuando hay relatos', () => {
    expect(paths.includes('/testimonios')).toBe(testimonios.length > 0);
  });

  it('usa el siteUrl recibido en los datos estructurados', () => {
    expect(metas.find((m) => m.path === '/')?.jsonLd).toMatchObject({ url: `${SITE}/` });
    const primerCaso = ufoCases[0];
    expect(metas.find((m) => m.path === `/expedientes/${primerCaso.id}`)?.jsonLd).toMatchObject({
      mainEntityOfPage: `${SITE}/expedientes/${primerCaso.id}`,
    });
  });
});
