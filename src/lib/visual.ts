// Helpers para dar un color/monograma determinista a canales y podcasts,
// en línea con el sistema de color del sitio.
export const palette = ['#22d3ee', '#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#60a5fa', '#fb7185', '#38bdf8'];

export const colorFor = (seed: string) => palette[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length];

export const monogram = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ ]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
