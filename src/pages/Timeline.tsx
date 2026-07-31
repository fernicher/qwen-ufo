import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const colors: Record<string, { dot: string; badge: string }> = {
  hito: { dot: 'bg-amber-400', badge: 'text-amber-400 border-amber-400/40 bg-amber-400/10' },
  caso: { dot: 'bg-cyan-400', badge: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10' },
  desclasificacion: { dot: 'bg-green-400', badge: 'text-green-400 border-green-400/40 bg-green-400/10' },
  cultura: { dot: 'bg-purple-400', badge: 'text-purple-400 border-purple-400/40 bg-purple-400/10' },
};

const categoryLabels: Record<string, string> = {
  hito: 'Hito',
  caso: 'Caso',
  desclasificacion: 'Desclasificación',
  cultura: 'Cultura',
};

export default function Timeline() {
  useDocumentTitle('Línea de tiempo');
  const sorted = [...timelineEvents].sort((a, b) => a.year - b.year);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Línea Temporal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{sorted[0]?.year}—{sorted[sorted.length - 1]?.year}</h1>
          <p className="text-gray-400">Casos, desclasificaciones e hitos culturales del fenómeno OVNI/UAP</p>
        </div>

        <div className="relative pl-8 border-l border-white/10">
          {sorted.map((event) => {
            const c = colors[event.category] || colors.hito;
            return (
              <div key={`${event.year}-${event.title}`} className="relative pb-10 last:pb-0">
                <div className={`absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full ${c.dot} border-2 border-aurora-black`} />
                <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-5 hover:border-aurora-cyan/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-display font-bold text-white">{event.year}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${c.badge}`}>{categoryLabels[event.category] || event.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  {event.caseId && (
                    <Link to={`/expedientes/${event.caseId}`} className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-aurora-cyan hover:text-aurora-cyanGlow">
                      Ver expediente <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
