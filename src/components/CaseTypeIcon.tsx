import type { CaseType } from '../data/cases';

interface CaseTypeIconProps {
  type: CaseType;
  color: string;
  size?: number;
  className?: string;
}

/**
 * Ilustración vectorial original por tipo de caso. No son fotos (evitamos usar
 * imágenes reales de los incidentes, que suelen ser de dudosa procedencia o
 * directamente de archivo periodístico con derechos), pero le dan a cada
 * expediente una identidad visual reconocible de un vistazo.
 */
export default function CaseTypeIcon({ type, color, size = 64, className = '' }: CaseTypeIconProps) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', className, xmlns: 'http://www.w3.org/2000/svg' };

  switch (type) {
    case 'avistamiento':
      return (
        <svg {...common}>
          <ellipse cx="32" cy="34" rx="22" ry="7" fill="none" stroke={color} strokeWidth="2" />
          <path d="M18 34 Q32 16 46 34" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="20" cy="41" r="1.6" fill={color} />
          <circle cx="32" cy="43" r="1.6" fill={color} />
          <circle cx="44" cy="41" r="1.6" fill={color} />
          <circle cx="32" cy="24" r="2" fill={color} opacity="0.6" />
        </svg>
      );
    case 'aterrizaje':
      return (
        <svg {...common}>
          <line x1="8" y1="48" x2="56" y2="48" stroke={color} strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="32" cy="30" rx="18" ry="6" fill="none" stroke={color} strokeWidth="2" />
          <path d="M20 30 Q32 15 44 30" fill="none" stroke={color} strokeWidth="2" />
          <line x1="20" y1="34" x2="14" y2="46" stroke={color} strokeWidth="1.5" />
          <line x1="44" y1="34" x2="50" y2="46" stroke={color} strokeWidth="1.5" />
          <ellipse cx="32" cy="48" rx="14" ry="2.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <ellipse cx="32" cy="48" rx="20" ry="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
        </svg>
      );
    case 'contacto':
      return (
        <svg {...common}>
          <path d="M24 14 L40 14 L48 40 L16 40 Z" fill={color} opacity="0.12" />
          <path d="M24 14 L40 14 L48 40 L16 40 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
          <circle cx="32" cy="46" r="5" fill="none" stroke={color} strokeWidth="2" />
          <path d="M32 51 L32 58 M27 56 L37 56" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M23 44 L41 44" stroke={color} strokeWidth="1.5" opacity="0.5" />
        </svg>
      );
    case 'radar':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
          <circle cx="32" cy="32" r="13" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx="32" cy="32" r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
          <line x1="32" y1="12" x2="32" y2="52" stroke={color} strokeWidth="1" opacity="0.25" />
          <line x1="12" y1="32" x2="52" y2="32" stroke={color} strokeWidth="1" opacity="0.25" />
          <path d="M32 32 L32 12 A20 20 0 0 1 48 20 Z" fill={color} opacity="0.18" />
          <circle cx="41" cy="19" r="2.2" fill={color} />
        </svg>
      );
    case 'fotografico':
      return (
        <svg {...common}>
          <rect x="12" y="22" width="40" height="26" rx="3" fill="none" stroke={color} strokeWidth="2" />
          <rect x="24" y="16" width="16" height="7" rx="2" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="35" r="9" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="35" r="4" fill={color} opacity="0.5" />
          <circle cx="45" cy="27" r="1.4" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}
