export const collections = [
  { id: 'pentagono', title: 'Desclasificados por el Pentágono', subtitle: 'Videos y casos confirmados', icon: '🔓', gradient: 'from-cyan-500/20 to-blue-600/20', route: '/catalogo?q=pentagon', featured: true },
  { id: 'encuentros', title: 'Encuentros Cercanos', subtitle: 'Películas que definieron nuestra imaginación', icon: '👽', gradient: 'from-green-500/20 to-emerald-600/20', route: '/catalogo?q=close+encounters', featured: true },
  { id: 'documentales', title: 'Documentales de Investigación', subtitle: 'Periodistas y científicos', icon: '🎬', gradient: 'from-amber-500/20 to-yellow-600/20', route: '/catalogo?q=documentary', featured: true },
  { id: 'abducciones', title: 'Abducciones', subtitle: 'Relatos de contacto forzado', icon: '🛸', gradient: 'from-purple-500/20 to-violet-600/20', route: '/catalogo?q=abduction', featured: false },
  { id: 'area51', title: 'Gobierno y Encubrimiento', subtitle: 'Área 51 y secretos', icon: '🏛️', gradient: 'from-red-500/20 to-orange-600/20', route: '/catalogo?q=area+51', featured: false },
  { id: 'latam', title: 'Fenómeno en Latinoamérica', subtitle: 'De Varginha a México', icon: '🌎', gradient: 'from-teal-500/20 to-cyan-600/20', route: '/mapa', featured: false },
];

export const featuredCollections = collections.filter((c) => c.featured);