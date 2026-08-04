import { useState } from 'react';
import { RadioTower, RefreshCw, Plus } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import type { NewsSource } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import { sourceMeta } from '../components/newsMeta';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PAGE = 9;

export default function Noticias() {
  useDocumentTitle('Noticias OVNI / UAP — Radar de señales');
  const { data, isLoading, isError, refetch, isFetching } = useNews();
  const [filter, setFilter] = useState<NewsSource | 'all'>('all');
  const [limit, setLimit] = useState(PAGE);

  const items = data?.items ?? [];
  const available = Array.from(new Set(items.map((i) => i.source)));
  const filtered = filter === 'all' ? items : items.filter((i) => i.source === filter);
  const shown = filtered.slice(0, limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20">
              <RadioTower className="w-6 h-6 text-aurora-cyan" />
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Radar de señales</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Todas las últimas noticias y menciones sobre el fenómeno OVNI / UAP, agregadas en tiempo casi real
            desde prensa, Reddit y Bluesky. Las fuentes en español aparecen priorizadas.
          </p>
          {data?.updatedAt && (
            <p className="text-xs text-gray-600 mt-2">
              Actualizado {new Date(data.updatedAt).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
            </p>
          )}
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-aurora-cyan border border-white/10 hover:border-aurora-cyan/40 rounded-lg px-3 py-2 transition-colors"
          aria-label="Actualizar noticias"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} /> Actualizar
        </button>
      </div>

      {available.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...available] as (NewsSource | 'all')[]).map((s) => {
            const label = s === 'all' ? 'Todas' : sourceMeta[s].label;
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => { setFilter(s); setLimit(PAGE); }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? 'bg-aurora-cyan/15 border-aurora-cyan/50 text-aurora-cyan'
                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-aurora-charcoal/40 border border-white/5 rounded-2xl p-4 h-40 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-aurora-charcoal/40 border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-gray-300 font-display font-semibold mb-1">El radar está en silencio por ahora</p>
          <p className="text-gray-500 text-sm">
            El feed en vivo se sirve desde las funciones de Vercel. En local corré <code className="text-aurora-cyan">vercel dev</code> para verlo.
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="text-gray-500">No hay señales recientes para este filtro.</p>
      )}

      {shown.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
          {limit < filtered.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setLimit((l) => l + PAGE)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50 transition-colors"
              >
                <Plus className="w-4 h-4 text-aurora-cyan" /> Cargar más ({filtered.length - limit} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
