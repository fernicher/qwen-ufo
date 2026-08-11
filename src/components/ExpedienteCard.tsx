import { Link } from 'react-router-dom';
import { MapPin, Calendar, Shield } from 'lucide-react';
import CaseTypeIcon from './CaseTypeIcon';
import { getExtra } from '../data/expediente-extras';
import { caseTypeMeta } from '../data/caseTypes';
import { useWikiPoster } from '../hooks/useWikiPoster';

const credColors: Record<string, string> = {
  A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
  B: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
  C: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
};

export default function ExpedienteCard({ c }: { c: any }) {
  const hex = caseTypeMeta[c.type as keyof typeof caseTypeMeta].color;
  const typeLabel = caseTypeMeta[c.type as keyof typeof caseTypeMeta].longLabel;
  const extra = getExtra(c.id);
  // Si el caso no tiene artículo propio, se recurre a la foto del lugar, etiquetada como tal
  const isPlace = !extra.wiki && !!extra.wikiPlace;
  const { poster } = useWikiPoster(extra.wiki || extra.wikiPlace || '');

  return (
    <Link to={`/expedientes/${c.id}`} className="group block bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-aurora-cyan/30 transition-all">
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 40%, ${hex}22 0%, transparent 60%), linear-gradient(135deg, rgba(15,23,42,0.6), rgba(18,18,22,0.9))` }}
      >
        {poster ? (
          <>
            <img src={poster} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-aurora-black/30 to-transparent" />
          </>
        ) : (
          <>
            <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden="true">
              <circle cx="50%" cy="50%" r="30" fill="none" stroke={hex} strokeWidth="1" opacity="0.4" />
              <circle cx="50%" cy="50%" r="55" fill="none" stroke={hex} strokeWidth="1" opacity="0.25" />
              <circle cx="50%" cy="50%" r="80" fill="none" stroke={hex} strokeWidth="1" opacity="0.12" />
            </svg>
            <CaseTypeIcon type={c.type} color={hex} size={72} className="relative drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] group-hover:scale-110 transition-transform duration-300" />
          </>
        )}
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-xs font-bold px-2 py-1 rounded border ${credColors[c.credibility]}`}><Shield className="w-3 h-3 inline mr-1" />{c.credibility}</span>
        </div>
        <span className="absolute bottom-3 left-4 z-10 text-[10px] font-semibold uppercase tracking-wider" style={{ color: hex }}>{typeLabel}</span>
        {poster && isPlace && extra.placeLabel && (
          <span className="absolute bottom-3 right-4 z-10 flex items-center gap-1 text-[10px] text-gray-300 bg-aurora-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <MapPin className="w-2.5 h-2.5" /> {extra.placeLabel}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-aurora-cyan">{c.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date.split('-')[0]}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.country}</span>
        </div>
        <p className="text-sm text-gray-300 line-clamp-3">{c.description}</p>
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
          {c.tags.slice(0, 3).map((t: string) => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}
