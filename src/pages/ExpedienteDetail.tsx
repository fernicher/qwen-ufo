import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Shield, Users } from 'lucide-react';
import { ufoCases } from '../data/cases';

export default function ExpedienteDetail() {
  const { id } = useParams<{ id: string }>();
  const caseData = ufoCases.find(c => c.id === id);

  if (!caseData) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-display font-bold mb-4">Expediente no encontrado</h1><Link to="/expedientes" className="text-aurora-cyan">← Volver</Link></div></div>;

  const credColors: any = { A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10', B: 'text-blue-400 border-blue-400/40 bg-blue-400/10', C: 'text-purple-400 border-purple-400/40 bg-purple-400/10' };

  return (
    <div className="min-h-screen">
      <div className="sticky top-16 z-40 bg-aurora-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/expedientes" className="flex items-center gap-2 text-sm text-gray-400 hover:text-aurora-cyan"><ArrowLeft className="w-4 h-4" /> Volver</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1.5 rounded border ${credColors[caseData.credibility]}`}><Shield className="w-3 h-3 inline mr-1" /> Evidencia {caseData.credibility}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{caseData.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-aurora-cyan" />{new Date(caseData.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" />{caseData.location}, {caseData.country}</span>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">{caseData.description}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-aurora-cyan" /> Análisis del Caso</h2>
              <p className="text-gray-300 leading-relaxed">Este caso representa uno de los eventos más documentados en la historia del fenómeno UAP. La evidencia recopilada incluye múltiples testimonios independientes, datos de radar y documentación oficial.</p>
            </div>
          </div>
          <div>
            <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-display font-bold mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {caseData.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{t}</span>)}
              </div>
            </div>
            <Link to={`/mapa?case=${caseData.id}`} className="block mt-4 w-full bg-aurora-cyan/10 border border-aurora-cyan/30 rounded-xl p-4 text-center hover:bg-aurora-cyan/20">
              <MapPin className="w-5 h-5 text-aurora-cyan mx-auto mb-2" />
              <span className="text-sm font-semibold text-aurora-cyan">Ver en el Mapa Global</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}