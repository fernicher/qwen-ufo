import { Star, ExternalLink, BookOpen } from 'lucide-react';
import { useBookData } from '../hooks/useBookData';

interface BookCardProps {
  book: any;
}

export default function BookCard({ book }: BookCardProps) {
  const author = book.authors?.[0] || '';
  const { cover, isbn, loading } = useBookData(book.title, author);

  return (
    <div className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all flex flex-col">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-amber-500/15 to-orange-600/10 flex items-center justify-center">
          {cover ? (
            <img src={cover} alt={book.title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 p-2 text-center">
              <BookOpen className="w-7 h-7 text-amber-400/70" strokeWidth={1.5} />
              {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-white text-sm leading-tight group-hover:text-amber-400">{book.title}</h3>
            {book.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-500 mt-1 mb-1">{book.authors.join(', ')} • {book.year}</p>
          {book.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold">{book.rating}/10</span>
            </div>
          )}
          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase">{book.category}</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex flex-col flex-1">
        <p className="text-sm text-gray-300 line-clamp-3 flex-1">{book.description}</p>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-[10px] text-gray-600 font-mono">{isbn ? `ISBN ${isbn}` : ''}</span>
          {book.url && (
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 shrink-0">
              Buscar libro <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
