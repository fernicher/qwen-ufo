import { Star } from 'lucide-react';
import type { TMDBMedia } from '../types/tmdb';

export default function MediaCard({ media, onClick }: { media: TMDBMedia; onClick: () => void }) {
  const title = media.title || media.name;
  const year = media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0] || 'N/A';
  const imageUrl = media.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${media.poster_path}` : '';

  return (
    <div onClick={onClick} className="group relative cursor-pointer rounded-xl overflow-hidden bg-aurora-charcoal border border-white/5 hover:border-aurora-cyan/50 transition-all">
      <div className="relative aspect-[2/3] overflow-hidden">
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />}
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-transparent to-transparent opacity-80" />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md border border-aurora-cyan/30">
          <Star className="w-3 h-3 text-aurora-cyan fill-aurora-cyan" />
          <span className="text-xs font-bold text-white">{media.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-display font-semibold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-aurora-cyan">{title}</h3>
        <p className="text-xs text-gray-400">{year} • {media.media_type === 'movie' ? 'Película' : 'Serie'}</p>
      </div>
    </div>
  );
}