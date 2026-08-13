import type { ReactNode } from 'react';

/**
 * Cabecera ilustrada de sección. Cada página del menú recibe una escena SVG
 * propia en su color de acento, con el mismo lenguaje visual que la portada:
 * silueta, luz de contorno cian y cielo estrellado. Sin imágenes externas.
 */

export type HeroScene =
  | 'catalogo'
  | 'expedientes'
  | 'biblioteca'
  | 'canales'
  | 'investigadores'
  | 'timeline'
  | 'noticias'
  | 'favoritos'
  | 'hynek'
  | 'reportar'
  | 'testimonios';

// Estrellas deterministas para que la banda no parpadee entre renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(4711);
const STARS = Array.from({ length: 46 }).map(() => ({
  x: rand() * 1440,
  y: rand() * 260,
  r: rand() * 0.9 + 0.4,
  min: rand() * 0.2 + 0.06,
  max: rand() * 0.45 + 0.35,
  duration: 3 + rand() * 5,
  delay: rand() * 6,
}));

/** Cinta de película con un platillo en uno de los fotogramas */
function SceneCatalogo({ accent }: { accent: string }) {
  return (
    <g>
      <polygon points="0,262 60,246 1440,206 1440,394 60,338" fill="url(#phBeam)" filter="url(#phBlur)" className="ph-flicker" />
      <g transform="rotate(-1.6 720 300)">
        <g className="ph-drift">
        <rect x="-20" y="256" width="1480" height="88" rx="6" fill="#0e1729" stroke={accent} strokeOpacity="0.7" strokeWidth="1.6" />
        {Array.from({ length: 25 }).map((_, i) => (
          <g key={i}>
            <rect x={-6 + i * 60} y="262" width="15" height="10" rx="2.5" fill={accent} opacity="0.5" />
            <rect x={-6 + i * 60} y="328" width="15" height="10" rx="2.5" fill={accent} opacity="0.5" />
          </g>
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={-4 + i * 172} y="278" width="148" height="44" rx="3" fill="#131d31" stroke={accent} strokeOpacity="0.4" />
        ))}
        <g transform="translate(756,300)">
          <ellipse rx="44" ry="8" fill="#0f172a" stroke={accent} strokeOpacity="0.85" strokeWidth="1.6" />
          <path d="M-18,-2 Q0,-18 18,-2 Z" fill={accent} fillOpacity="0.45" />
            <circle cy="6" r="2.6" fill={accent} className="ph-blip" />
          </g>
        </g>
      </g>
    </g>
  );
}

/** Carpetas apiladas, franjas censuradas y sello de archivo */
function SceneExpedientes({ accent }: { accent: string }) {
  return (
    <g>
      <g transform="translate(486,232) rotate(-6 180 90)">
        <rect x="16" y="18" width="330" height="180" rx="10" fill="#0e1729" stroke={accent} strokeOpacity="0.4" />
      </g>
      <g transform="translate(506,224) rotate(3 180 90)">
        <rect x="8" y="12" width="330" height="180" rx="10" fill="#101a2d" stroke={accent} strokeOpacity="0.5" />
      </g>
      <g transform="translate(520,222)">
        <path d="M0,26 L104,26 L122,4 L318,4 A10,10 0 0 1 328,14 L328,196 L0,196 Z" fill="#131d31" stroke={accent} strokeOpacity="0.75" strokeWidth="1.8" />
        {[54, 84, 114, 144].map((y, i) => (
          <g key={y}>
            <rect x="30" y={y} width={[212, 148, 244, 120][i]} height="11" rx="3" fill="#05070c" />
            <rect x="30" y={y} width={[212, 148, 244, 120][i]} height="11" rx="3" fill={accent} opacity="0.14" />
          </g>
        ))}
      </g>
      <g transform="translate(960,300) rotate(-14)">
        <g className="ph-stamp">
        <circle r="66" fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="4" />
        <circle r="54" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="6 8" />
        <rect x="-50" y="-13" width="100" height="26" fill={accent} opacity="0.14" />
        <text textAnchor="middle" y="7" fill={accent} fillOpacity="0.8" fontSize="18" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="2">ARCHIVO</text>
        </g>
      </g>
      <g transform="translate(300,318)" opacity="0.5">
        <circle r="44" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="3" />
        <path d="M-22,0 L22,0" stroke={accent} strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Lomos de libros con uno iluminado */
function SceneBiblioteca({ accent }: { accent: string }) {
  const spines = [96, 130, 112, 152, 88, 138, 120, 166, 104, 144, 116, 132, 100, 150, 124, 108, 140, 92];
  return (
    <g>
      <ellipse cx={40 + 8 * 82 + 26} cy={366 - 166} rx="110" ry="86" fill={accent} opacity="0.18" filter="url(#phBlur)" className="ph-flicker" />
      <g transform="translate(-20,0)">
        {spines.map((h, i) => (
          <g key={i}>
            <rect x={i * 82} y={366 - h} width="54" height={h} rx="4" fill={i === 8 ? '#16203a' : '#0b1120'} stroke={accent} strokeOpacity={i === 8 ? 0.95 : 0.5} strokeWidth="1.4" />
            <rect x={i * 82 + 11} y={366 - h + 15} width="32" height="4" rx="2" fill={accent} opacity={i === 8 ? 0.8 : 0.38} />
            <rect x={i * 82 + 11} y={366 - h + 27} width="20" height="3" rx="1.5" fill={accent} opacity={i === 8 ? 0.6 : 0.28} />
          </g>
        ))}
      </g>
      <rect x="0" y="366" width="1440" height="34" fill="#05070c" />
    </g>
  );
}

/** Antena parabólica emitiendo y una tarjeta de reproducción */
function SceneCanales({ accent }: { accent: string }) {
  return (
    <g>
      <g transform="translate(560,330)">
        {/* Plato: media esfera cerrada por una elipse, para que se lea como parábola vista de lado */}
        <path d="M-72,0 A72,72 0 0 1 72,0 A72,24 0 0 0 -72,0 Z" fill="#0e1729" stroke={accent} strokeOpacity="0.8" strokeWidth="2.2" transform="rotate(-40)" />
        <path d="M-72,0 A72,24 0 0 0 72,0" fill={accent} fillOpacity="0.16" stroke={accent} strokeOpacity="0.4" transform="rotate(-40)" />
        <circle cx="28" cy="-36" r="6" fill={accent} className="ph-blip" />
        <path d="M0,0 L0,58" stroke={accent} strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
        <path d="M-28,60 L28,60" stroke={accent} strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d="M640,214 A140,140 0 0 1 640,354"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          className="ph-wave"
          style={{ animationDelay: `${i * 1.1}s`, transformOrigin: '586px 284px' }}
        />
      ))}
      <g transform="translate(950,296)">
        <g className="ph-drift">
          <rect x="-86" y="-54" width="172" height="108" rx="16" fill="#0e1729" stroke={accent} strokeOpacity="0.65" strokeWidth="1.8" />
          <path d="M-14,-22 L28,0 L-14,22 Z" fill={accent} fillOpacity="0.8" />
        </g>
      </g>
    </g>
  );
}

/** Siluetas mirando al cielo bajo un platillo lejano */
function SceneInvestigadores({ accent }: { accent: string }) {
  const figure = (x: number, s: number, o: number) => (
    <g key={x} transform={`translate(${x},400) scale(${s})`} opacity={o}>
      <circle cy="-148" r="30" fill="#0e1729" stroke={accent} strokeOpacity="0.75" strokeWidth="2.2" />
      <path d="M-46,0 C-46,-68 -26,-116 0,-116 C26,-116 46,-68 46,0 Z" fill="#0e1729" stroke={accent} strokeOpacity="0.6" strokeWidth="2.2" />
    </g>
  );
  return (
    <g>
      <ellipse cx="720" cy="252" rx="300" ry="76" fill={accent} opacity="0.14" filter="url(#phBlur)" />
      <g className="ph-drift">
        <ellipse cx="720" cy="240" rx="100" ry="19" fill="#12203a" stroke={accent} strokeOpacity="0.9" strokeWidth="2" />
        <path d="M-40,-4 Q0,-38 40,-4 Z" transform="translate(720,240)" fill={accent} fillOpacity="0.38" />
        <circle cx="678" cy="249" r="4" fill={accent} className="ph-blip" />
        <circle cx="720" cy="252" r="4" fill={accent} className="ph-blip" style={{ animationDelay: '0.5s' }} />
        <circle cx="762" cy="249" r="4" fill={accent} className="ph-blip" style={{ animationDelay: '1s' }} />
      </g>
      {[figure(560, 0.86, 0.9), figure(880, 0.72, 0.75), figure(380, 0.56, 0.5), figure(1060, 0.5, 0.42)]}
    </g>
  );
}

/** Constelación de hitos enlazados */
function SceneTimeline({ accent }: { accent: string }) {
  const nodes = [
    [70, 330], [230, 268], [390, 316], [550, 244], [710, 300], [870, 252], [1030, 322], [1190, 272], [1370, 314],
  ];
  return (
    <g>
      <polyline
        points={nodes.map((n) => n.join(',')).join(' ')}
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="1400"
        className="ph-trace"
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="17" fill={accent} opacity="0.28" className="ph-blip" style={{ animationDelay: `${i * 0.35}s` }} />
          <circle cx={x} cy={y} r="6" fill={accent} opacity="0.9" />
          <path d={`M${x},${y + 15} L${x},${y + 50}`} stroke={accent} strokeOpacity="0.22" strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

/** Radar barriendo con ecos */
function SceneNoticias({ accent }: { accent: string }) {
  return (
    <g transform="translate(720,318)">
      {[62, 104, 146].map((r) => (
        <circle key={r} r={r} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1.6" />
      ))}
      <path d="M-158,0 L158,0" stroke={accent} strokeOpacity="0.16" strokeWidth="1.2" />
      <path d="M0,-158 L0,158" stroke={accent} strokeOpacity="0.16" strokeWidth="1.2" />
      <g className="ph-sweep">
        <path d="M0,0 L146,0 A146,146 0 0 0 103,-103 Z" fill="url(#phSweep)" />
        <path d="M0,0 L146,0" stroke={accent} strokeOpacity="0.7" strokeWidth="2" />
      </g>
      <circle cx="70" cy="-54" r="5" fill={accent} className="ph-blip" />
      <circle cx="-98" cy="34" r="4" fill={accent} className="ph-blip" style={{ animationDelay: '1.2s' }} />
      <circle cx="24" cy="-116" r="4.5" fill={accent} className="ph-blip" style={{ animationDelay: '2.1s' }} />
      <circle r="5" fill={accent} />
    </g>
  );
}

/** Estrella marcada dentro de un enjambre en órbita */
function SceneFavoritos({ accent }: { accent: string }) {
  const star = (cx: number, cy: number, s: number) =>
    `M${cx},${cy - 10 * s} L${cx + 3 * s},${cy - 3 * s} L${cx + 10 * s},${cy - 2 * s} L${cx + 5 * s},${cy + 3 * s} L${cx + 6 * s},${cy + 10 * s} L${cx},${cy + 6 * s} L${cx - 6 * s},${cy + 10 * s} L${cx - 5 * s},${cy + 3 * s} L${cx - 10 * s},${cy - 2 * s} L${cx - 3 * s},${cy - 3 * s} Z`;
  return (
    <g>
      <ellipse cx="720" cy="300" rx="250" ry="112" fill={accent} opacity="0.13" filter="url(#phBlur)" />
      <g transform="translate(720,300)">
        <ellipse rx="212" ry="64" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" transform="rotate(-16)" />
        <ellipse rx="156" ry="46" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" transform="rotate(24)" />
      </g>
      <path d={star(720, 300, 4.4)} fill={accent} fillOpacity="0.9" className="ph-flicker" />
      {([[430, 250, 1.5], [520, 356, 1.1], [960, 252, 1.3], [1040, 350, 1.6], [270, 320, 1], [1200, 296, 1.2]] as const).map(([x, y, sc], i) => (
        <path key={i} d={star(x, y, sc)} fill={accent} fillOpacity="0.45" className="ph-blip" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
    </g>
  );
}

/** Escala de proximidad: de la nave lejana al encuentro cara a cara */
function SceneHynek({ accent }: { accent: string }) {
  const pasos = [
    [560, 320, 5], [660, 314, 7], [760, 308, 9.5], [860, 302, 12], [960, 296, 15],
  ] as const;
  return (
    <g>
      <path d="M470,326 L1010,290" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 8" />
      <g className="ph-drift">
        <ellipse cx="390" cy="292" rx="88" ry="17" fill="#0e1729" stroke={accent} strokeOpacity="0.8" strokeWidth="2" />
        <path d="M-34,-4 Q0,-34 34,-4 Z" transform="translate(390,292)" fill={accent} fillOpacity="0.4" />
        <circle cx="352" cy="300" r="3.5" fill={accent} className="ph-blip" />
        <circle cx="390" cy="303" r="3.5" fill={accent} className="ph-blip" style={{ animationDelay: '0.4s' }} />
        <circle cx="428" cy="300" r="3.5" fill={accent} className="ph-blip" style={{ animationDelay: '0.8s' }} />
      </g>
      {pasos.map(([x, y, r], i) => (
        <circle key={x} cx={x} cy={y} r={r} fill={accent} fillOpacity="0.5" className="ph-blip" style={{ animationDelay: `${i * 0.45}s` }} />
      ))}
      <g transform="translate(1090,400)">
        <circle cy="-146" r="30" fill="#0e1729" stroke={accent} strokeOpacity="0.75" strokeWidth="2.2" />
        <path d="M-46,0 C-46,-68 -26,-116 0,-116 C26,-116 46,-68 46,0 Z" fill="#0e1729" stroke={accent} strokeOpacity="0.6" strokeWidth="2.2" />
      </g>
    </g>
  );
}

/** Un teléfono grabando una luz, y la ficha donde se anota */
function SceneReportar({ accent }: { accent: string }) {
  return (
    <g>
      <polygon points="676,268 700,262 560,180 528,206" fill={accent} fillOpacity="0.16" filter="url(#phBlur)" className="ph-flicker" />
      <circle cx="544" cy="194" r="9" fill={accent} className="ph-blip" />
      <circle cx="544" cy="194" r="26" fill={accent} opacity="0.2" filter="url(#phBlur)" />
      <g transform="translate(720,330) rotate(-14)">
        <rect x="-52" y="-96" width="104" height="192" rx="14" fill="#0e1729" stroke={accent} strokeOpacity="0.8" strokeWidth="2.2" />
        <rect x="-42" y="-82" width="84" height="150" rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.3" />
        <circle cy="-88" r="3" fill={accent} fillOpacity="0.7" />
        <circle cx="-14" cy="-30" r="7" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="2" />
      </g>
      <g transform="translate(980,300) rotate(6)">
        <rect x="-70" y="-88" width="140" height="176" rx="10" fill="#0e1729" stroke={accent} strokeOpacity="0.55" strokeWidth="1.8" />
        <rect x="-26" y="-100" width="52" height="20" rx="6" fill="#131d31" stroke={accent} strokeOpacity="0.5" />
        {[-52, -20, 12, 44].map((y) => (
          <g key={y}>
            <path d={`M-48,${y} l7,8 l13,-16`} fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="-22" y={y - 4} width="66" height="7" rx="3.5" fill={accent} opacity="0.28" />
          </g>
        ))}
      </g>
    </g>
  );
}

/** Gente mirando hacia arriba y hojas escritas a mano: relatos, no documentos */
function SceneTestimonios({ accent }: { accent: string }) {
  return (
    <g>
      <circle cx="700" cy="150" r="8" fill={accent} className="ph-blip" />
      <circle cx="700" cy="150" r="30" fill={accent} opacity="0.18" filter="url(#phBlur)" />

      {/* Hojas manuscritas, cada una con su inclinación */}
      {[
        { x: 470, y: 320, rot: -9 },
        { x: 620, y: 338, rot: 5 },
      ].map((h) => (
        <g key={h.x} transform={`translate(${h.x},${h.y}) rotate(${h.rot})`}>
          <rect x="-58" y="-74" width="116" height="148" rx="7" fill="#0e1729" stroke={accent} strokeOpacity="0.55" strokeWidth="1.8" />
          {[-48, -30, -12, 6, 24, 42].map((y, i) => (
            <rect key={y} x="-42" y={y} width={i % 3 === 2 ? 46 : 84} height="6" rx="3" fill={accent} opacity="0.26" />
          ))}
        </g>
      ))}

      {/* Siluetas de testigos mirando al cielo */}
      {[
        { x: 880, s: 1 },
        { x: 946, s: 0.86 },
        { x: 1002, s: 0.94 },
      ].map((p) => (
        <g key={p.x} transform={`translate(${p.x},400) scale(${p.s})`}>
          <circle cy="-118" r="17" fill="#0e1729" stroke={accent} strokeOpacity="0.6" strokeWidth="1.8" />
          <path d="M-24,0 C-24,-58 -12,-96 0,-96 C12,-96 24,-58 24,0 Z" fill="#0e1729" stroke={accent} strokeOpacity="0.5" strokeWidth="1.8" />
        </g>
      ))}

      {/* Globos de diálogo: lo que se cuenta, sin comprobar */}
      {[
        { x: 806, y: 196, r: 13 },
        { x: 836, y: 166, r: 9 },
        { x: 860, y: 142, r: 5.5 },
      ].map((b) => (
        <circle key={b.x} cx={b.x} cy={b.y} r={b.r} fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.8" />
      ))}
    </g>
  );
}

const SCENES: Record<HeroScene, (p: { accent: string }) => ReactNode> = {
  catalogo: SceneCatalogo,
  expedientes: SceneExpedientes,
  biblioteca: SceneBiblioteca,
  canales: SceneCanales,
  investigadores: SceneInvestigadores,
  timeline: SceneTimeline,
  noticias: SceneNoticias,
  favoritos: SceneFavoritos,
  hynek: SceneHynek,
  reportar: SceneReportar,
  testimonios: SceneTestimonios,
};

interface PageHeroProps {
  scene: HeroScene;
  /** Color de acento de la sección, el mismo que usa el menú */
  accent: string;
  badge: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Contenido extra bajo el subtítulo (botones, contadores…) */
  children?: ReactNode;
}

export default function PageHero({ scene, accent, badge, title, subtitle, children }: PageHeroProps) {
  const Scene = SCENES[scene];
  return (
    <header className="relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="phSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0c" />
            <stop offset="55%" stopColor="#0e1526" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <radialGradient id="phGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="phBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="phSweep" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
          </linearGradient>
          <filter id="phBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        <rect x="0" y="0" width="1440" height="400" fill="url(#phSky)" />
        <ellipse cx="720" cy="300" rx="620" ry="220" fill="url(#phGlow)" />

        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#ffffff"
            className="hero-star"
            style={
              {
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                '--star-min': s.min,
                '--star-max': s.max,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Sierra que ancla la escena y la funde con la página; va detrás del motivo */}
        <path d="M0,346 C160,322 300,364 460,346 C620,328 760,368 900,350 C1040,332 1200,366 1440,346 L1440,400 L0,400 Z" fill="#07090f" />

        <Scene accent={accent} />

      </svg>

      {/* Velos: legibilidad del texto y fundido con el fondo de la página */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 62% 52% at 50% 34%, rgba(10,10,12,0.88) 0%, rgba(10,10,12,0.5) 55%, rgba(10,10,12,0) 100%)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none bg-gradient-to-t from-aurora-black to-transparent" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 pt-14 pb-28 md:pt-16 md:pb-36 text-center">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase border rounded-full backdrop-blur-sm"
          style={{ color: accent, borderColor: `${accent}55`, background: `${accent}14` }}
        >
          {badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">{title}</h1>
        {subtitle && <p className="text-gray-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}
