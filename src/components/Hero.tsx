import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ufoCases } from '../data/cases';
import { timelineEvents } from '../data/timeline';

export default function Hero() {
  const countryCount = new Set(ufoCases.map((c) => c.country)).size;
  const years = timelineEvents.map((e) => e.year);
  const yearSpan = Math.max(...years) - Math.min(...years);

  const stats = [
    { label: 'Expedientes documentados', value: `${ufoCases.length}+` },
    { label: 'Países con casos', value: `${countryCount}` },
    { label: 'Años de archivo', value: `${yearSpan}` },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aurora-deepBlue/60 via-aurora-black to-aurora-black" />
      {/* Nebula blobs */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-aurora-cyan/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 -right-24 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aurora-cyan/5 rounded-full blur-[120px]" />
      {/* Radar sweep */}
      <div className="hero-radar" aria-hidden="true">
        <div className="hero-radar-ring" style={{ width: 320, height: 320 }} />
        <div className="hero-radar-ring" style={{ width: 560, height: 560 }} />
        <div className="hero-radar-ring" style={{ width: 800, height: 800 }} />
        <div className="hero-radar-sweep" />
      </div>
      {/* Perspective grid floor */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">
          <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" /> Archivo Desclasificado
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          La verdad está <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-blue-500">más cerca que nunca</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">La plataforma multimedia definitiva en español dedicada al fenómeno OVNI/UAP.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/catalogo" className="px-8 py-4 bg-aurora-cyan text-aurora-black font-display font-bold rounded-xl hover:bg-aurora-cyanGlow transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3">
            Explorar Archivo <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/mapa" className="px-8 py-4 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50 flex items-center gap-3">
            <Play className="w-4 h-4 text-aurora-cyan" /> Mapa Global
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-aurora-cyan">{s.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}