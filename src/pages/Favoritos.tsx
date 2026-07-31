import { useState } from 'react';
import { Heart, Film, Tv, X } from 'lucide-react';
import { useAuroraStore } from '../store/useStore';
import MediaDetailModal from '../components/MediaDetailModal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface FavoriteItem {
  id: string;
  title: string;
  type: string;
  poster?: string;
}

export default function Favoritos() {
  useDocumentTitle('Favoritos');
  const { favorites, toggleFavorite } = useAuroraStore();
  const [selected, setSelected] = useState<{ id: number; type: 'movie' | 'tv' } | null>(null);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Tu colección</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Mis <span className="text-aurora-cyan">Favoritos</span></h1>
          <p className="text-gray-400">{favorites.length === 0 ? 'Todavía no marcaste ningún título' : `${favorites.length} título${favorites.length === 1 ? '' : 's'} guardado${favorites.length === 1 ? '' : 's'}`}</p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Marcá el corazón en cualquier película o serie del catálogo para verla acá.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((f: FavoriteItem) => (
              <div key={f.id} className="group relative rounded-xl overflow-hidden bg-aurora-charcoal border border-white/5 hover:border-aurora-cyan/50 transition-all">
                <button
                  onClick={() => toggleFavorite(f)}
                  aria-label="Quitar de favoritos"
                  className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-400/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelected({ id: Number(f.id), type: f.type === 'tv' ? 'tv' : 'movie' })}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-white/5">
                    {f.poster ? (
                      <img src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${f.poster}`} alt={f.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        {f.type === 'tv' ? <Tv className="w-8 h-8" /> : <Film className="w-8 h-8" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-display font-semibold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-aurora-cyan">{f.title}</h3>
                    <p className="text-xs text-gray-400">{f.type === 'tv' ? 'Serie' : 'Película'}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <MediaDetailModal mediaId={selected.id} mediaType={selected.type} onClose={() => setSelected(null)} />}
    </div>
  );
}
