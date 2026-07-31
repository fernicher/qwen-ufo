import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, Headphones, Search, Star, ExternalLink } from 'lucide-react';
import { books } from '../data/books';
import { podcasts } from '../data/podcasts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type Tab = 'todos' | 'libros' | 'podcasts' | 'esenciales';

export default function Biblioteca() {
  useDocumentTitle('Biblioteca');
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>('todos');
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value) setSearchParams({ q: value }); else setSearchParams({});
  };

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) && (tab === 'podcasts' ? false : tab === 'esenciales' ? b.essential : true));
  const filteredPodcasts = podcasts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) && (tab === 'libros' ? false : tab === 'esenciales' ? p.essential : true));

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase border border-amber-400/30 rounded-full bg-amber-400/5">Biblioteca de Conocimiento</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Libros y <span className="text-amber-400">Podcasts</span></h1>
          <p className="text-gray-400">La colección curada sobre el fenómeno OVNI/UAP</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {([
            { id: 'todos', label: 'Todo', icon: Book },
            { id: 'libros', label: 'Libros', icon: Book },
            { id: 'podcasts', label: 'Podcasts', icon: Headphones },
            { id: 'esenciales', label: 'Esenciales', icon: Star },
          ] as const).map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${tab === t.id ? 'bg-amber-400 text-aurora-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => handleQueryChange(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50" />
        </div>
        <div className="space-y-12">
          {filteredBooks.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Book className="w-6 h-6 text-amber-400" /> Libros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-all flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-white group-hover:text-amber-400">{book.title}</h3>
                      {book.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{book.authors.join(', ')} • {book.year}</p>
                    {book.rating && <div className="flex items-center gap-1 mb-3"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-semibold">{book.rating}/10</span></div>}
                    <p className="text-sm text-gray-300 line-clamp-3 flex-1">{book.description}</p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 uppercase">{book.category}</span>
                      {book.url && (
                        <a href={book.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300">
                          Buscar libro <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {filteredPodcasts.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Headphones className="w-6 h-6 text-amber-400" /> Podcasts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPodcasts.map((p) => (
                  <div key={p.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-white group-hover:text-amber-400">{p.title}</h3>
                      {p.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{p.host}</p>
                    {p.rating && <div className="flex items-center gap-1 mb-3"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-semibold">{p.rating}/10</span></div>}
                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">{p.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <span>{p.frequency}</span>
                      {p.episodes && <span>• {p.episodes} episodios</span>}
                    </div>
                    {p.platforms && p.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {p.platforms.map((pl) => (
                          <a key={pl.name} href={pl.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 hover:bg-amber-400/20">
                            {pl.name} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
