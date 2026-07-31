import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Film, MapPin, Command, ArrowRight, Book, Headphones, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearchMedia } from '../hooks/useTMDB';
import { ufoCases } from '../data/cases';
import { books } from '../data/books';
import { podcasts } from '../data/podcasts';
import { investigators } from '../data/investigators';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const { data: tmdbData } = useSearchMedia(query);

  const results: any[] = [];
  if (query.length >= 2) {
    const q = query.toLowerCase();
    ufoCases.filter(c => c.title.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 5).forEach(c => {
      results.push({ type: 'case', id: `case-${c.id}`, title: c.title, subtitle: `${c.date.split('-')[0]} • ${c.country}`, caseId: c.id });
    });
    investigators.filter(i => i.name.toLowerCase().includes(q) || i.country.toLowerCase().includes(q) || i.specialty.toLowerCase().includes(q)).slice(0, 3).forEach(i => {
      results.push({ type: 'investigator', id: `inv-${i.id}`, title: i.name, subtitle: i.specialty, investigatorId: i.id });
    });
    books.filter(b => b.title.toLowerCase().includes(q) || b.authors.some(a => a.toLowerCase().includes(q))).slice(0, 3).forEach(b => {
      results.push({ type: 'book', id: `book-${b.id}`, title: b.title, subtitle: b.authors.join(', '), libraryQuery: b.title });
    });
    podcasts.filter(p => p.title.toLowerCase().includes(q) || p.host.toLowerCase().includes(q)).slice(0, 3).forEach(p => {
      results.push({ type: 'podcast', id: `podcast-${p.id}`, title: p.title, subtitle: p.host, libraryQuery: p.title });
    });
  }
  if (tmdbData?.results) {
    tmdbData.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv').slice(0, 5).forEach(m => {
      results.push({ type: 'media', id: `media-${m.id}`, title: m.title || m.name, subtitle: `${m.media_type === 'movie' ? 'Película' : 'Serie'}` });
    });
  }

  const resultIcon = (r: any) => {
    if (r.type === 'case') return <MapPin className="w-4 h-4 text-aurora-cyan" />;
    if (r.type === 'investigator') return <Users className="w-4 h-4 text-aurora-cyan" />;
    if (r.type === 'book') return <Book className="w-4 h-4 text-aurora-cyan" />;
    if (r.type === 'podcast') return <Headphones className="w-4 h-4 text-aurora-cyan" />;
    return <Film className="w-4 h-4 text-aurora-cyan" />;
  };

  const goToResult = (r: any) => {
    setIsOpen(false);
    if (r.caseId) return navigate(`/mapa?case=${r.caseId}`);
    if (r.investigatorId) return navigate(`/investigadores?highlight=${r.investigatorId}`);
    if (r.libraryQuery) return navigate(`/biblioteca?q=${encodeURIComponent(r.libraryQuery)}`);
    return navigate(`/catalogo?q=${encodeURIComponent(query)}`);
  };

  // Al presionar Enter, ir al catálogo con la búsqueda
  const handleSearch = () => {
    if (query.length >= 2) {
      setIsOpen(false);
      navigate(`/catalogo?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 px-4 py-2 bg-aurora-charcoal/60 backdrop-blur-md border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-sm transition-all">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 hidden sm:inline">Buscar...</span>
        <span className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500">
          <Command className="w-3 h-3" />K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[2001] w-full max-w-2xl bg-aurora-charcoal/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search className="w-5 h-5 text-aurora-cyan" />
                <input 
                  ref={inputRef} 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="Buscar en todo el archivo..." 
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none" 
                />
                {query.length >= 2 && (
                  <button 
                    onClick={handleSearch}
                    className="flex items-center gap-1 px-3 py-1.5 bg-aurora-cyan/10 border border-aurora-cyan/30 rounded-lg text-xs font-semibold text-aurora-cyan hover:bg-aurora-cyan/20 transition-all"
                  >
                    Ver todo <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-md"><X className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {results.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    {query.length === 0 ? 'Empieza a escribir' : `Sin resultados para "${query}"`}
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((r) => (
                      <button key={r.id} onClick={() => goToResult(r)} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left">
                        <div className="w-9 h-9 rounded-lg bg-aurora-cyan/10 flex items-center justify-center">
                          {resultIcon(r)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{r.title}</p>
                          <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}