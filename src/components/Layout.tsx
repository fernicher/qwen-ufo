import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Film, Map, Compass, Book, Menu, X, ChevronDown, Users, Clock, Heart, Radio, MonitorPlay } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

interface NavItem {
  to: string;
  label: string;
  icon: typeof Home;
  color: string;
}

const primaryNavItems: NavItem[] = [
  { to: '/', label: 'Inicio', icon: Home, color: '#22d3ee' },
  { to: '/noticias', label: 'Noticias', icon: Radio, color: '#f472b6' },
  { to: '/catalogo', label: 'Catálogo', icon: Film, color: '#a78bfa' },
  { to: '/mapa', label: 'Mapa', icon: Map, color: '#34d399' },
  { to: '/expedientes', label: 'Expedientes', icon: Compass, color: '#fbbf24' },
  { to: '/canales', label: 'Canales', icon: MonitorPlay, color: '#ef4444' },
  { to: '/biblioteca', label: 'Biblioteca', icon: Book, color: '#fb7185' },
];

const moreNavItems: NavItem[] = [
  { to: '/investigadores', label: 'Investigadores', icon: Users, color: '#60a5fa' },
  { to: '/timeline', label: 'Línea de tiempo', icon: Clock, color: '#38bdf8' },
  { to: '/favoritos', label: 'Favoritos', icon: Heart, color: '#f43f5e' },
];

const allNavItems = [...primaryNavItems, ...moreNavItems];

export default function Layout() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMoreActive = moreNavItems.some((item) => item.to === location.pathname);

  return (
    <div className="min-h-screen bg-aurora-black text-white relative">
      <div className="starfield" aria-hidden="true" />
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-aurora-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-cyan to-blue-600 flex items-center justify-center">
              <span className="text-aurora-black font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline">Aurora</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? '' : 'text-gray-400 hover:text-white'}`}
                  style={isActive ? { color: item.color, backgroundColor: `${item.color}1a` } : undefined}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} /> {item.label}
                </Link>
              );
            })}
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isMoreActive ? 'text-aurora-cyan bg-aurora-cyan/10' : 'text-gray-400 hover:text-white'}`}>
                Más <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full pt-2 w-52">
                  <div className="bg-aurora-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${isActive ? '' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                          style={isActive ? { color: item.color, backgroundColor: `${item.color}1a` } : undefined}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} /> {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden max-w-7xl mx-auto mt-4 pb-2 grid grid-cols-2 gap-2">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all active:scale-95"
                  style={{
                    color: isActive ? item.color : '#e5e7eb',
                    backgroundColor: `${item.color}${isActive ? '2e' : '14'}`,
                    borderColor: `${item.color}${isActive ? '99' : '3d'}`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} /> {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
      <main className="pt-16 relative z-10"><Outlet /></main>
      <footer className="relative z-10 border-t border-white/5 mt-20 py-8 px-4 text-center text-sm text-gray-500">
        © 2026 <span className="text-aurora-cyan">Project Aurora</span> — Archivo Desclasificado
      </footer>
    </div>
  );
}
