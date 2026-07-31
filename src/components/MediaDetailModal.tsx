import { X, Star, Calendar, Play, Heart } from 'lucide-react';
import { useMediaDetails } from '../hooks/useTMDB';
import { useAuroraStore } from '../store/useStore';

export default function MediaDetailModal({ mediaId, mediaType, onClose }: { mediaId: number; mediaType: 'movie' | 'tv'; onClose: () => void }) {
  const { data: media, isLoading } = useMediaDetails(mediaId, mediaType);
  const { favorites, toggleFavorite } = useAuroraStore();
  const isFavorite = favorites.some((f: any) => f.id === String(mediaId));
  const trailer = media?.videos?.results?.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-aurora-charcoal rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
        {isLoading ? (
          <div className="flex items-center justify-center h-96"><div className="w-10 h-10 border-4 border-aurora-cyan border-t-transparent rounded-full animate-spin" /></div>
        ) : media ? (
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="relative h-64 md:h-96">
              {media.backdrop_path && <img src={`${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_URL}${media.backdrop_path}`} alt="" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-aurora-charcoal via-aurora-charcoal/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{media.title || media.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-aurora-cyan" />{media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0]}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-aurora-cyan fill-aurora-cyan" />{media.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                {media.poster_path && <img src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${media.poster_path}`} alt="" className="w-full rounded-xl" />}
                <button onClick={() => toggleFavorite({ id: String(media.id), title: media.title || media.name || '', type: mediaType, poster: media.poster_path || undefined })} className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold ${isFavorite ? 'bg-aurora-cyan text-aurora-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-aurora-black' : ''}`} /> {isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
                </button>
              </div>
              <div className="md:col-span-2 space-y-8">
                <div className="flex flex-wrap gap-2">
                  {media.genres?.map((g: any) => <span key={g.id} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full">{g.name}</span>)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">Sinopsis</h3>
                  <p className="text-gray-300 leading-relaxed">{media.overview || 'Sin sinopsis disponible.'}</p>
                </div>
                {trailer && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-aurora-cyan" />Trailer</h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <iframe src={`https://www.youtube.com/embed/${trailer.key}`} title="Trailer" className="absolute inset-0 w-full h-full" allowFullScreen />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : <div className="flex items-center justify-center h-96 text-gray-400">Error al cargar</div>}
      </div>
    </div>
  );
}