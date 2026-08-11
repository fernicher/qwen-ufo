import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { catalog } from '../data/catalog';
import { useWikiPoster } from '../hooks/useWikiPoster';

/** Los tres títulos que representan una colección, según su ruta de destino. */
function titlesFor(route: string): typeof catalog {
  const params = new URLSearchParams(route.split('?')[1] || '');
  const tema = params.get('tema');
  const tipo = params.get('tipo');
  return catalog
    .filter((item) => (tema ? item.themes?.includes(tema as never) : true))
    .filter((item) => (tipo ? item.type === tipo : true))
    .slice(0, 3);
}

/** Mosaico de pósters reales; si Wikipedia no responde queda el degradado de siempre. */
function CollectionMosaic({ route }: { route: string }) {
  const picks = titlesFor(route);
  return (
    <div className="absolute inset-0 flex opacity-45 group-hover:opacity-70 transition-opacity">
      {picks.map((item) => (
        <MosaicTile key={item.id} wiki={item.wiki} />
      ))}
    </div>
  );
}

function MosaicTile({ wiki }: { wiki: string }) {
  const { poster } = useWikiPoster(wiki);
  if (!poster) return <div className="flex-1" />;
  return <img src={poster} alt="" aria-hidden="true" loading="lazy" className="flex-1 min-w-0 h-full object-cover" />;
}

export default function CollectionCarousel({ collections, title, accent = '#22d3ee' }: { collections: any[]; title: string; accent?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
  };
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-white">
            <span className="w-1.5 h-7 rounded-full shrink-0" style={{ background: accent }} />
            {title}
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => scroll('right')} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-aurora-cyan/50 text-gray-400 hover:text-aurora-cyan"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {collections.map((c) => (
            <Link key={c.id} to={c.route} className="group relative block h-44 rounded-2xl overflow-hidden border border-white/5 hover:border-aurora-cyan/40 flex-shrink-0 w-72 md:w-80">
              <CollectionMosaic route={c.route} />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-aurora-black/75 to-aurora-black/45" />
              <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-3 block">{c.icon}</span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-aurora-cyan">{c.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{c.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-aurora-cyan opacity-0 group-hover:opacity-100 transition-opacity">Explorar <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
