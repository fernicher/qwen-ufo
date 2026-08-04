import { ArrowUpRight, Flame, MessageSquare, Clock } from 'lucide-react';
import type { NewsItem } from '../hooks/useNews';
import { sourceMeta, timeAgo } from './newsMeta';

export default function NewsCard({ item }: { item: NewsItem }) {
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
