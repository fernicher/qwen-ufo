import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ufoCases } from '../data/cases';
import { timelineEvents } from '../data/timeline';

// Deterministic pseudo-random generator so the starfield is stable across renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1977);
const GLOW_STAR_INDICES = new Set([6, 21, 38]);
const STARS = Array.from({ length: 55 }).map((_, i) => {
  const minOpacity = rand() * 0.3 + 0.1;
  const maxOpacity = Math.min(minOpacity + rand() * 0.5 + 0.2, 1);
  const glow = GLOW_STAR_INDICES.has(i);
  return {
    x: rand() * 1440,
    y: rand() * 600,
    r: (rand() * 1.1 + 0.5) * (glow ? 1.8 : 1),
    minOpacity,
    maxOpacity,
    duration: 3 + rand() * 5,
    delay: rand() * 5,
    glow,
  };
});

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
      {/* Night sky scene, fully SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <radialGradient id="heroUfoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroBeam" cx="50%" cy="0%" r="95%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroDome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
          <filter id="heroSoftBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="heroStarGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="1440" height="900" fill="url(#heroSky)" />

        {/* Starfield */}
        {STARS.map((s, i) => (
          <g key={i}>
            {s.glow && (
              <circle cx={s.x} cy={s.y} r={s.r * 4} fill="#22d3ee" opacity="0.35" filter="url(#heroStarGlow)" />
            )}
            <circle
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill={s.glow ? '#67e8f9' : '#ffffff'}
              className="hero-star"
              style={
                {
                  animationDuration: `${s.duration}s`,
                  animationDelay: `${s.delay}s`,
                  '--star-min': s.minOpacity,
                  '--star-max': s.maxOpacity,
                } as React.CSSProperties
              }
            />
          </g>
        ))}

        {/* Light beam spotlight, from the ship down to the horizon */}
        <polygon
          points="700,163 740,163 950,650 490,650"
          fill="url(#heroBeam)"
          filter="url(#heroSoftBlur)"
          className="hero-beam"
        />

        {/* UFO */}
        <g className="hero-ufo-float">
          <ellipse cx="720" cy="140" rx="165" ry="80" fill="url(#heroUfoGlow)" filter="url(#heroSoftBlur)" />
          <path d="M672,138 Q720,80 768,138 Z" fill="url(#heroDome)" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.5" />
          <ellipse cx="720" cy="140" rx="115" ry="24" fill="#121216" stroke="#06b6d4" strokeWidth="2.5" />
          <ellipse cx="720" cy="133" rx="70" ry="8" fill="#1e293b" opacity="0.6" />
          <circle cx="672" cy="152" r="5" fill="#22d3ee" className="hero-light" style={{ animationDuration: '1.8s', animationDelay: '0s' }} />
          <circle cx="720" cy="156" r="5" fill="#22d3ee" className="hero-light" style={{ animationDuration: '2.1s', animationDelay: '0.4s' }} />
          <circle cx="768" cy="152" r="5" fill="#22d3ee" className="hero-light" style={{ animationDuration: '2.4s', animationDelay: '0.8s' }} />
        </g>

        {/* Sierra horizon, two layers for depth */}
        <path
          d="M0,680 C120,632 260,700 400,660 C560,615 680,690 840,650 C980,615 1120,680 1260,645 C1340,625 1400,650 1440,660 L1440,900 L0,900 Z"
          fill="#111827"
        />
        <path
          d="M0,760 C160,702 320,782 480,732 C640,686 800,760 960,716 C1100,676 1260,740 1440,720 L1440,900 L0,900 Z"
          fill="#0a0a0c"
        />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-36 sm:pt-20 md:pt-0">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">
          <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" /> Archivo Desclasificado
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          La verdad está <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-blue-500">más cerca que nunca</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">La plataforma multimedia definitiva en español dedicada al fenómeno OVNI/UAP.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/catalogo" className="px-8 py-4 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
            Explorar Archivo <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/mapa" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-display font-bold rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
            <Play className="w-4 h-4" /> Mapa Global
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
