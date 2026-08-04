// Centroides aproximados por código ISO-3166 alpha-2, para ubicar burbujas en el mapa
// de visitantes. Cubre los países más frecuentes; los que falten simplemente no se
// dibujan en el mapa (pero siguen contando en la lista).
export const countryCentroids: Record<string, [number, number]> = {
  // Latinoamérica + España
  AR: [-34.0, -64.0], MX: [23.6, -102.5], ES: [40.4, -3.7], CL: [-35.7, -71.5],
  CO: [4.6, -74.3], PE: [-9.2, -75.0], VE: [6.4, -66.6], EC: [-1.8, -78.2],
  BO: [-16.3, -63.6], PY: [-23.4, -58.4], UY: [-32.5, -55.8], GT: [15.8, -90.2],
  CU: [21.5, -77.8], DO: [18.7, -70.2], HN: [15.2, -86.2], SV: [13.8, -88.9],
  NI: [12.9, -85.2], CR: [9.7, -83.8], PA: [8.5, -80.8], PR: [18.2, -66.6],
  // Norteamérica + Brasil
  US: [39.8, -98.6], CA: [56.1, -106.3], BR: [-14.2, -51.9],
  // Europa
  GB: [55.4, -3.4], FR: [46.2, 2.2], DE: [51.2, 10.4], IT: [41.9, 12.6],
  PT: [39.4, -8.2], NL: [52.1, 5.3], BE: [50.5, 4.5], CH: [46.8, 8.2],
  AT: [47.5, 14.6], SE: [60.1, 18.6], NO: [60.5, 8.5], DK: [56.3, 9.5],
  FI: [61.9, 25.7], PL: [51.9, 19.1], IE: [53.4, -8.2], RO: [45.9, 24.9],
  GR: [39.1, 21.8], CZ: [49.8, 15.5], HU: [47.2, 19.5], UA: [48.4, 31.2],
  RU: [61.5, 105.3],
  // Asia-Pacífico
  AU: [-25.3, 133.8], NZ: [-41.8, 171.8], JP: [36.2, 138.3], CN: [35.9, 104.2],
  IN: [20.6, 79.0], KR: [35.9, 127.8], ID: [-0.8, 113.9], PH: [12.9, 121.8],
  TH: [15.9, 100.9], VN: [14.1, 108.3], MY: [4.2, 101.9], SG: [1.35, 103.8],
  // África / Medio Oriente
  ZA: [-30.6, 22.9], EG: [26.8, 30.8], MA: [31.8, -7.1], NG: [9.1, 8.7],
  KE: [-0.02, 37.9], IL: [31.0, 34.8], TR: [39.0, 35.2], SA: [23.9, 45.1],
  AE: [23.4, 53.8],
};
