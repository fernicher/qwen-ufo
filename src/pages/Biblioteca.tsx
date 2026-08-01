import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, Headphones, Search, Star, ExternalLink, MonitorPlay, Users, Globe, Lock, Landmark } from 'lucide-react';
import { books } from '../data/books';
import { podcasts } from '../data/podcasts';
import { channels } from '../data/channels';
import { divulgadores } from '../data/divulgadores';
import { declassifications } from '../data/declassifications';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWikiPoster } from '../hooks/useWikiPoster';
import BookCard from '../components/BookCard';

type Tab = 'libros' | 'podcasts' | 'canales' | 'divulgadores' | 'desclasificaciones';

const tags: Record<string, string> = {
  divulgador: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
  periodista: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
  militar: 'text-green-400 border-green-400/40 bg-green-400/10',
  científico: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
  testigo: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  controvertido: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
};

const tagLabels: Record<string, string> = {
  divulgador: 'Divulgador', periodista: 'Periodista', militar: 'Ex militar / inteligencia',
  científico: 'Científico', testigo: 'Testigo', controvertido: 'Controvertido',
};

function DivulgadorCard({ d }: { d: any }) {
  const { poster } = useWikiPoster(d.wiki);
  const initials = d.name.replace(/"[^"]*"/g, '').split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('');
  return (
    <div className="bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
      <div className="flex items-start gap-4 mb-3">
        <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-600/10 flex items-center justify-center">
          {poster ? <img src={poster} alt={d.name} loading="lazy" className="w-full h-full object-cover" /> : <span className="text-lg font-display font-bold text-amber-400">{initials}</span>}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-bold text-white leading-tight">{d.name}</h3>
          <p className="text-xs text-amber-400/80 mt-0.5">{d.role}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><Globe className="w-3 h-3" />{d.country}</div>
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-4">{d.bio}</p>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${tags[d.tag]}`}>{tagLabels[d.tag]}</span>
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(d.name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300">
          <MonitorPlay className="w-3.5 h-3.5" /> Ver videos
        </a>
      </div>
    </div>
  );
}

export default function Biblioteca() {
  useDocumentTitle('Biblioteca');
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>('libros');
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => { setQuery(searchParams.get('q') || ''); }, [searchParams]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value) setSearchParams({ q: value }); else setSearchParams({});
  };

  const q = query.toLowerCase();
  const fBooks = books.filter((b) => b.title.toLowerCase().includes(q) || b.authors.some((a: string) => a.toLowerCase().includes(q)));
  const fPodcasts = podcasts.filter((p) => p.title.toLowerCase().includes(q) || p.host.toLowerCase().includes(q));
  const fChannels = channels.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  const fDivulgadores = divulgadores.filter((d) => d.name.toLowerCase().includes(q) || d.role.toLowerCase().includes(q));
  const fDeclassifications = declassifications.filter((d) => d.country.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.agency.toLowerCase().includes(q));

  const tabsDef = [
    { id: 'libros' as Tab, label: 'Libros', icon: Book, count: books.length },
    { id: 'podcasts' as Tab, label: 'Podcasts', icon: Headphones, count: podcasts.length },
    { id: 'canales' as Tab, label: 'Canales', icon: MonitorPlay, count: channels.length },
    { id: 'divulgadores' as Tab, label: 'Divulgadores', icon: Users, count: divulgadores.length },
    { id: 'desclasificaciones' as Tab, label: 'Desclasificaciones', icon: Lock, count: declassifications.length },
  ];

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase border border-amber-400/30 rounded-full bg-amber-400/5">Biblioteca de Conocimiento</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Fuentes y <span className="text-amber-400">Referentes</span></h1>
          <p className="text-gray-400">Libros, podcasts, canales y las figuras clave del fenómeno OVNI/UAP</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tabsDef.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? 'bg-amber-400 text-aurora-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                <Icon className="w-4 h-4" /> {t.label} <span className="opacity-60">{t.count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => handleQueryChange(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50" />
        </div>

        {tab === 'libros' && (
          fBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fBooks.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>
        )}

        {tab === 'podcasts' && (
          fPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fPodcasts.map((p) => (
                <div key={p.id} className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-white group-hover:text-amber-400">{p.title}</h3>
                    {p.essential && <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{p.host}</p>
                  {p.rating && <div className="flex items-center gap-1 mb-3"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-semibold">{p.rating}/10</span></div>}
                  <p className="text-sm text-gray-300 line-clamp-3 mb-3">{p.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4"><span>{p.frequency}</span>{p.episodes && <span>• {p.episodes} episodios</span>}</div>
                  {p.platforms && p.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {p.platforms.map((pl: any) => (
                        <a key={pl.name} href={pl.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 hover:bg-amber-400/20">
                          {pl.name} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>
        )}

        {tab === 'canales' && (
          fChannels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fChannels.map((c) => (
                <a key={c.id} href={c.query} target="_blank" rel="noopener noreferrer" className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-red-500/30 transition-all block">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center"><MonitorPlay className="w-5 h-5 text-red-500" /></div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-400 uppercase">{c.lang === 'es' ? 'Español' : 'Inglés'}</span>
                  </div>
                  <h3 className="font-display font-bold text-white group-hover:text-red-400 mb-1">{c.name}</h3>
                  <p className="text-sm text-gray-400">{c.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 mt-3">Abrir en YouTube <ExternalLink className="w-3 h-3" /></span>
                </a>
              ))}
            </div>
          ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>
        )}

        {tab === 'divulgadores' && (
          fDivulgadores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fDivulgadores.map((d) => <DivulgadorCard key={d.id} d={d} />)}
            </div>
          ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>
        )}

        {tab === 'desclasificaciones' && (
          fDeclassifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fDeclassifications.map((d) => (
                <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer" className="group bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 hover:border-emerald-400/30 transition-all block">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center"><Landmark className="w-5 h-5 text-emerald-400" /></div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-400 uppercase flex items-center gap-1"><Globe className="w-3 h-3" />{d.country}</span>
                  </div>
                  <h3 className="font-display font-bold text-white group-hover:text-emerald-400 mb-1">{d.title}</h3>
                  <p className="text-xs text-emerald-400/80 mb-2">{d.agency} · {d.period}</p>
                  <p className="text-sm text-gray-400">{d.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 mt-3">Ver archivo oficial <ExternalLink className="w-3 h-3" /></span>
                </a>
              ))}
            </div>
          ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>
        )}
      </div>
    </div>
  );
}
