import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMedia } from '../hooks/useTMDB';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_QUERIES = [
  { term: 'UFO', title: 'OVNI / UAP' },
  { term: 'alien', title: 'Alienígenas' },
  { term: 'extraterrestrial', title: 'Extraterrestres' },
  { term: 'close encounters', title: 'Encuentros Cercanos' },
  { term: 'abduction', title: 'Abducciones' },
  { term: 'Area 51', title: 'Área 51' },
  { term: 'Roswell', title: 'Roswell' },
  { term: 'space mystery', title: 'Misterios Espaciales' },
  { term: 'government conspiracy', title: 'Conspiraciones Gubernamentales' },
  { term: 'documentary UFO', title: 'Documentales OVNI' },
];

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  
  const [manualQuery, setManualQuery] = useState(urlQuery);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<{ id: number; type: 'movie' | 'tv' } | null>(null);

  // Sincronizar con URL
  useEffect(() => {
    setManualQuery(urlQuery);
    setPage(1);
  }, [urlQuery]);

  const { data, isLoading, isError } = useSearchMedia(manualQuery, page);
  const results = data?.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv') || [];
  const totalPages = data?.total_pages || 1;
  const totalResults = data?.total_results || 0;

  const handleSearch = (query: string) => {
    setManualQuery(query);
    setPage(1);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Archivo <span className="text-aurora-cyan">Multimedia</span>
          </h1>
          {manualQuery ? (
            <p className="text-gray-400">
              {totalResults} títulos encontrados • Página {page} de {totalPages}
            </p>
          ) : (
            <p className="text-gray-400">
              Explora cientos de títulos sobre el fenómeno OVNI/UAP
            </p>
          )}
        </div>

        {/* Buscador */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={manualQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar títulos..."
            className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50"
          />
        </div>

        {/* Búsqueda activa */}
        {manualQuery && (
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Resultados para "{manualQuery}"
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin" />
              </div>
            ) : isError ? (
              <div className="text-center text-red-400 py-10">Error al buscar</div>
            ) : results.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {results.map((m) => (
                    <MediaCard
                      key={`manual-${m.id}`}
                      media={m}
                      onClick={() => setSelected({ id: m.id, type: m.media_type })}
                    />
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-aurora-charcoal border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-aurora-cyan/50 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" /> Anterior
                    </button>
                    <span className="text-sm text-gray-400">Página {page} de {totalPages}</span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="flex items-center gap-2 px-4 py-2 bg-aurora-charcoal border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-aurora-cyan/50 transition-all"
                    >
                      Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No se encontraron títulos para "{manualQuery}"
              </div>
            )}
          </section>
        )}

        {/* Secciones automáticas (solo si no hay búsqueda) */}
        {!manualQuery && (
          <div className="space-y-12">
            {AUTO_QUERIES.map((query) => (
              <AutoSearchSection
                key={query.term}
                query={query.term}
                title={query.title}
                onSelectMedia={setSelected}
              />
            ))}
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

function AutoSearchSection({ 
  query, 
  title, 
  onSelectMedia 
}: { 
  query: string; 
  title: string; 
  onSelectMedia: (media: { id: number; type: 'movie' | 'tv' }) => void;
}) {
  const { data, isLoading } = useSearchMedia(query);
  const results = data?.results
    .filter(r => r.media_type === 'movie' || r.media_type === 'tv')
    .slice(0, 10) || [];

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6">{title}</h2>
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (results.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-display font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map((m) => (
          <MediaCard
            key={`${query}-${m.id}`}
            media={m}
            onClick={() => onSelectMedia({ id: m.id, type: m.media_type })}
          />
        ))}
      </div>
    </section>
  );
}