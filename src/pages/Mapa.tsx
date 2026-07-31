import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { List, MapPin, Filter, X } from 'lucide-react';
import InteractiveMap from '../components/Map/InteractiveMap';
import { ufoCases } from '../data/cases';
import type { CaseType, Credibility } from '../data/cases';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const typeLabels: Record<CaseType, string> = {
  avistamiento: 'Avistamiento',
  aterrizaje: 'Aterrizaje',
  contacto: 'Contacto',
  radar: 'Radar',
  fotografico: 'Fotográfico',
};

const credibilities: Credibility[] = ['A', 'B', 'C'];

export default function Mapa() {
  useDocumentTitle('Mapa Global');
  const [searchParams] = useSearchParams();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<CaseType[]>([]);
  const [credFilter, setCredFilter] = useState<Credibility[]>([]);
  const [countryFilter, setCountryFilter] = useState<string>('todos');

  useEffect(() => {
    const caseId = searchParams.get('case');
    if (caseId) setSelectedCaseId(caseId);
  }, [searchParams]);

  const countries = useMemo(() => ['todos', ...Array.from(new Set(ufoCases.map((c) => c.country))).sort()], []);

  const filteredCases = useMemo(() => {
    return ufoCases.filter((c) => {
      if (typeFilter.length > 0 && !typeFilter.includes(c.type)) return false;
      if (credFilter.length > 0 && !credFilter.includes(c.credibility)) return false;
      if (countryFilter !== 'todos' && c.country !== countryFilter) return false;
      return true;
    });
  }, [typeFilter, credFilter, countryFilter]);

  const toggleType = (t: CaseType) => setTypeFilter((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleCred = (c: Credibility) => setCredFilter((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const activeFilterCount = typeFilter.length + credFilter.length + (countryFilter !== 'todos' ? 1 : 0);
  const clearFilters = () => { setTypeFilter([]); setCredFilter([]); setCountryFilter('todos'); };

  return (
    <div className="relative h-screen w-full bg-aurora-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-b from-aurora-black via-aurora-black/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-[10px] font-bold tracking-widest text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo Geográfico</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Mapa Global de <span className="text-aurora-cyan">Avistamientos</span></h1>
            <p className="text-sm text-gray-400 mt-1">{filteredCases.length} de {ufoCases.length} casos {activeFilterCount > 0 ? 'filtrados' : 'documentados'}</p>
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium ${activeFilterCount > 0 ? 'bg-aurora-cyan/10 border-aurora-cyan/50 text-aurora-cyan' : 'bg-aurora-charcoal/90 border-white/10 hover:border-aurora-cyan/50 text-white'}`}>
              <Filter className="w-4 h-4" /> Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <button onClick={() => setListOpen(!listOpen)} className="flex items-center gap-2 px-4 py-2 bg-aurora-charcoal/90 border border-white/10 hover:border-aurora-cyan/50 rounded-lg text-white text-sm font-medium">
              <List className="w-4 h-4 text-aurora-cyan" /> Expedientes
            </button>
          </div>
        </div>

        {filtersOpen && (
          <div className="pointer-events-auto max-w-7xl mx-auto mt-4 bg-aurora-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-white">Filtrar casos</h3>
              {activeFilterCount > 0 && <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"><X className="w-3 h-3" /> Limpiar</button>}
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Tipo</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(typeLabels) as CaseType[]).map((t) => (
                    <button key={t} onClick={() => toggleType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${typeFilter.includes(t) ? 'bg-aurora-cyan text-aurora-black border-aurora-cyan' : 'bg-white/5 text-gray-300 border-white/10 hover:border-aurora-cyan/40'}`}>
                      {typeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Credibilidad</p>
                <div className="flex flex-wrap gap-2">
                  {credibilities.map((c) => (
                    <button key={c} onClick={() => toggleCred(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${credFilter.includes(c) ? 'bg-aurora-cyan text-aurora-black border-aurora-cyan' : 'bg-white/5 text-gray-300 border-white/10 hover:border-aurora-cyan/40'}`}>
                      Evidencia {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">País</p>
                <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan/50">
                  {countries.map((c) => <option key={c} value={c} className="bg-aurora-charcoal">{c === 'todos' ? 'Todos los países' : c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      <InteractiveMap cases={filteredCases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} />
      {listOpen && (
        <div className="absolute top-24 right-4 bottom-4 z-[1000] w-80 bg-aurora-charcoal/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-display font-semibold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" /> Expedientes ({filteredCases.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredCases.length === 0 && <p className="text-sm text-gray-500 text-center py-8">Ningún caso coincide con los filtros.</p>}
            {filteredCases.map((c) => (
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
