import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { List, MapPin } from 'lucide-react';
import InteractiveMap from '../components/Map/InteractiveMap';
import { ufoCases } from '../data/cases';

export default function Mapa() {
  const [searchParams] = useSearchParams();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    const caseId = searchParams.get('case');
    if (caseId) setSelectedCaseId(caseId);
  }, [searchParams]);

  return (
    <div className="relative h-screen w-full bg-aurora-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-b from-aurora-black via-aurora-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-[10px] font-bold tracking-widest text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo Geográfico</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Mapa Global de <span className="text-aurora-cyan">Avistamientos</span></h1>
            <p className="text-sm text-gray-400 mt-1">{ufoCases.length} casos documentados</p>
          </div>
          <button onClick={() => setListOpen(!listOpen)} className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-aurora-charcoal/90 border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-white text-sm font-medium">
            <List className="w-4 h-4 text-aurora-cyan" /> Expedientes
          </button>
        </div>
      </div>
      <InteractiveMap cases={ufoCases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} />
      {listOpen && (
        <div className="absolute top-24 right-4 bottom-4 z-[1000] w-80 bg-aurora-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-display font-semibold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" /> Expedientes</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {ufoCases.map((c) => (
              <Link key={c.id} to={`/expedientes/${c.id}`} className={`block p-3 rounded-lg mb-1 border ${selectedCaseId === c.id ? 'bg-aurora-cyan/10 border-aurora-cyan/40' : 'border-transparent hover:bg-white/5'}`}>
                <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{c.date.split('-')[0]} • {c.country}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}