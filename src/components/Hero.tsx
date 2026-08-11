import { ArrowRight, Play, ChevronDown } from 'lucide-react';
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

// Three depth layers of stars: far dust, mid field and a few bright cyan beacons
const STARS = Array.from({ length: 130 }).map((_, i) => {
  const glow = i % 17 === 6;
  const minOpacity = rand() * 0.25 + 0.08;
  return {
    x: rand() * 1440,
    y: rand() * 780,
    r: (rand() * 1.1 + 0.4) * (glow ? 2 : 1),
    minOpacity,
    maxOpacity: Math.min(minOpacity + rand() * 0.5 + 0.25, 1),
    duration: 3 + rand() * 6,
    delay: rand() * 6,
    glow,
  };
});

// Lights running around the rim of the mothership, delayed in sequence to read as rotation
const RIM_LIGHT_COUNT = 18;
const RIM_LIGHTS = Array.from({ length: RIM_LIGHT_COUNT }).map((_, i) => {
  const t = (i / RIM_LIGHT_COUNT) * Math.PI * 2;
  return {
    x: 720 + Math.cos(t) * 344,
    y: 206 + Math.sin(t) * 56,
    r: 3.5 + Math.sin(t) * 1.6,
    delay: (i / RIM_LIGHT_COUNT) * 2.6,
  };
});

// Dust motes drifting up inside the abduction beam
const MOTES = Array.from({ length: 22 }).map(() => ({
  x: 720 + (rand() - 0.5) * 460,
  y: 620 + rand() * 260,
  r: rand() * 2.6 + 1,
  duration: 5 + rand() * 6,
  delay: rand() * 8,
}));

// Grey anatomy: cranium widest just above the eye line, sharp taper to a small
// chin, shoulders narrower than the skull.
const ALIEN_HEAD =
  'M100,0 C143,0 169,33 169,78 C169,110 157,134 139,154 C125,172 112,186 100,190 C88,186 75,172 61,154 C43,134 31,110 31,78 C31,33 57,0 100,0 Z';
const ALIEN_NECK = 'M88,170 L112,170 L118,212 L82,212 Z';
const ALIEN_TORSO =
  'M88,196 C68,206 54,224 49,252 C43,286 52,322 50,362 L150,362 C148,322 157,286 151,252 C146,224 132,206 112,196 Z';
// One eye, drawn around its own origin: round at the outer tip (-x), tapering
// to a point at the inner tip. Placed with a positive rotation so the outer
// corner rides high — the upswept slant that reads as a grey rather than a
// drooping, sad cartoon.
const ALIEN_EYE =
  'M-34,0 C-30,-11 -14,-17 4,-15 C20,-13 30,-7 34,1 C26,11 6,15 -12,12 C-26,10 -33,6 -34,0 Z';
const EYE_TILT = 22;

interface AlienProps {
  /** CSS class carrying the position/scale transform (see index.css) */
  className: string;
  breathDelay?: number;
  blinkDelay?: number;
  /** Mid-ground aliens are dimmer and skip the fine details */
  distant?: boolean;
}

function Alien({ className, breathDelay = 0, blinkDelay = 0, distant = false }: AlienProps) {
  return (
    <g className={className}>
      <g className="hero-alien-breathe" style={{ animationDelay: `${breathDelay}s` }}>
        {/* Backlight halo bleeding around the silhouette */}
        <ellipse cx="100" cy="160" rx="118" ry="196" fill="url(#alienHalo)" filter="url(#heroSoftBlur)" />

        {/* Arms — spindly, hanging past the hips */}
        <path d="M56,222 C38,254 30,300 36,346" fill="none" stroke="url(#alienSkin)" strokeWidth="15" strokeLinecap="round" />
        <path d="M144,222 C162,254 170,300 164,346" fill="none" stroke="url(#alienSkin)" strokeWidth="15" strokeLinecap="round" />
        {!distant && (
          <g stroke="url(#alienSkin)" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M30,352 L24,380" />
            <path d="M36,354 L36,384" />
            <path d="M42,352 L48,378" />
            <path d="M170,352 L176,380" />
            <path d="M164,354 L164,384" />
            <path d="M158,352 L152,378" />
          </g>
        )}

        {/* Neck, torso, skull */}
        <path d={ALIEN_NECK} fill="url(#alienSkin)" />
        <path d={ALIEN_TORSO} fill="url(#alienSkin)" />
        <path d={ALIEN_HEAD} fill="url(#alienSkin)" />
        {/* Volume: highlight on the cranium, shadow pooling under the cheekbones */}
        <ellipse cx="82" cy="46" rx="48" ry="38" fill="url(#alienSheen)" transform="rotate(-14 82 46)" />
        <path d={ALIEN_HEAD} fill="url(#alienShade)" />
        <ellipse cx="62" cy="128" rx="30" ry="26" fill="url(#alienHollow)" />
        <ellipse cx="138" cy="128" rx="30" ry="26" fill="url(#alienHollow)" />

        {/* Rim light: strongest on the side facing the ship, fading round the jaw */}
        <path d={ALIEN_HEAD} fill="none" stroke="url(#alienRim)" strokeWidth="2" strokeOpacity="0.8" />
        <path d={ALIEN_TORSO} fill="none" stroke="url(#alienRim)" strokeWidth="1.8" strokeOpacity="0.45" />

        {/* Cyan cast the beam throws back off the wet surface of the eyes */}
        <g className="hero-eye-glow" style={{ animationDelay: `${blinkDelay}s` }}>
          <ellipse cx="64" cy="86" rx="34" ry="19" fill="#22d3ee" opacity="0.32" filter="url(#heroSoftBlur)" transform={`rotate(-${EYE_TILT} 64 86)`} />
          <ellipse cx="136" cy="86" rx="34" ry="19" fill="#22d3ee" opacity="0.32" filter="url(#heroSoftBlur)" transform={`rotate(${EYE_TILT} 136 86)`} />
        </g>

        {/* Eyes — mirrored from one path so both sides stay identical */}
        <g className="hero-blink" style={{ animationDelay: `${blinkDelay}s` }}>
          <g transform={`translate(64,86) rotate(${EYE_TILT})`}>
            <path d={ALIEN_EYE} fill="url(#alienEye)" />
            <path d={ALIEN_EYE} fill="none" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1.1" />
            {!distant && (
              <>
                <ellipse cx="-16" cy="-7" rx="13" ry="5.5" fill="url(#alienGloss)" transform="rotate(-16 -16 -7)" />
                <ellipse cx="7" cy="-8" rx="2.6" ry="1.3" fill="#f0fdff" opacity="0.42" transform="rotate(-12 7 -8)" />
              </>
            )}
          </g>
          <g transform={`translate(136,86) scale(-1,1) rotate(${EYE_TILT})`}>
            <path d={ALIEN_EYE} fill="url(#alienEye)" />
            <path d={ALIEN_EYE} fill="none" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1.1" />
            {!distant && (
              <>
                <ellipse cx="-16" cy="-7" rx="13" ry="5.5" fill="url(#alienGloss)" transform="rotate(-16 -16 -7)" />
                <ellipse cx="7" cy="-8" rx="2.6" ry="1.3" fill="#f0fdff" opacity="0.42" transform="rotate(-12 7 -8)" />
              </>
            )}
          </g>
        </g>

        {!distant && (
          <>
            {/* Nostril slits — no bridge — and a flat lipless mouth */}
            <path d="M95,130 L94,137" stroke="#04060a" strokeOpacity="0.75" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M105,130 L106,137" stroke="#04060a" strokeOpacity="0.75" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M92,159 L108,159" stroke="#04060a" strokeOpacity="0.5" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </g>
    </g>
  );
}

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
      {/* Cinematic night scene, fully SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05060a" />
            <stop offset="45%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <radialGradient id="heroNebulaA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroNebulaB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroShipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#0ea5e9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroHull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="35%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0b1120" />
          </linearGradient>
          <linearGradient id="heroHullUnder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#05070c" />
          </linearGradient>
          <linearGradient id="heroDome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="heroBeam" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#cffafe" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="alienSkin" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#3d5273" />
            <stop offset="35%" stopColor="#1c2740" />
            <stop offset="100%" stopColor="#070b16" />
          </linearGradient>
          <radialGradient id="alienSheen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8fd9ea" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#8fd9ea" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="alienShade" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="52%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000205" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id="alienRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="alienEye" cx="34%" cy="30%" r="76%">
            <stop offset="0%" stopColor="#12202e" />
            <stop offset="55%" stopColor="#05090f" />
            <stop offset="100%" stopColor="#010306" />
          </radialGradient>
          {/* Soft-edged so the specular reads as wet cornea, not a pasted-on oval */}
          <radialGradient id="alienGloss" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dff6ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#dff6ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="alienHollow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#01040a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#01040a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="alienHalo" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroFog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0c" stopOpacity="0" />
            <stop offset="60%" stopColor="#0a0a0c" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0a0a0c" stopOpacity="1" />
          </linearGradient>
          <filter id="heroSoftBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="heroBeamBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <filter id="heroBigBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="46" />
          </filter>
          <filter id="heroStarGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Sky + nebulae */}
        <rect x="0" y="0" width="1440" height="900" fill="url(#heroSky)" />
        <ellipse cx="250" cy="220" rx="380" ry="230" fill="url(#heroNebulaA)" filter="url(#heroBigBlur)" />
        <ellipse cx="1230" cy="330" rx="360" ry="220" fill="url(#heroNebulaB)" filter="url(#heroBigBlur)" />

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

        {/* Shooting stars */}
        <g className="hero-shoot" style={{ animationDelay: '2s' }}>
          <path d="M120,90 L240,140" stroke="#e0f2fe" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        </g>
        <g className="hero-shoot" style={{ animationDelay: '9s', animationDuration: '15s' }}>
          <path d="M980,60 L1080,105" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Scout craft drifting across the horizon */}
        <g className="hero-scout">
          <ellipse cx="0" cy="430" rx="42" ry="9" fill="#0f172a" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d="M-16,427 Q0,412 16,427 Z" fill="#22d3ee" fillOpacity="0.4" />
          <circle cx="0" cy="436" r="3" fill="#67e8f9" className="hero-light" style={{ animationDuration: '1.4s' }} />
        </g>

        {/* Abduction beam */}
        <g className="hero-beam">
          <polygon points="624,248 816,248 1210,900 230,900" fill="url(#heroBeam)" filter="url(#heroBeamBlur)" opacity="0.95" />
          <polygon points="664,248 776,248 892,740 548,740" fill="#a5f3fc" opacity="0.16" filter="url(#heroBeamBlur)" />
        </g>
        {/* Scan bands sliding down the beam */}
        <g opacity="0.45">
          <polygon points="660,286 780,286 812,320 628,320" fill="#a5f3fc" opacity="0.3" className="hero-scan" filter="url(#heroSoftBlur)" />
          <polygon points="660,286 780,286 812,320 628,320" fill="#a5f3fc" opacity="0.3" className="hero-scan" filter="url(#heroSoftBlur)" style={{ animationDelay: '2.6s' }} />
        </g>

        {/* Motes rising inside the beam */}
        {MOTES.map((m, i) => (
          <circle
            key={i}
            cx={m.x}
            cy={m.y}
            r={m.r}
            fill="#a5f3fc"
            className="hero-mote"
            style={{ animationDuration: `${m.duration}s`, animationDelay: `${m.delay}s` }}
          />
        ))}

        {/* Pool of light where the beam meets the ground */}
        <ellipse cx="720" cy="790" rx="330" ry="62" fill="url(#heroPool)" filter="url(#heroBeamBlur)" className="hero-beam" />

        {/* Ground impact rings under the beam */}
        <g className="hero-rings">
          {[0, 1.6, 3.2].map((d) => (
            <ellipse
              key={d}
              cx="720"
              cy="792"
              rx="70"
              ry="15"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
              className="hero-ripple"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>

        {/* ── Mothership ── */}
        {/* Outer group carries the static placement; the class animates transform, so it needs its own node */}
        <g transform="translate(0,-22)">
        <g className="hero-ship">
          <ellipse cx="720" cy="210" rx="620" ry="230" fill="url(#heroShipGlow)" filter="url(#heroBigBlur)" />

          {/* Dome */}
          <path d="M584,176 A 140,104 0 0 1 856,176 Z" fill="url(#heroDome)" stroke="#67e8f9" strokeOpacity="0.75" strokeWidth="2" />
          <ellipse cx="676" cy="126" rx="26" ry="34" fill="#e0f2fe" opacity="0.18" transform="rotate(-18 676 126)" />
          <g className="hero-dome-cells">
            <path d="M660,176 L698,92" stroke="#a5f3fc" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M720,176 L720,80" stroke="#a5f3fc" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M780,176 L742,92" stroke="#a5f3fc" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M600,150 Q720,116 840,150" stroke="#a5f3fc" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
          </g>

          {/* Upper hull */}
          <ellipse cx="720" cy="182" rx="286" ry="52" fill="url(#heroHull)" />
          {/* Main saucer disc */}
          <ellipse cx="720" cy="206" rx="360" ry="62" fill="url(#heroHull)" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="2" />
          <ellipse cx="720" cy="196" rx="360" ry="52" fill="#0f172a" opacity="0.55" />
          {/* Underside cone */}
          <path d="M372,214 Q720,352 1068,214 Z" fill="url(#heroHullUnder)" />
          <path d="M470,238 Q720,318 970,238" fill="none" stroke="#22d3ee" strokeOpacity="0.25" strokeWidth="2" />

          {/* Hull panel lines */}
          <g stroke="#67e8f9" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
            <path d="M420,196 Q720,150 1020,196" />
            <path d="M470,212 Q720,176 970,212" />
            <path d="M560,166 L560,196" />
            <path d="M880,166 L880,196" />
          </g>

          {/* Rotating rim of lights */}
          <ellipse
            cx="720"
            cy="206"
            rx="344"
            ry="56"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="5"
            strokeOpacity="0.85"
            strokeDasharray="5 30"
            className="hero-ring-chase"
          />
          {RIM_LIGHTS.map((l, i) => (
            <g key={i}>
              <circle cx={l.x} cy={l.y} r={l.r * 3} fill="#22d3ee" opacity="0.25" filter="url(#heroStarGlow)" />
              <circle
                cx={l.x}
                cy={l.y}
                r={l.r}
                fill="#a5f3fc"
                className="hero-rim-light"
                style={{ animationDelay: `${l.delay}s` }}
              />
            </g>
          ))}

          {/* Engine core */}
          <ellipse cx="720" cy="268" rx="150" ry="26" fill="#22d3ee" opacity="0.25" filter="url(#heroSoftBlur)" />
          <ellipse cx="720" cy="264" rx="92" ry="17" fill="#67e8f9" className="hero-core" />
          <ellipse cx="720" cy="262" rx="48" ry="9" fill="#ecfeff" opacity="0.9" />
        </g>
        </g>

        {/* ── Terrain ── */}
        {/* Aurora band hugging the horizon */}
        <ellipse cx="720" cy="668" rx="760" ry="70" fill="#0891b2" opacity="0.22" filter="url(#heroBigBlur)" />
        <path
          d="M0,660 C120,612 260,682 400,640 C560,594 680,672 840,630 C980,594 1120,662 1260,626 C1340,606 1400,632 1440,642 L1440,900 L0,900 Z"
          fill="#0d1424"
        />
        <path
          d="M0,700 C160,668 300,716 460,700 C620,684 760,724 900,706 C1040,688 1200,722 1440,700 L1440,900 L0,900 Z"
          fill="#0a0f1c"
        />

        {/* Mid-ground aliens standing at the edge of the light */}
        <Alien className="hero-alien hero-alien-far-l" breathDelay={1.2} blinkDelay={2.4} distant />
        <Alien className="hero-alien hero-alien-far-r" breathDelay={0.4} blinkDelay={5.1} distant />

        {/* Foreground ridge */}
        <path
          d="M0,772 C180,736 340,796 520,768 C700,740 860,798 1040,770 C1200,745 1320,782 1440,764 L1440,900 L0,900 Z"
          fill="#05070c"
        />
        <rect x="0" y="690" width="1440" height="210" fill="url(#heroFog)" opacity="0.8" />

        {/* ── Foreground aliens ── */}
        <Alien className="hero-alien hero-alien-l" breathDelay={0} blinkDelay={1.1} />
        <Alien className="hero-alien hero-alien-r" breathDelay={1.7} blinkDelay={3.6} />

        <rect x="0" y="740" width="1440" height="160" fill="url(#heroFog)" opacity="0.85" />
      </svg>

      {/* Vignette so the copy stays readable over the scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 52%, rgba(5,6,10,0.9) 0%, rgba(5,6,10,0.62) 55%, rgba(5,6,10,0) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom scrim: keeps the stats legible over the foreground figures */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none bg-gradient-to-t from-aurora-black via-aurora-black/70 to-transparent"
        aria-hidden="true"
      />

      <div className="hero-copy relative z-10 max-w-5xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/10 backdrop-blur-sm shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" /> Archivo Desclasificado
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-[1.05] drop-shadow-[0_0_35px_rgba(0,0,0,0.9)]">
          La verdad está <br />
          <span className="hero-title-sheen text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan via-cyan-200 to-blue-500">
            más cerca que nunca
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          La plataforma multimedia definitiva en español dedicada al fenómeno OVNI/UAP.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-10">
          <Link
            to="/catalogo"
            className="px-8 py-4 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:brightness-110 hover:shadow-[0_0_45px_rgba(6,182,212,0.65)] active:scale-95 transition-all flex items-center gap-3"
          >
            Explorar Archivo <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/mapa"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-display font-bold rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:brightness-110 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] active:scale-95 transition-all flex items-center gap-3"
          >
            <Play className="w-4 h-4" /> Mapa Global
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-aurora-cyan drop-shadow-[0_0_18px_rgba(34,211,238,0.5)]">
                {s.value}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-gray-500">
        <span className="text-[10px] uppercase tracking-[0.3em]">Desliza</span>
        <ChevronDown className="w-5 h-5 hero-scroll-cue" />
      </div>
    </div>
  );
}
