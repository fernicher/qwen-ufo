import { Link } from 'react-router-dom';
import { Heart, Film, Tv, Radio, ExternalLink, MapPin } from 'lucide-react';
import type { CatalogItem, CatalogType } from '../data/catalog';
import { useWikiPoster } from '../hooks/useWikiPoster';
import { useAuroraStore } from '../store/useStore';

const typeMeta: Record<CatalogType, { label: string; icon: typeof Film; accent: string; grad: string }> = {
  pelicula: { label: 'Película', icon: Film, accent: '#22d3ee', grad: 'from-cyan-500/20 to-blue-600/10' },
  serie: { label: 'Serie', icon: Tv, accent: '#c084fc', grad: 'from-purple-500/20 to-fuchsia-600/10' },
  documental: { label: 'Documental', icon: Radio, accent: '#fbbf24', grad: 'from-amber-500/20 to-orange-600/10' },
};

export default function CatalogCard({ item }: { item: CatalogItem }) {
  const { poster, loading } = useWikiPoster(item.wiki);
  const { favorites, toggleFavorite } = useAuroraStore();
  const isFav = favorites.some((f: any) => f.id === item.id);
  const meta = typeMeta[item.type];
  const Icon = meta.icon;
  const justWatch = `https://www.justwatch.com/ar/buscar?q=${encodeURIComponent(item.title)}`;

  return (
    <div className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-aurora-cyan/30 transition-all flex flex-col">
      <div className="h-1 w-full shrink-0" style={{ background: meta.accent }} />
      <div className={`relative aspect-[2/3] overflow-hidden bg-gradient-to-br ${meta.grad}`}>
        {poster ? (
          <img src={poster} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 text-center">
            <Icon className="w-10 h-10" style={{ color: meta.accent }} strokeWidth={1.5} />
            {loading && <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />}
            {!loading && <span className="text-xs text-gray-400 font-display font-semibold leading-tight">{item.title}</span>}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-black/90 via-transparent to-transparent" />
        <button
          onClick={() => toggleFavorite({ id: item.id, title: item.title, type: item.type })}
          aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute top-2 right-2 p-2 rounded-lg border backdrop-blur-sm transition-colors ${isFav ? 'bg-aurora-cyan/20 border-aurora-cyan/50 text-aurora-cyan' : 'bg-black/40 border-white/10 text-gray-300 hover:text-white'}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-aurora-cyan' : ''}`} />
        </button>
        <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border" style={{ color: meta.accent, borderColor: `${meta.accent}55`, background: `${meta.accent}1a` }}>
          {meta.label}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-white text-sm leading-tight mb-1 group-hover:text-aurora-cyan">{item.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{item.year} • {item.director}</p>
        <p className="text-xs text-gray-400 line-clamp-3 flex-1">{item.synopsis}</p>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <a href={justWatch} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-aurora-cyan hover:text-aurora-cyanGlow">
            Dónde ver <ExternalLink className="w-3 h-3" />
          </a>
          {item.caseId && (
            <Link to={`/expedientes/${item.caseId}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
              <MapPin className="w-3 h-3" /> Caso
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
