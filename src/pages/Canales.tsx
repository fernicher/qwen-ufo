import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MonitorPlay } from 'lucide-react';
import { channels, channelAvatarKey } from '../data/channels';
import { useChannelAvatars } from '../hooks/useChannelAvatars';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ChannelCard from '../components/ChannelCard';

export default function Canales() {
  useDocumentTitle('Canales de YouTube');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { data: channelAvatars } = useChannelAvatars();

  useEffect(() => { setQuery(searchParams.get('q') || ''); }, [searchParams]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value) setSearchParams({ q: value }); else setSearchParams({});
  };

  const q = query.toLowerCase();
  const filtered = channels.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase border rounded-full" style={{ color: '#ef4444', borderColor: '#ef44444d', background: '#ef44440d' }}>
            <MonitorPlay className="w-3.5 h-3.5" /> Canales de YouTube
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Canales <span style={{ color: '#ef4444' }}>recomendados</span></h1>
          <p className="text-gray-400">Los mejores canales de YouTube sobre el fenómeno OVNI/UAP, en español e inglés</p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => handleQueryChange(e.target.value)} placeholder="Buscar canal..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => { const k = channelAvatarKey(c); return <ChannelCard key={c.id} c={c} avatar={k ? channelAvatars?.[k] : undefined} />; })}
          </div>
        ) : <p className="text-center text-gray-500 py-12">Sin resultados.</p>}
      </div>
    </div>
  );
}
