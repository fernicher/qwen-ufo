import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../data/timeline';

const colors: any = {
  hito: { dot: 'bg-amber-400', badge: 'text-amber-400 border-amber-400/40' },
  caso: { dot: 'bg-cyan-400', badge: 'text-cyan-400 border-cyan-400/40' },
  desclasificacion: { dot: 'bg-green-400', badge: 'text-green-400 border-green-400/40' },
  cultura: { dot: 'bg-purple-400', badge: 'text-purple-400 border-purple-400/40' },
};

export default function TimelinePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' }); };
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Línea Temporal</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">70 Años de Fenómeno</h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/timeline" className="text-sm font-semibold text-aurora-cyan hover:text-aurora-cyanGlow">Ver línea completa</Link>
            <button onClick={() => scroll('left')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll('right')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pt-2">
            {timelineEvents.map((event) => {
              const c = colors[event.category];
              return (
                <div key={`${event.year}-${event.title}`} className="flex-shrink-0 w-56 relative pt-10">
                  <div className={`absolute top-6 left-4 w-4 h-4 rounded-full ${c.dot} border-2 border-aurora-black`} />
                  <div className="bg-aurora-charcoal/80 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-display font-bold text-white">{event.year}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${c.badge}`}>{event.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{event.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-3">{event.description}</p>
                    {event.caseId && <Link to={`/mapa?case=${event.caseId}`} className="inline-flex items-center gap-1 mt-3 text-[10px] font-semibold text-aurora-cyan">Ver en mapa <ExternalLink className="w-3 h-3" /></Link>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}