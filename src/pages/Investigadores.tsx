import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Globe, BookOpen, Award, FileText } from 'lucide-react';
import { investigators, credStyles, credLabels } from '../data/investigators';
import { expedientes } from '../data/expedientes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';
import { useWikiPoster } from '../hooks/useWikiPoster';
import type { Investigator } from '../data/investigators';

/** Retrato desde Wikipedia; si no hay artículo o foto, cae al monograma de siempre. */
function InvestigatorAvatar({ inv }: { inv: Investigator }) {
  const { poster } = useWikiPoster(inv.wiki || '');
  const initials = inv.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-aurora-cyan/20 to-blue-600/20 border border-aurora-cyan/20 flex items-center justify-center">
      {poster ? (
        <img src={poster} alt={inv.name} loading="lazy" className="w-full h-full object-cover" />
      ) : (
        <span className="text-xl font-display font-bold text-aurora-cyan">{initials}</span>
      )}
    </div>
  );
}

export default function Investigadores() {
  useDocumentTitle('Investigadores');
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const [countryFilter, setCountryFilter] = useState<string>('todos');
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const relatedCasesByInvestigator = useMemo(() => {
    const map: Record<string, { id: string; title: string }[]> = {};
    Object.values(expedientes).forEach((exp) => {
      exp.relatedInvestigators.forEach((invId) => {
        if (!map[invId]) map[invId] = [];
        map[invId].push({ id: exp.id, title: exp.title });
      });
    });
    return map;
  }, []);

  const countries = useMemo(() => {
    const set = new Set(investigators.map((i) => i.country));
    return ['todos', ...Array.from(set)];
  }, []);

  const filtered = countryFilter === 'todos' ? investigators : investigators.filter((i) => i.country === countryFilter);

  useEffect(() => {
    if (highlightId && refs.current[highlightId]) {
      refs.current[highlightId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId]);

  return (
    <div className="min-h-screen">
      <PageHero
        scene="investigadores"
        accent="#60a5fa"
        badge="Mentes Detrás del Fenómeno"
        title="Investigadores"
        subtitle="Las figuras que documentaron, analizaron o divulgaron el fenómeno OVNI/UAP"
      />
      <div className="px-4 pb-12 pt-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${countryFilter === c ? 'bg-aurora-cyan text-aurora-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
              {c === 'todos' ? 'Todos' : c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inv) => {
            const cred = credStyles[inv.credibility] || 'text-gray-400 border-gray-400/40 bg-gray-400/10';
            const label = credLabels[inv.credibility] || inv.credibility;
            const relatedCases = relatedCasesByInvestigator[inv.id] || [];
            const isHighlighted = highlightId === inv.id;
            return (
              <div
                key={inv.id}
                ref={(el) => { refs.current[inv.id] = el; }}
                className={`bg-aurora-charcoal/60 border rounded-2xl p-6 transition-all ${isHighlighted ? 'border-aurora-cyan/60 ring-1 ring-aurora-cyan/40' : 'border-white/5 hover:border-aurora-cyan/30'}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <InvestigatorAvatar inv={inv} />
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      <Link to={`/investigadores/${inv.id}`} className="hover:text-aurora-cyan transition-colors">
                        {inv.name}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-gray-400"><Globe className="w-3 h-3" />{inv.country}</div>
                  </div>
                </div>
                <p className="text-xs text-aurora-cyan/80 font-semibold uppercase tracking-wider mb-2">{inv.specialty}</p>
                <p className="text-sm text-gray-300 mb-4">{inv.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inv.works.map((w) => (
                    <span key={w} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 flex items-center gap-1">
                      <BookOpen className="w-2.5 h-2.5" />{w}
                    </span>
                  ))}
                </div>
                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded border mb-4 ${cred}`}>
                  <Award className="w-3 h-3 inline mr-1" />{label}
                </span>
                {relatedCases.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Casos relacionados</p>
                    <div className="flex flex-col gap-1.5">
                      {relatedCases.map((c) => (
                        <Link key={c.id} to={`/expedientes/${c.id}`} className="flex items-center gap-2 text-xs text-gray-300 hover:text-aurora-cyan">
                          <FileText className="w-3 h-3 text-aurora-cyan/60 shrink-0" />{c.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
