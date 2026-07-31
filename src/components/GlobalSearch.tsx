import { useState, useEffect, useRef } from 'react';
import { Search, X, Film, MapPin, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearchMedia } from '../hooks/useTMDB';
import { ufoCases } from '../data/cases';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(p => !p); }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => { if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100); if (!isOpen) setQuery(''); }, [isOpen]);

  const { data: tmdbData } = useSearchMedia(query);
  const results: any[] = [];
  if (query.length >= 2) {
    const q = query.toLowerCase();
    ufoCases.filter(c => c.title.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 5).forEach(c => results.push({ type: 'case', id: c.id, title: c.title, subtitle: `${c.date.split('-')[0]} • ${c.country}`, caseId: c.id }));
  }
  if (tmdbData?.results) tmdbData.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv').slice(0, 8).forEach(m => results.push({ type: 'media', id: m.id, title: m.title || m.name, subtitle: m.media_type === 'movie' ? 'Película' : 'Serie' }));

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-3 px-4 py-2 bg-aurora-charcoal border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 hidden sm:inline">Buscar...</span>
        <span className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500"><Command className="w-3 h-3" />K</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15%]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl bg-aurora-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-aurora-cyan" />
              <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar películas, casos..." className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none" />
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-md"><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">{query.length === 0 ? 'Empieza a escribir' : `Sin resultados para "${query}"`}</div>
              ) : results.map((r) => (
                <button key={r.id} onClick={() => { setIsOpen(false); navigate(r.caseId ? `/mapa?case=${r.caseId}` : '/catalogo'); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-left">
                  <div className="w-9 h-9 rounded-lg bg-aurora-cyan/10 flex items-center justify-center">
                    {r.caseId ? <MapPin className="w-4 h-4 text-aurora-cyan" /> : <Film className="w-4 h-4 text-aurora-cyan" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.title}</p>
                    <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}