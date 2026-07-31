import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Shield, Search } from 'lucide-react';
import { ufoCases } from '../data/cases';
import CaseTypeIcon from '../components/CaseTypeIcon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const typeLabels: Record<string, string> = {
  avistamiento: 'Avistamiento',
  aterrizaje: 'Aterrizaje',
  contacto: 'Contacto',
  radar: 'Detección por radar',
  fotografico: 'Registro fotográfico',
};

export default function Expedientes() {
  useDocumentTitle('Expedientes');
  const [query, setQuery] = useState('');
  const filtered = ufoCases.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()));
  const credColors: any = { A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10', B: 'text-blue-400 border-blue-400/40 bg-blue-400/10', C: 'text-purple-400 border-purple-400/40 bg-purple-400/10' };
  const credHex: Record<string, string> = { A: '#22d3ee', B: '#60a5fa', C: '#c084fc' };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Archivo de Casos</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Expedientes <span className="text-aurora-cyan">Desclasificados</span></h1>
          <p className="text-gray-400">Investigaciones detalladas de los casos más significativos</p>
        </div>
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => {
            const hex = credHex[c.credibility];
            return (
              <Link key={c.id} to={`/expedientes/${c.id}`} className="group block bg-aurora-charcoal/60 border border-white/5 rounded-2xl overflow-hidden hover:border-aurora-cyan/30 transition-all">
                <div
                  className="relative h-40 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${hex}22 0%, transparent 60%), linear-gradient(135deg, rgba(15,23,42,0.6), rgba(18,18,22,0.9))`,
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden="true">
                    <circle cx="50%" cy="50%" r="30" fill="none" stroke={hex} strokeWidth="1" opacity="0.4" />
                    <circle cx="50%" cy="50%" r="55" fill="none" stroke={hex} strokeWidth="1" opacity="0.25" />
                    <circle cx="50%" cy="50%" r="80" fill="none" stroke={hex} strokeWidth="1" opacity="0.12" />
                  </svg>
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${credColors[c.credibility]}`}><Shield className="w-3 h-3 inline mr-1" />{c.credibility}</span>
                  </div>
                  <CaseTypeIcon type={c.type} color={hex} size={72} className="relative drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-wider text-gray-400">{typeLabels[c.type]}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-aurora-cyan">{c.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date.split('-')[0]}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.country}</span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3">{c.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {c.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{t}</span>)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}