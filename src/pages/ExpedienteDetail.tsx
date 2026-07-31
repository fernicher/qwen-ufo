import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Shield, Users, FileText, Sparkles, Clock, Landmark, Download } from 'lucide-react';
import { getExpediente } from '../data/expedientes';
import { investigators } from '../data/investigators';
import CaseTypeIcon from '../components/CaseTypeIcon';

const credColors: Record<string, string> = {
  A: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
  B: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
  C: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
};

const statusLabels: Record<string, string> = {
  abierto: 'Investigación abierta',
  cerrado: 'Caso cerrado',
  'sin resolver': 'Sin resolver',
  clasificado: 'Clasificado',
};

const probColors: Record<string, string> = {
  alta: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  media: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  baja: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  descartada: 'text-gray-500 border-gray-500/30 bg-gray-500/10',
};

const credHex: Record<string, string> = { A: '#22d3ee', B: '#60a5fa', C: '#c084fc' };

const typeLabels: Record<string, string> = {
  avistamiento: 'Avistamiento',
  aterrizaje: 'Aterrizaje',
  contacto: 'Contacto',
  radar: 'Detección por radar',
  fotografico: 'Registro fotográfico',
};

export default function ExpedienteDetail() {
  const { id } = useParams<{ id: string }>();
  const exp = id ? getExpediente(id) : undefined;

  if (!exp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Expediente no encontrado</h1>
          <Link to="/expedientes" className="text-aurora-cyan">← Volver</Link>
        </div>
      </div>
    );
  }

  const relatedInvestigators = investigators.filter((inv) => exp.relatedInvestigators.includes(inv.id));

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
            <span className={`text-xs font-bold px-3 py-1.5 rounded border ${credColors[exp.credibility]}`}><Shield className="w-3 h-3 inline mr-1" /> Evidencia {exp.credibility}</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded border border-white/10 bg-white/5 text-gray-300">{statusLabels[exp.investigationStatus]}</span>
            <span className="text-xs font-bold px-3 py-1.5 rounded border border-white/10 bg-white/5 text-gray-300">{typeLabels[exp.type]}</span>
          </div>
          <div className="flex items-start gap-5">
            <div
              className="hidden sm:flex shrink-0 w-20 h-20 rounded-2xl items-center justify-center border"
              style={{ borderColor: `${credHex[exp.credibility]}40`, background: `radial-gradient(circle, ${credHex[exp.credibility]}1a 0%, transparent 70%)` }}
            >
              <CaseTypeIcon type={exp.type} color={credHex[exp.credibility]} size={44} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{exp.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-aurora-cyan" />{new Date(exp.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-aurora-cyan" />{exp.location}, {exp.country}</span>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">{exp.fullDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {exp.witnesses.length > 0 && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2"><Users className="w-5 h-5 text-aurora-cyan" /> Testigos</h2>
                <div className="space-y-5">
                  {exp.witnesses.map((w, i) => (
                    <div key={i} className="border-l-2 border-aurora-cyan/30 pl-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{w.name}</span>
                        <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/5 text-gray-400">credibilidad {w.credibility}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{w.role}</p>
                      {w.testimony && <p className="text-sm text-gray-300 leading-relaxed">{w.testimony}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {exp.hypotheses.length > 0 && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2"><Sparkles className="w-5 h-5 text-aurora-cyan" /> Hipótesis</h2>
                <div className="space-y-5">
                  {exp.hypotheses.map((h) => (
                    <div key={h.id} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-white">{h.title}</h3>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${probColors[h.probability]}`}>Probabilidad {h.probability}</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed mb-3">{h.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-emerald-400 font-semibold mb-1">A favor</p>
                          <ul className="space-y-1 text-gray-400">{h.evidence.map((e, i) => <li key={i}>• {e}</li>)}</ul>
                        </div>
                        <div>
                          <p className="text-orange-400 font-semibold mb-1">En contra</p>
                          <ul className="space-y-1 text-gray-400">{h.counterEvidence.map((e, i) => <li key={i}>• {e}</li>)}</ul>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-3">Fuente: {h.source}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {exp.documents.length > 0 && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2"><FileText className="w-5 h-5 text-aurora-cyan" /> Documentos</h2>
                <div className="space-y-4">
                  {exp.documents.map((d) => (
                    <div key={d.id} className="flex items-start gap-3 border-b border-white/5 last:border-0 pb-4 last:pb-0">
                      <div className="w-9 h-9 shrink-0 rounded-lg bg-aurora-cyan/10 flex items-center justify-center"><Download className="w-4 h-4 text-aurora-cyan" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white">{d.title}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{d.classification}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{d.agency ? `${d.agency} • ` : ''}{new Date(d.date).getFullYear()} • {d.pages} pág.</p>
                        <p className="text-sm text-gray-300">{d.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {exp.timeline.length > 0 && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2"><Clock className="w-5 h-5 text-aurora-cyan" /> Cronología</h2>
                <div className="space-y-4">
                  {exp.timeline.map((t, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-aurora-cyan mt-1.5" />
                        {i < exp.timeline.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-xs text-aurora-cyan font-semibold mb-0.5">{new Date(t.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        <p className="text-sm text-gray-300">{t.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(exp.officialResponse || exp.culturalImpact) && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-5 flex items-center gap-2"><Landmark className="w-5 h-5 text-aurora-cyan" /> Respuesta oficial e impacto</h2>
                {exp.officialResponse && <p className="text-sm text-gray-300 leading-relaxed mb-4"><span className="text-white font-semibold">Postura oficial: </span>{exp.officialResponse}</p>}
                {exp.culturalImpact && <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white font-semibold">Impacto cultural: </span>{exp.culturalImpact}</p>}
              </section>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-display font-bold mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((t) => <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">{t}</span>)}
              </div>
            </div>

            {relatedInvestigators.length > 0 && (
              <div className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-display font-bold mb-4">Investigadores relacionados</h3>
                <div className="space-y-3">
                  {relatedInvestigators.map((inv) => (
                    <div key={inv.id}>
                      <p className="text-sm font-medium text-white">{inv.name}</p>
                      <p className="text-xs text-gray-500">{inv.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to={`/mapa?case=${exp.id}`} className="block w-full bg-aurora-cyan/10 border border-aurora-cyan/30 rounded-xl p-4 text-center hover:bg-aurora-cyan/20">
              <MapPin className="w-5 h-5 text-aurora-cyan mx-auto mb-2" />
              <span className="text-sm font-semibold text-aurora-cyan">Ver en el Mapa Global</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
