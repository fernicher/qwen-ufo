import { useState } from 'react';
import { RadioTower, MessageCircle, Newspaper, Cloud, Play, ArrowUpRight, Flame, MessageSquare, Clock, RefreshCw } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import type { NewsItem, NewsSource } from '../hooks/useNews';

const sourceMeta: Record<NewsSource, { label: string; color: string; Icon: typeof Newspaper }> = {
  reddit: { label: 'Reddit', color: '#ff4500', Icon: MessageCircle },
  news: { label: 'Prensa', color: '#22d3ee', Icon: Newspaper },
  bluesky: { label: 'Bluesky', color: '#0a7aff', Icon: Cloud },
  youtube: { label: 'YouTube', color: '#ff0000', Icon: Play },
};

function timeAgo(iso: string): string {
  const secs = (Date.now() - new Date(iso).getTime()) / 1000;
  if (!isFinite(secs) || secs < 0) return '';
  if (secs < 60) return 'recién';
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  const days = Math.floor(secs / 86400);
  if (days < 30) return `hace ${days} d`;
  return new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

function NewsCard({ item }: { item: NewsItem }) {
  const meta = sourceMeta[item.source];
  const Icon = meta.Icon;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-4 hover:border-aurora-cyan/30 transition-all"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border"
          style={{ color: meta.color, borderColor: `${meta.color}55`, background: `${meta.color}1a` }}
        >
          <Icon className="w-3 h-3" /> {meta.label}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-500 shrink-0">
          <Clock className="w-3 h-3" /> {timeAgo(item.date)}
        </span>
      </div>
      <h3 className="font-display font-semibold text-white text-sm leading-snug line-clamp-3 group-hover:text-aurora-cyan transition-colors">
        {item.title}
      </h3>
      {item.excerpt && <p className="text-xs text-gray-400 line-clamp-2 mt-2">{item.excerpt}</p>}
      <div className="mt-auto pt-3 flex items-center justify-between gap-2 text-[11px] text-gray-500">
        <span className="truncate">{item.author}</span>
        <span className="flex items-center gap-3 shrink-0">
          {typeof item.meta.score === 'number' && (
            <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{item.meta.score}</span>
          )}
          {typeof item.meta.comments === 'number' && (
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{item.meta.comments}</span>
          )}
          {typeof item.meta.likes === 'number' && (
            <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{item.meta.likes}</span>
          )}
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-aurora-cyan transition-colors" />
        </span>
      </div>
    </a>
  );
}

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
  const shown = (filter === 'all' ? items : items.filter((i) => i.source === filter)).slice(0, 12);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20">
                <RadioTower className="w-5 h-5 text-aurora-cyan" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </section>
  );
}
