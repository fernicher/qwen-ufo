import { Outlet, Link, useLocation } from 'react-router-dom';
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
                <Link key={item.to} to={item.to} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-aurora-cyan bg-aurora-cyan/10' : 'text-gray-400 hover:text-white'}`}>
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
}