import { useState } from 'react';
import { Search } from 'lucide-react';
import { ufoCases } from '../data/cases';
import ExpedienteCard from '../components/ExpedienteCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Expedientes() {
  useDocumentTitle('Expedientes');
  const [query, setQuery] = useState('');
  const filtered = ufoCases.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()));

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
          {filtered.map((c) => <ExpedienteCard key={c.id} c={c} />)}
        </div>
      </div>
    </div>
  );
}