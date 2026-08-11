import { useState } from 'react';
import { Search } from 'lucide-react';
import { ufoCases } from '../data/cases';
import ExpedienteCard from '../components/ExpedienteCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';

export default function Expedientes() {
  useDocumentTitle('Expedientes');
  const [query, setQuery] = useState('');
  const filtered = ufoCases.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen">
      <PageHero
        scene="expedientes"
        accent="#fbbf24"
        badge="Archivo de Casos"
        title={<>Expedientes <span className="text-[#fbbf24]">Desclasificados</span></>}
        subtitle="Investigaciones detalladas de los casos más significativos"
      />
      <div className="px-4 pb-12 pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." className="w-full bg-aurora-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-aurora-cyan/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => <ExpedienteCard key={c.id} c={c} />)}
        </div>
      </div>
      </div>
    </div>
  );
}