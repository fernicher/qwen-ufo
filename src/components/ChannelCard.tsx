import { MonitorPlay, Play, ExternalLink } from 'lucide-react';
import { colorFor, monogram } from '../lib/visual';

export default function ChannelCard({ c, avatar }: { c: any; avatar?: string }) {
  const color = colorFor(c.id);
  return (
    <a href={c.query} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all">
      {/* Banner tipo canal, con color propio */}
      <div className="relative h-24" style={{ background: `linear-gradient(135deg, ${color}59, ${color}12)` }}>
        <span className="absolute left-3 top-3 text-[10px] font-bold px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-white/90 uppercase tracking-wider">{c.lang === 'es' ? 'Español' : 'Inglés'}</span>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white"><Play className="w-2.5 h-2.5 fill-white" /> YouTube</span>
        <MonitorPlay className="absolute right-3 top-3 w-5 h-5 text-white/25" />
      </div>
      {/* Avatar circular: foto real del canal si está disponible, si no las iniciales */}
      <div className="relative px-5 pb-5">
        <div className="absolute -top-7 left-5 w-14 h-14 rounded-full border-4 border-aurora-charcoal overflow-hidden flex items-center justify-center font-display font-bold text-lg shadow-lg" style={{ background: color, color: '#0a0a0c' }}>
          {avatar ? <img src={avatar} alt={c.name} loading="lazy" className="w-full h-full object-cover" /> : monogram(c.name)}
        </div>
        <div className="pt-9">
          <h3 className="font-display font-bold text-white group-hover:text-red-400 leading-tight">{c.name}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-3">{c.description}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 mt-3">Abrir en YouTube <ExternalLink className="w-3 h-3" /></span>
        </div>
      </div>
    </a>
  );
}
