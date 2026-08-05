import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Film, Tv, Radio, LayoutGrid, X } from 'lucide-react';
import { catalog } from '../data/catalog';
import type { CatalogType } from '../data/catalog';
import { collections } from '../data/collections';
import CatalogCard from '../components/CatalogCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type Filter = 'todos' | CatalogType;

const filters: { id: Filter; label: string; icon: typeof Film; color: string }[] = [
  { id: 'todos', label: 'Todo', icon: LayoutGrid, color: '#e5e7eb' },
  { id: 'pelicula', label: 'Películas', icon: Film, color: '#22d3ee' },
  { id: 'serie', label: 'Series', icon: Tv, color: '#c084fc' },
  { id: 'documental', label: 'Documentales', icon: Radio, color: '#fbbf24' },
];

export default function Catalogo() {
  useDocumentTitle('Catálogo');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState<Filter>(() => {
    const t = searchParams.get('tipo');
    return t === 'pelicula' || t === 'serie' || t === 'documental' ? t : 'todos';
  });
  const [theme, setTheme] = useState<string | null>(() => searchParams.get('tema'));

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleQuery = (value: string) => {
    setQuery(value);
    setTheme(null);
    if (value) setSearchParams({ q: value }); else setSearchParams({});
  };

  const clearTheme = () => { setTheme(null); setSearchParams({}); };

  const activeCollection = theme ? collections.find((c) => c.route === `/catalogo?tema=${theme}`) : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((item) => {
      if (filter !== 'todos' && item.type !== filter) return false;
      if (theme && !item.themes?.includes(theme as any)) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.director.toLowerCase().includes(q) || item.synopsis.toLowerCase().includes(q) || String(item.year).includes(q);
    });
  }, [query, filter, theme]);

  const counts = useMemo(() => ({
    pelicula: catalog.filter((c) => c.type === 'pelicula').length,
    serie: catalog.filter((c) => c.type === 'serie').length,
    documental: catalog.filter((c) => c.type === 'documental').length,
  }), []);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo Multimedia</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Cine <span className="text-aurora-cyan">OVNI / UAP</span></h1>
          <p className="text-gray-400">Selección curada de {catalog.length} títulos: {counts.pelicula} películas, {counts.serie} series y {counts.documental} documentales</p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            placeholder="Buscar por título, director o año..."
            className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {filters.map((f) => {
            const Icon = f.icon;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={active ? { background: f.color, borderColor: f.color, color: '#0a0a0c' } : { borderColor: `${f.color}44`, color: '#9ca3af', background: `${f.color}12` }}
              >
                <Icon className="w-4 h-4" /> {f.label}
              </button>
            );
          })}
        </div>

        {activeCollection && (
          <div className="flex justify-center mb-10">
            <button onClick={clearTheme} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/20">
              <span>{activeCollection.icon}</span> Colección: {activeCollection.title} <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {results.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No hay títulos que coincidan con "{query}".</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((item) => <CatalogCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
