import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/**
 * Cualquier URL que no exista caía en una página en blanco. Además de dejar
 * colgado al visitante, los buscadores lo registran como "soft 404".
 */
export default function NotFound() {
  useDocumentTitle('Señal perdida — Página no encontrada');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
      <svg width="200" height="150" viewBox="0 0 200 150" aria-hidden="true" className="mb-8 opacity-90">
        <defs>
          <radialGradient id="nfGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="60" rx="90" ry="50" fill="url(#nfGlow)" />
        <g className="hero-ship">
          <path d="M74,44 A28,22 0 0 1 126,44 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#67e8f9" strokeOpacity="0.7" strokeWidth="1.5" />
          <ellipse cx="100" cy="46" rx="62" ry="12" fill="#0e1729" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="2" />
          <path d="M40,48 Q100,74 160,48 Z" fill="#05070c" />
          <circle cx="70" cy="52" r="3" fill="#22d3ee" className="hero-light" style={{ animationDuration: '1.6s' }} />
          <circle cx="100" cy="55" r="3" fill="#22d3ee" className="hero-light" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
          <circle cx="130" cy="52" r="3" fill="#22d3ee" className="hero-light" style={{ animationDuration: '2.4s', animationDelay: '0.8s' }} />
        </g>
        <polygon points="88,58 112,58 150,140 50,140" fill="url(#nfGlow)" opacity="0.6" />
      </svg>

      <p className="text-xs font-semibold tracking-[0.3em] text-aurora-cyan uppercase mb-4">Error 404</p>
      <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Señal perdida</h1>
      <p className="text-gray-400 max-w-md mb-10">
        Esta dirección no corresponde a ningún expediente del archivo. Puede que el enlace esté mal copiado o que la
        página haya cambiado de sitio.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Volver al inicio
        </Link>
        <Link
          to="/expedientes"
          className="px-6 py-3 bg-white/5 border border-white/10 text-gray-200 font-display font-semibold rounded-xl hover:border-white/25 transition-colors flex items-center gap-2"
        >
          <Compass className="w-4 h-4" /> Ver expedientes
        </Link>
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-600 mt-8">
        <Search className="w-3.5 h-3.5" /> También puedes buscar desde la lupa del menú.
      </p>
    </div>
  );
}
