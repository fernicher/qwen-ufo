import { writeFileSync, mkdirSync, existsSync } from 'fs';

const write = (path, content) => {
  const dir = path.split('/').slice(0, -1).join('/');
  if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(path, content, 'utf-8');
  console.log(`✅ ${path}`);
};

// ═══════════════════════════════════════════════════════
// ARCHIVOS DE CONFIGURACIÓN
// ═══════════════════════════════════════════════════════

write('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aurora: {
          black: '#0a0a0c',
          charcoal: '#121216',
          deepBlue: '#0f172a',
          cyan: '#06b6d4',
          cyanGlow: '#22d3ee',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`);

write('src/index.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

body { background: #0a0a0c; color: white; font-family: 'Inter', sans-serif; }
.leaflet-container { background: #0a0a0c !important; }
.leaflet-popup-content-wrapper, .leaflet-popup-tip { background: transparent !important; box-shadow: none !important; padding: 0 !important; }
.leaflet-popup-content { margin: 0 !important; width: auto !important; }
.leaflet-popup-close-button { display: none !important; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { scrollbar-width: none; }
`);

write('.env.example', `VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_IMAGE_BACKDROP_URL=https://image.tmdb.org/t/p/original`);

write('.env', `VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_IMAGE_BACKDROP_URL=https://image.tmdb.org/t/p/original`);

write('index.html', `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project Aurora — Archivo Desclasificado UAP</title>
    <meta name="description" content="La plataforma multimedia definitiva en español sobre el fenómeno OVNI/UAP." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

// ═══════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════

write('src/types/tmdb.ts', `export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
}

export interface TMDBMediaDetail extends TMDBMedia {
  runtime?: number;
  genres: { id: number; name: string }[];
  credits: { cast: { id: number; name: string; character: string; profile_path: string | null }[]; crew: { id: number; name: string; job: string }[] };
  videos: { results: { key: string; site: string; type: string }[] };
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
}`);

write('src/types/case.ts', `export type CaseType = 'avistamiento' | 'aterrizaje' | 'contacto' | 'radar' | 'fotografico';
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
}`);

// ═══════════════════════════════════════════════════════
// STORE Y SERVICIOS
// ═══════════════════════════════════════════════════════

write('src/store/useStore.ts', `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MediaItem { id: string; title: string; type: string; poster?: string; }

export const useAuroraStore = create<any>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (item: MediaItem) => set((state: any) => {
        const isFav = state.favorites.some((f: any) => f.id === item.id);
        return { favorites: isFav ? state.favorites.filter((f: any) => f.id !== item.id) : [...state.favorites, item] };
      }),
    }),
    { name: 'aurora-storage' }
  )
);`);

write('src/services/tmdb.ts', `const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const tmdbService = {
  searchMedia: async (query: string, page = 1) => {
    const res = await fetch(\`\${BASE_URL}/search/multi?query=\${encodeURIComponent(query)}&page=\${page}&include_adult=false&language=es-ES&api_key=\${API_KEY}\`);
    if (!res.ok) throw new Error('Error TMDB');
    return res.json();
  },
  getMediaDetails: async (id: number, type: 'movie' | 'tv') => {
    const res = await fetch(\`\${BASE_URL}/\${type}/\${id}?language=es-ES&append_to_response=credits,videos&api_key=\${API_KEY}\`);
    if (!res.ok) throw new Error('Error TMDB');
    return res.json();
  },
};`);

write('src/hooks/useTMDB.ts', `import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';

export const useSearchMedia = (query: string, page = 1) => useQuery({
  queryKey: ['search', query, page],
  queryFn: () => tmdbService.searchMedia(query, page),
  enabled: query.length >= 3,
  staleTime: 1000 * 60 * 5,
});

export const useMediaDetails = (id: number, type: 'movie' | 'tv') => useQuery({
  queryKey: ['mediaDetail', id, type],
  queryFn: () => tmdbService.getMediaDetails(id, type),
  staleTime: 1000 * 60 * 60,
});`);

// ═══════════════════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════════════════

write('src/data/cases.ts', `import { UFOCase } from '../types/case';

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
];`);

write('src/data/collections.ts', `export const collections = [
  { id: 'pentagono', title: 'Desclasificados por el Pentágono', subtitle: 'Videos y casos confirmados', icon: '🔓', gradient: 'from-cyan-500/20 to-blue-600/20', route: '/catalogo?q=pentagon', featured: true },
  { id: 'encuentros', title: 'Encuentros Cercanos', subtitle: 'Películas que definieron nuestra imaginación', icon: '👽', gradient: 'from-green-500/20 to-emerald-600/20', route: '/catalogo?q=close+encounters', featured: true },
  { id: 'documentales', title: 'Documentales de Investigación', subtitle: 'Periodistas y científicos', icon: '🎬', gradient: 'from-amber-500/20 to-yellow-600/20', route: '/catalogo?q=documentary', featured: true },
  { id: 'abducciones', title: 'Abducciones', subtitle: 'Relatos de contacto forzado', icon: '🛸', gradient: 'from-purple-500/20 to-violet-600/20', route: '/catalogo?q=abduction', featured: false },
  { id: 'area51', title: 'Gobierno y Encubrimiento', subtitle: 'Área 51 y secretos', icon: '🏛️', gradient: 'from-red-500/20 to-orange-600/20', route: '/catalogo?q=area+51', featured: false },
  { id: 'latam', title: 'Fenómeno en Latinoamérica', subtitle: 'De Varginha a México', icon: '🌎', gradient: 'from-teal-500/20 to-cyan-600/20', route: '/mapa', featured: false },
];

export const featuredCollections = collections.filter((c) => c.featured);`);

write('src/data/investigators.ts', `export const investigators = [
  { id: 'hynek', name: 'J. Allen Hynek', country: 'Estados Unidos', specialty: 'Clasificación de encuentros', bio: 'Astrónomo y consultor del Proyecto Blue Book. Creó la escala de Encuentros Cercanos.', works: ['The UFO Experience (1972)'], credibility: 'histórico' },
  { id: 'vallee', name: 'Jacques Vallée', country: 'Francia / EE.UU.', specialty: 'Teoría interdimensional', bio: 'Informático y astrofísico. Inspiración para Lacombe en "Encuentros Cercanos".', works: ['Passport to Magonia (1969)'], credibility: 'referente' },
  { id: 'ribas', name: 'Antonio Ribas', country: 'España', specialty: 'Ufología española', bio: 'Pionero de la ufología en España.', works: ['OVNI: El peligro nuclear (1979)'], credibility: 'histórico' },
  { id: 'kean', name: 'Leslie Kean', country: 'Estados Unidos', specialty: 'Periodismo UAP', bio: 'Destapó el programa AATIP del Pentágono en The New York Times.', works: ['UFOs: Generals, Pilots... (2010)'], credibility: 'activo' },
  { id: 'clemente', name: 'Carlos Clemente', country: 'España', specialty: 'Archivo histórico', bio: 'Especializado en expedientes del Ejército del Aire español.', works: ['Expedientes OVNI del Ejército del Aire'], credibility: 'activo' },
];`);

write('src/data/timeline.ts', `export const timelineEvents = [
  { year: 1947, title: 'Incidente de Roswell', description: 'El ejército anuncia la recuperación de un "disco volante".', category: 'caso', caseId: 'roswell-1947' },
  { year: 1966, title: 'Proyecto Blue Book cerrado', description: 'La USAF cierra su programa oficial.', category: 'desclasificacion' },
  { year: 1976, title: 'Incidente de Teherán', description: 'Dos F-4 Phantom interceptan un OVNI.', category: 'caso', caseId: 'tehran-1976' },
  { year: 1977, title: 'Encuentros Cercanos del Tercer Tipo', description: 'Spielberg estrena la película.', category: 'cultura' },
  { year: 1980, title: 'Bosque de Rendlesham', description: 'Militares reportan nave triangular.', category: 'caso', caseId: 'rendlesham-1980' },
  { year: 1989, title: 'Oleada Belga', description: 'Más de 13,000 testigos.', category: 'caso', caseId: 'belgica-1989' },
  { year: 1997, title: 'Luces de Phoenix', description: 'Miles observan formación en V.', category: 'caso', caseId: 'phoenix-1997' },
  { year: 2004, title: 'USS Nimitz', description: 'Cmdr. Fravor intercepta objeto Tic Tac.', category: 'caso', caseId: 'tic-tac-2004' },
  { year: 2017, title: 'NY Times destapa AATIP', description: 'Leslie Kean revela programa secreto.', category: 'desclasificacion' },
  { year: 2020, title: 'Pentágono confirma videos', description: 'Se desclasifican FLIR1, Gimbal y GoFast.', category: 'desclasificacion' },
  { year: 2023, title: 'Audiencia de David Grusch', description: 'Testifica sobre "programas de recuperación".', category: 'hito' },
];`);

write('src/data/books.ts', `export const books = [
  { id: 'ufo-experience', title: 'The UFO Experience', authors: ['J. Allen Hynek'], year: 1972, language: 'en', description: 'La obra fundamental que cambió la ufología.', category: 'clásico', rating: 9.5, essential: true, relatedCases: ['roswell-1947'] },
  { id: 'passport-magonia', title: 'Passport to Magonia', authors: ['Jacques Vallée'], year: 1969, language: 'en', description: 'Conecta OVNIs con leyendas folklóricas.', category: 'investigacion', rating: 9.0, essential: true, relatedCases: [] },
  { id: 'dimensions', title: 'Dimensions', authors: ['Jacques Vallée'], year: 1988, language: 'en', description: 'Casos documentados de contacto.', category: 'investigacion', rating: 8.5, essential: true, relatedCases: [] },
  { id: 'ufo-generals', title: 'UFOs: Generals, Pilots...', authors: ['Leslie Kean'], year: 2010, language: 'en', description: 'Testimonios de militares y funcionarios.', category: 'investigacion', rating: 9.0, essential: true, relatedCases: ['tic-tac-2004'] },
  { id: 'ovni-peligro', title: 'OVNI: El peligro nuclear', authors: ['Antonio Ribas'], year: 1979, language: 'es', description: 'OVNIs en instalaciones nucleares.', category: 'investigacion', rating: 8.5, essential: true, relatedCases: [] },
];`);

write('src/data/podcasts.ts', `export const podcasts = [
  { id: 'phenomena', title: 'Phenomena with Annie Jacobsen', host: 'Annie Jacobsen', description: 'Explora los límites de la ciencia.', language: 'en', frequency: 'semanal', episodes: 150, essential: true, rating: 9.0, platforms: [{ name: 'Spotify', url: 'https://open.spotify.com' }] },
  { id: 'ufology', title: 'Ufology', host: 'Aaron Gilmour', description: 'Casos históricos con rigor periodístico.', language: 'en', frequency: 'semanal', episodes: 300, essential: true, rating: 9.0, platforms: [{ name: 'Spotify', url: 'https://open.spotify.com' }] },
  { id: 'ovni-24h', title: 'OVNI 24h', host: 'Carlos Jiménez', description: 'El podcast de referencia en español.', language: 'es', frequency: 'semanal', episodes: 450, essential: true, rating: 8.5, platforms: [{ name: 'Spotify', url: 'https://open.spotify.com' }, { name: 'iVoox', url: 'https://www.ivoox.com' }] },
  { id: 'mysterium', title: 'Mysterium', host: 'Miguel Blanco', description: 'Misterio y fenómeno OVNI.', language: 'es', frequency: 'semanal', episodes: 380, essential: true, rating: 8.0, platforms: [{ name: 'Spotify', url: 'https://open.spotify.com' }] },
];`);

// ═══════════════════════════════════════════════════════
// COMPONENTES
// ═══════════════════════════════════════════════════════

write('src/components/Layout.tsx', `import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Film, Map, Compass, Book } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/catalogo', label: 'Catálogo', icon: Film },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/expedientes', label: 'Expedientes', icon: Compass },
  { to: '/biblioteca', label: 'Biblioteca', icon: Book },
];

export default function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-aurora-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-aurora-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-cyan to-blue-600 flex items-center justify-center">
              <span className="text-aurora-black font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline">Aurora</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors \${isActive ? 'text-aurora-cyan bg-aurora-cyan/10' : 'text-gray-400 hover:text-white'}\`}>
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </div>
          <GlobalSearch />
        </div>
      </nav>
      <main className="pt-16"><Outlet /></main>
      <footer className="border-t border-white/5 mt-20 py-8 px-4 text-center text-sm text-gray-500">
        © 2026 <span className="text-aurora-cyan">Project Aurora</span> — Archivo Desclasificado
      </footer>
    </div>
  );
}`);

write('src/components/GlobalSearch.tsx', `import { useState, useEffect, useRef } from 'react';
import { Search, X, Film, MapPin, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearchMedia } from '../hooks/useTMDB';
import { ufoCases } from '../data/cases';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(p => !p); }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => { if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100); if (!isOpen) setQuery(''); }, [isOpen]);

  const { data: tmdbData } = useSearchMedia(query);
  const results: any[] = [];
  if (query.length >= 2) {
    const q = query.toLowerCase();
    ufoCases.filter(c => c.title.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 5).forEach(c => results.push({ type: 'case', id: c.id, title: c.title, subtitle: \`\${c.date.split('-')[0]} • \${c.country}\`, caseId: c.id }));
  }
  if (tmdbData?.results) tmdbData.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv').slice(0, 8).forEach(m => results.push({ type: 'media', id: m.id, title: m.title || m.name, subtitle: m.media_type === 'movie' ? 'Película' : 'Serie' }));

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 px-4 py-2 bg-aurora-charcoal border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 hidden sm:inline">Buscar...</span>
        <span className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500"><Command className="w-3 h-3" />K</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15%]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl bg-aurora-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-aurora-cyan" />
              <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar películas, casos..." className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none" />
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-md"><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">{query.length === 0 ? 'Empieza a escribir' : \`Sin resultados para "\${query}"\`}</div>
              ) : results.map((r) => (
                <button key={r.id} onClick={() => { setIsOpen(false); navigate(r.caseId ? \`/mapa?case=\${r.caseId}\` : '/catalogo'); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left">
                  <div className="w-9 h-9 rounded-lg bg-aurora-cyan/10 flex items-center justify-center">
                    {r.caseId ? <MapPin className="w-4 h-4 text-aurora-cyan" /> : <Film className="w-4 h-4 text-aurora-cyan" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.title}</p>
                    <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}`);

write('src/components/Hero.tsx', `import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aurora-deepBlue/50 via-aurora-black to-aurora-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aurora-cyan/5 rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">
          <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" /> Archivo Desclasificado
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          La verdad está <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-blue-500">más cerca que nunca</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">La plataforma multimedia definitiva en español dedicada al fenómeno OVNI/UAP.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/catalogo" className="px-8 py-4 bg-aurora-cyan text-aurora-black font-display font-bold rounded-xl hover:bg-aurora-cyanGlow transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3">
            Explorar Archivo <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/mapa" className="px-8 py-4 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50 flex items-center gap-3">
            <Play className="w-4 h-4 text-aurora-cyan" /> Mapa Global
          </Link>
        </div>
      </div>
    </div>
  );
}`);

write('src/components/MediaCard.tsx', `import { Star } from 'lucide-react';
import { TMDBMedia } from '../types/tmdb';

export default function MediaCard({ media, onClick }: { media: TMDBMedia; onClick: () => void }) {
  const title = media.title || media.name;
  const year = media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0] || 'N/A';
  const imageUrl = media.poster_path ? \`\${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}\${media.poster_path}\` : '';

  return (
    <div onClick={onClick} className="group relative cursor-pointer rounded-xl overflow-hidden bg-aurora-charcoal border border-white/5 hover:border-aurora-cyan/50 transition-all">
      <div className="relative aspect-[2/3] overflow-hidden">
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />}
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-transparent to-transparent opacity-80" />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md border border-aurora-cyan/30">
          <Star className="w-3 h-3 text-aurora-cyan fill-aurora-cyan" />
          <span className="text-xs font-bold text-white">{media.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-display font-semibold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-aurora-cyan">{title}</h3>
        <p className="text-xs text-gray-400">{year} • {media.media_type === 'movie' ? 'Película' : 'Serie'}</p>
      </div>
    </div>
  );
}`);

write('src/components/MediaDetailModal.tsx', `import { X, Star, Calendar, Play, Heart } from 'lucide-react';
import { useMediaDetails } from '../hooks/useTMDB';
import { useAuroraStore } from '../store/useStore';

export default function MediaDetailModal({ mediaId, mediaType, onClose }: { mediaId: number; mediaType: 'movie' | 'tv'; onClose: () => void }) {
  const { data: media, isLoading } = useMediaDetails(mediaId, mediaType);
  const { favorites, toggleFavorite } = useAuroraStore();
  const isFavorite = favorites.some((f: any) => f.id === String(mediaId));
  const trailer = media?.videos?.results?.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-aurora-charcoal rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
        {isLoading ? (
          <div className="flex items-center justify-center h-96"><div className="w-10 h-10 border-4 border-aurora-cyan border-t-transparent rounded-full animate-spin" /></div>
        ) : media ? (
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="relative h-64 md:h-96">
              {media.backdrop_path && <img src={\`\${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_URL}\${media.backdrop_path}\`} alt="" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-aurora-charcoal via-aurora-charcoal/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{media.title || media.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-aurora-cyan" />{media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0]}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-aurora-cyan fill-aurora-cyan" />{media.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                {media.poster_path && <img src={\`\${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}\${media.poster_path}\`} alt="" className="w-full rounded-xl" />}
                <button onClick={() => toggleFavorite({ id: String(media.id), title: media.title || media.name || '', type: mediaType })} className={\`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold \${isFavorite ? 'bg-aurora-cyan text-aurora-black' : 'bg-white/5 text-white hover:bg-white/10'}\`}>
                  <Heart className={\`w-5 h-5 \${isFavorite ? 'fill-aurora-black' : ''}\`} /> {isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
                </button>
              </div>
              <div className="md:col-span-2 space-y-8">
                <div className="flex flex-wrap gap-2">
                  {media.genres?.map((g: any) => <span key={g.id} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full">{g.name}</span>)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">Sinopsis</h3>
                  <p className="text-gray-300 leading-relaxed">{media.overview || 'Sin sinopsis disponible.'}</p>
                </div>
                {trailer && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-aurora-cyan" />Trailer</h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <iframe src={\`https://www.youtube.com/embed/\${trailer.key}\`} title="Trailer" className="absolute inset-0 w-full h-full" allowFullScreen />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : <div className="flex items-center justify-center h-96 text-gray-400">Error al cargar</div>}
      </div>
    </div>
  );
}`);

write('src/components/CollectionCarousel.tsx', `import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectionCarousel({ collections, title }: { collections: any[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
  };
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{title}</h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll('right')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {collections.map((c) => (
            <Link key={c.id} to={c.route} className="group relative block h-44 rounded-2xl overflow-hidden border border-white/5 hover:border-aurora-cyan/40 flex-shrink-0 w-72 md:w-80">
              <div className={\`absolute inset-0 bg-gradient-to-br \${c.gradient} opacity-60 group-hover:opacity-100 transition-opacity\`} />
              <div className="absolute inset-0 bg-aurora-charcoal/60 group-hover:bg-aurora-charcoal/40" />
              <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-3 block">{c.icon}</span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-aurora-cyan">{c.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{c.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-aurora-cyan opacity-0 group-hover:opacity-100 transition-opacity">Explorar <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}`);

write('src/components/TimelinePreview.tsx', `import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../data/timeline';

const colors: any = {
  hito: { dot: 'bg-amber-400', badge: 'text-amber-400 border-amber-400/40' },
  caso: { dot: 'bg-cyan-400', badge: 'text-cyan-400 border-cyan-400/40' },
  desclasificacion: { dot: 'bg-green-400', badge: 'text-green-400 border-green-400/40' },
  cultura: { dot: 'bg-purple-400', badge: 'text-purple-400 border-purple-400/40' },
};

export default function TimelinePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' }); };
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Línea Temporal</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">70 Años de Fenómeno</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll('right')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pt-2">
            {timelineEvents.map((event) => {
              const c = colors[event.category];
              return (
                <div key={\`\${event.year}-\${event.title}\`} className="flex-shrink-0 w-56 relative pt-10">
                  <div className={\`absolute top-6 left-4 w-4 h-4 rounded-full \${c.dot} border-2 border-aurora-black\`} />
                  <div className="bg-aurora-charcoal/80 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-display font-bold text-white">{event.year}</span>
                      <span className={\`text-[9px] font-bold px-1.5 py-0.5 rounded border \${c.badge}\`}>{event.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{event.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-3">{event.description}</p>
                    {event.caseId && <Link to={\`/mapa?case=\${event.caseId}\`} className="inline-flex items-center gap-1 mt-3 text-[10px] font-semibold text-aurora-cyan">Ver en mapa <ExternalLink className="w-3 h-3" /></Link>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}`);

write('src/components/InvestigatorsPreview.tsx', `import { Globe, BookOpen, Award } from 'lucide-react';
import { investigators } from '../data/investigators';

const cred: any = {
  referente: { label: 'Referente Mundial', color: 'text-cyan-400 border-cyan-400/40' },
  activo: { label: 'Investigador Activo', color: 'text-green-400 border-green-400/40' },
  histórico: { label: 'Figura Histórica', color: 'text-amber-400 border-amber-400/40' },
};

export default function InvestigatorsPreview() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Mentes Detrás del Fenómeno</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Investigadores Destacados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investigators.map((inv) => {
            const c = cred[inv.credibility];
            return (
              <div key={inv.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-aurora-cyan/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-aurora-cyan/20 to-blue-600/20 border border-aurora-cyan/20 flex items-center justify-center">
                    <span className="text-xl font-display font-bold text-aurora-cyan">{inv.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-aurora-cyan">{inv.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400"><Globe className="w-3 h-3" />{inv.country}</div>
                  </div>
                </div>
                <p className="text-xs text-aurora-cyan/80 font-semibold uppercase tracking-wider mb-2">{inv.specialty}</p>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">{inv.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inv.works.slice(0, 2).map((w) => <span key={w} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 flex items-center gap-1"><BookOpen className="w-2.5 h-2.5" />{w.split('(')[0].trim()}</span>)}
                </div>
                <span className={\`text-[10px] font-bold px-2 py-1 rounded border \${c.color}\`}><Award className="w-3 h-3 inline mr-1" />{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`);

// ═══════════════════════════════════════════════════════
// COMPONENTES DEL MAPA
// ═══════════════════════════════════════════════════════

write('src/components/Map/CaseMarker.tsx', `import { DivIcon } from 'leaflet';
import { UFOCase } from '../../types/case';

const colors: any = { A: '#06b6d4', B: '#3b82f6', C: '#a855f7' };

export const createCaseIcon = (type: UFOCase['type'], credibility: UFOCase['credibility']) => {
  const color = colors[credibility];
  const icons: any = { avistamiento: '◉', aterrizaje: '▼', contacto: '✦', radar: '◈', fotografico: '◐' };
  return new DivIcon({
    className: 'aurora-marker',
    html: \`<div class="relative flex items-center justify-center"><div class="relative w-8 h-8 rounded-full flex items-center justify-center border-2" style="background: \${color}20; border-color: \${color}; box-shadow: 0 0 15px \${color};"><span style="color: \${color}; font-size: 14px; font-weight: bold;">\${icons[type]}</span></div></div>\`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};`);

write('src/components/Map/CasePopup.tsx', `import { Calendar, MapPin, Shield } from 'lucide-react';
import { UFOCase } from '../../types/case';

export default function CasePopup({ caseData }: { caseData: UFOCase }) {
  const cred: any = { A: 'text-cyan-400 border-cyan-400/40', B: 'text-blue-400 border-blue-400/40', C: 'text-purple-400 border-purple-400/40' };
  const credLabel: any = { A: 'Evidencia Alta', B: 'Evidencia Media', C: 'Testimonial' };
  return (
    <div className="w-72 p-1">
      <div className="bg-aurora-charcoal rounded-lg border border-white/10 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-white text-base">{caseData.title}</h3>
          <span className={\`text-[10px] font-bold px-2 py-0.5 rounded border \${cred[caseData.credibility]}\`}>{credLabel[caseData.credibility]}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-aurora-cyan" />{caseData.date.split('-')[0]}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-aurora-cyan" />{caseData.country}</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-aurora-cyan" />{caseData.type}</span>
        </div>
        <p className="text-xs text-gray-300 line-clamp-4">{caseData.description}</p>
      </div>
    </div>
  );
}`);

write('src/components/Map/InteractiveMap.tsx', `import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { UFOCase } from '../../types/case';
import { createCaseIcon } from './CaseMarker';
import CasePopup from './CasePopup';
import 'leaflet/dist/leaflet.css';

function MapController({ selectedCaseId, cases }: { selectedCaseId: string | null; cases: UFOCase[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCaseId) {
      const c = cases.find((x) => x.id === selectedCaseId);
      if (c) map.flyTo(c.coordinates, 6, { duration: 1.5 });
    }
  }, [selectedCaseId, cases, map]);
  return null;
}

export default function InteractiveMap({ cases, selectedCaseId, onSelectCase }: { cases: UFOCase[]; selectedCaseId: string | null; onSelectCase: (id: string) => void }) {
  return (
    <MapContainer center={[30, 0]} zoom={2} minZoom={2} maxZoom={12} className="w-full h-full z-0" zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <MapController selectedCaseId={selectedCaseId} cases={cases} />
      {cases.map((c) => (
        <Marker key={c.id} position={c.coordinates} icon={createCaseIcon(c.type, c.credibility)} eventHandlers={{ click: () => onSelectCase(c.id) }}>
          <Popup closeButton={false}><CasePopup caseData={c} /></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}`);

// ═══════════════════════════════════════════════════════
// PÁGINAS
// ═══════════════════════════════════════════════════════

write('src/pages/Home.tsx', `import Hero from '../components/Hero';
import CollectionCarousel from '../components/CollectionCarousel';
import TimelinePreview from '../components/TimelinePreview';
import InvestigatorsPreview from '../components/InvestigatorsPreview';
import { collections, featuredCollections } from '../data/collections';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Hero />
      <CollectionCarousel collections={featuredCollections} title="Colecciones Destacadas" />
      <CollectionCarousel collections={collections.filter((c) => !c.featured)} title="Explorar por Temática" />
      <TimelinePreview />
      <InvestigatorsPreview />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-aurora-charcoal/60 border border-white/10 rounded-3xl p-10 md:p-16">
            <Shield className="w-12 h-12 text-aurora-cyan mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">El archivo crece cada día</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">Nuevos casos, documentales y avistamientos se añaden continuamente.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/catalogo" className="px-8 py-4 bg-aurora-cyan text-aurora-black font-display font-bold rounded-xl hover:bg-aurora-cyanGlow flex items-center gap-2">Explorar Catálogo <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/mapa" className="px-8 py-4 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50">Ver Mapa Global</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}`);

write('src/pages/Catalogo.tsx', `import { useState } from 'react';
import { useSearchMedia } from '../hooks/useTMDB';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import { Search } from 'lucide-react';

export default function Catalogo() {
  const [query, setQuery] = useState('OVNI');
  const [selected, setSelected] = useState<{ id: number; type: 'movie' | 'tv' } | null>(null);
  const { data, isLoading, isError } = useSearchMedia(query);
  const results = data?.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv') || [];

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Archivo <span className="text-aurora-cyan">Multimedia</span></h1>
          <p className="text-gray-400">Explora la base de datos desclasificada</p>
        </div>
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar títulos..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50" />
        </div>
        {isLoading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin" /></div>}
        {isError && <div className="text-center text-red-400 py-10">Error al acceder a los archivos.</div>}
        {!isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((m) => <MediaCard key={\`\${m.id}-\${m.media_type}\`} media={m} onClick={() => setSelected({ id: m.id, type: m.media_type })} />)}
          </div>
        )}
      </div>
      {selected && <MediaDetailModal mediaId={selected.id} mediaType={selected.type} onClose={() => setSelected(null)} />}
    </div>
  );
}`);

write('src/pages/Mapa.tsx', `import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { List, MapPin } from 'lucide-react';
import InteractiveMap from '../components/Map/InteractiveMap';
import { ufoCases } from '../data/cases';

export default function Mapa() {
  const [searchParams] = useSearchParams();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    const caseId = searchParams.get('case');
    if (caseId) setSelectedCaseId(caseId);
  }, [searchParams]);

  return (
    <div className="relative h-screen w-full bg-aurora-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-b from-aurora-black via-aurora-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-[10px] font-bold tracking-widest text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo Geográfico</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Mapa Global de <span className="text-aurora-cyan">Avistamientos</span></h1>
            <p className="text-sm text-gray-400 mt-1">{ufoCases.length} casos documentados</p>
          </div>
          <button onClick={() => setListOpen(!listOpen)} className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-aurora-charcoal/90 border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-white text-sm font-medium">
            <List className="w-4 h-4 text-aurora-cyan" /> Expedientes
          </button>
        </div>
      </div>
      <InteractiveMap cases={ufoCases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} />
      {listOpen && (
        <div className="absolute top-24 right-4 bottom-4 z-[1000] w-80 bg-aurora-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-display font-semibold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" /> Expedientes</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {ufoCases.map((c) => (
              <Link key={c.id} to={\`/expedientes/\${c.id}\`} className={\`block p-3 rounded-lg mb-1 border \${selectedCaseId === c.id ? 'bg-aurora-cyan/10 border-aurora-cyan/40' : 'border-transparent hover:bg-white/5'}\`}>
                <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{c.date.split('-')[0]} • {c.country}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`);

write('src/pages/Expedientes.tsx', `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MapPin, Calendar, Shield, Search } from 'lucide-react';
import { ufoCases } from '../data/cases';

export default function Expedientes() {
  const [query, setQuery] = useState('');
  const filtered = ufoCases.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()));
  const credColors: any = { A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10', B: 'text-blue-400 border-blue-400/40 bg-blue-400/10', C: 'text-purple-400 border-purple-400/40 bg-purple-400/10' };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo de Casos</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Expedientes <span className="text-aurora-cyan">Desclasificados</span></h1>
          <p className="text-gray-400">Investigaciones detalladas de los casos más significativos</p>
        </div>
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Link key={c.id} to={\`/expedientes/\${c.id}\`} className="group block bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-aurora-cyan/30 transition-all">
              <div className="relative h-40 bg-gradient-to-br from-aurora-deepBlue/40 to-aurora-charcoal">
                <div className="absolute top-4 right-4">
                  <span className={\`text-xs font-bold px-2 py-1 rounded border \${credColors[c.credibility]}\`}><Shield className="w-3 h-3 inline mr-1" />{c.credibility}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20 flex items-center justify-center"><FileText className="w-6 h-6 text-aurora-cyan" /></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-aurora-cyan">{c.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date.split('-')[0]}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.country}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">{c.description}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}`);

write('src/pages/ExpedienteDetail.tsx', `import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Shield, Users } from 'lucide-react';
import { ufoCases } from '../data/cases';

export default function ExpedienteDetail() {
  const { id } = useParams<{ id: string }>();
  const caseData = ufoCases.find(c => c.id === id);

  if (!caseData) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-display font-bold mb-4">Expediente no encontrado</h1><Link to="/expedientes" className="text-aurora-cyan">← Volver</Link></div></div>;

  const credColors: any = { A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10', B: 'text-blue-400 border-blue-400/40 bg-blue-400/10', C: 'text-purple-400 border-purple-400/40 bg-purple-400/10' };

  return (
    <div className="min-h-screen">
      <div className="sticky top-16 z-40 bg-aurora-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/expedientes" className="flex items-center gap-2 text-sm text-gray-400 hover:text-aurora-cyan"><ArrowLeft className="w-4 h-4" /> Volver</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={\`text-xs font-bold px-3 py-1.5 rounded border \${credColors[caseData.credibility]}\`}><Shield className="w-3 h-3 inline mr-1" /> Evidencia {caseData.credibility}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{caseData.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-aurora-cyan" />{new Date(caseData.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" />{caseData.location}, {caseData.country}</span>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">{caseData.description}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-aurora-cyan" /> Análisis del Caso</h2>
              <p className="text-gray-300 leading-relaxed">Este caso representa uno de los eventos más documentados en la historia del fenómeno UAP. La evidencia recopilada incluye múltiples testimonios independientes, datos de radar y documentación oficial.</p>
            </div>
          </div>
          <div>
            <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-display font-bold mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {caseData.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{t}</span>)}
              </div>
            </div>
            <Link to={\`/mapa?case=\${caseData.id}\`} className="block mt-4 w-full bg-aurora-cyan/10 border border-aurora-cyan/30 rounded-xl p-4 text-center hover:bg-aurora-cyan/20">
              <MapPin className="w-5 h-5 text-aurora-cyan mx-auto mb-2" />
              <span className="text-sm font-semibold text-aurora-cyan">Ver en el Mapa Global</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`);

write('src/pages/Biblioteca.tsx', `import { useState } from 'react';
import { Book, Headphones, Search, Star } from 'lucide-react';
import { books } from '../data/books';
import { podcasts } from '../data/podcasts';
import { Link } from 'react-router-dom';

type Tab = 'todos' | 'libros' | 'podcasts' | 'esenciales';

export default function Biblioteca() {
  const [tab, setTab] = useState<Tab>('todos');
  const [query, setQuery] = useState('');

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) && (tab === 'podcasts' ? false : tab === 'esenciales' ? b.essential : true));
  const filteredPodcasts = podcasts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) && (tab === 'libros' ? false : tab === 'esenciales' ? p.essential : true));

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Biblioteca de Conocimiento</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Libros y <span className="text-aurora-cyan">Podcasts</span></h1>
          <p className="text-gray-400">La colección curada sobre el fenómeno OVNI/UAP</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {([
            { id: 'todos', label: 'Todo', icon: Book },
            { id: 'libros', label: 'Libros', icon: Book },
            { id: 'podcasts', label: 'Podcasts', icon: Headphones },
            { id: 'esenciales', label: 'Esenciales', icon: Star },
          ] as const).map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium \${tab === t.id ? 'bg-aurora-cyan text-aurora-black' : 'bg-white/5 text-gray-400 hover:text-white'}\`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50" />
        </div>
        <div className="space-y-12">
          {filteredBooks.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Book className="w-6 h-6 text-aurora-cyan" /> Libros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-aurora-cyan/30 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-white group-hover:text-aurora-cyan">{book.title}</h3>
                      {book.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{book.authors.join(', ')} • {book.year}</p>
                    {book.rating && <div className="flex items-center gap-1 mb-3"><Star className="w-3 h-3 text-aurora-cyan fill-aurora-cyan" /><span className="text-xs font-semibold">{book.rating}/10</span></div>}
                    <p className="text-sm text-gray-300 line-clamp-3">{book.description}</p>
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 uppercase mt-3 inline-block">{book.category}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {filteredPodcasts.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Headphones className="w-6 h-6 text-aurora-cyan" /> Podcasts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPodcasts.map((p) => (
                  <div key={p.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-aurora-cyan/30 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-white group-hover:text-aurora-cyan">{p.title}</h3>
                      {p.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{p.host}</p>
                    {p.rating && <div className="flex items-center gap-1 mb-3"><Star className="w-3 h-3 text-aurora-cyan fill-aurora-cyan" /><span className="text-xs font-semibold">{p.rating}/10</span></div>}
                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">{p.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{p.frequency}</span>
                      {p.episodes && <span>• {p.episodes} episodios</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}`);

// ═══════════════════════════════════════════════════════
// APP Y MAIN
// ═══════════════════════════════════════════════════════

write('src/App.tsx', `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Mapa from './pages/Mapa';
import Expedientes from './pages/Expedientes';
import ExpedienteDetail from './pages/ExpedienteDetail';
import Biblioteca from './pages/Biblioteca';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/expedientes" element={<Expedientes />} />
          <Route path="/expedientes/:id" element={<ExpedienteDetail />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;`);

write('src/main.tsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);`);

console.log('\\n🎉 ¡Project Aurora inicializado correctamente!');
console.log('\\n📋 Próximos pasos:');
console.log('   1. Edita .env con tu API key de TMDB');
console.log('   2. Ejecuta: npm run dev');
console.log('   3. Abre: http://localhost:5173');
console.log('\\n🛸 "La verdad está más cerca que nunca"');