import { useState } from 'react';
import { useSearchMedia } from '../hooks/useTMDB';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Catalogo() {
  const [query, setQuery] = useState('OVNI');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<{ id: number; type: 'movie' | 'tv' } | null>(null);
  
  const { data, isLoading, isError } = useSearchMedia(query, page);
  const results = data?.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv') || [];
  const totalPages = data?.total_pages || 1;
  const totalResults = data?.total_results || 0;

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Archivo <span className="text-aurora-cyan">Multimedia</span>
          </h1>
          <p className="text-gray-400">
            {totalResults} títulos encontrados • Página {page} de {totalPages}
          </p>
        </div>

        {/* Buscador */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Buscar títulos..."
            className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center text-red-400 py-10">
            Error al acceder a los archivos.
          </div>
        )}

        {/* Grid de resultados */}
        {!isLoading && !isError && results.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.map((m) => (
                <MediaCard
                  key={`${m.id}-${m.media_type}`}
                  media={m}
                  onClick={() => setSelected({ id: m.id, type: m.media_type })}
                />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 bg-aurora-charcoal border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-aurora-cyan/50 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
              
              <span className="text-sm text-gray-400">
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-aurora-charcoal border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-aurora-cyan/50 transition-all"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Sin resultados */}
        {!isLoading && !isError && results.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No se encontraron títulos para "{query}"
          </div>
        )}
      </div>

      {selected && (
        <MediaDetailModal
          mediaId={selected.id}
          mediaType={selected.type}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}