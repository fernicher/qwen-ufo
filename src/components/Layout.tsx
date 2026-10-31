import { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Film, Map, Compass, Book, Menu, X, ChevronDown, Users, Clock, Heart, Radio, MonitorPlay, Ruler, Send, Quote } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import FeedbackBox from './FeedbackBox';
import { hayTestimonios } from '../data/testimonios';

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
  { to: '/escala-hynek', label: 'Escala de Hynek', icon: Ruler, color: '#34d399' },
  { to: '/reportar', label: 'Cómo reportar', icon: Send, color: '#34d399' },
  // Sólo aparece cuando hay algún relato publicado, para no enlazar a una página vacía
  ...(hayTestimonios
    ? [{ to: '/testimonios', label: 'Testimonios', icon: Quote, color: '#c4b5fd' }]
    : []),
];

const allNavItems = [...primaryNavItems, ...moreNavItems];

export default function Layout() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const isMoreActive = moreNavItems.some((item) => item.to === location.pathname);

  /** Al cambiar de ruta, arriba del todo y con el foco en el contenido, no en el menú. */
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  /** El desplegable se cierra con Escape y al hacer clic fuera; antes sólo respondía al ratón. */
  useEffect(() => {
    if (!moreOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [moreOpen]);

  return (
    <div className="min-h-screen bg-aurora-black text-white relative">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[3000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-aurora-cyan focus:text-aurora-black focus:font-bold focus:text-sm"
      >
        Saltar al contenido
      </a>
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
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? '' : 'text-gray-400 hover:text-white'}`}
                  style={isActive ? { color: item.color, backgroundColor: `${item.color}1a` } : undefined}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} /> {item.label}
                </Link>
              );
            })}
            {/* Abre con clic: el hover abría el menú y el clic inmediato lo cerraba,
                así que con ratón no se podía usar y con teclado, nunca. */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-controls="menu-mas"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isMoreActive ? 'text-aurora-cyan bg-aurora-cyan/10' : 'text-gray-400 hover:text-white'}`}
              >
                Más <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div id="menu-mas" className="absolute right-0 top-full pt-2 w-52">
                  <div className="bg-aurora-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          aria-current={isActive ? 'page' : undefined}
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
              aria-controls="menu-movil"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="menu-movil" className="md:hidden max-w-7xl mx-auto mt-4 pb-2 grid grid-cols-2 gap-2">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
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
      <main id="contenido" ref={mainRef} tabIndex={-1} className="pt-16 relative z-10 focus:outline-none"><Outlet /></main>
      <footer className="relative z-10 border-t border-white/5 mt-20 py-10 px-4 text-center text-sm text-gray-500">
        <div className="mb-6"><FeedbackBox /></div>
        © 2026 <span className="text-aurora-cyan">Project Aurora</span> — Archivo Desclasificado
      </footer>
    </div>
  );
}
