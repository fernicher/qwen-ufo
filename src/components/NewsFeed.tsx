import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RadioTower, RefreshCw, ArrowRight } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import type { NewsSource } from '../hooks/useNews';
import NewsCard from './NewsCard';
import { sourceMeta } from './newsMeta';

function Skeleton() {
  return (
    <div className="bg-aurora-charcoal/40 border border-white/5 rounded-2xl p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-16 bg-white/10 rounded" />
        <div className="h-4 w-12 bg-white/5 rounded" />
      </div>
      <div className="h-3 w-full bg-white/10 rounded mb-2" />
      <div className="h-3 w-4/5 bg-white/10 rounded mb-2" />
      <div className="h-3 w-2/3 bg-white/5 rounded" />
    </div>
  );
}

export default function NewsFeed() {
  const { data, isLoading, isError, refetch, isFetching } = useNews();
  const [filter, setFilter] = useState<NewsSource | 'all'>('all');

  const items = data?.items ?? [];
  const available = Array.from(new Set(items.map((i) => i.source)));
  const shown = (filter === 'all' ? items : items.filter((i) => i.source === filter)).slice(0, 6);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl" style={{ background: '#f472b61a', border: '1px solid #f472b633' }}>
                <RadioTower className="w-5 h-5" style={{ color: '#f472b6' }} />
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Radar de señales</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xl">
              Últimas noticias y menciones sobre OVNIs / UAP, en tiempo casi real desde múltiples fuentes.
            </p>
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
                  onClick={() => setFilter(s)}
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
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {isError && (
          <div className="bg-aurora-charcoal/40 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-300 font-display font-semibold mb-1">El radar está en silencio por ahora</p>
            <p className="text-gray-500 text-sm">
              El feed en vivo se sirve desde las funciones de Vercel. En local corré <code className="text-aurora-cyan">vercel dev</code> para verlo.
            </p>
          </div>
        )}

        {!isLoading && !isError && shown.length === 0 && (
          <p className="text-gray-500 text-sm">No hay señales recientes para este filtro.</p>
        )}

        {shown.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shown.map((item) => <NewsCard key={item.id} item={item} />)}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/noticias"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50 transition-colors"
              >
                Ver todas las noticias <ArrowRight className="w-4 h-4 text-aurora-cyan" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
