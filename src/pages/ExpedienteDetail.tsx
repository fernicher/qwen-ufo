import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Shield, Users, FileText, Sparkles, Clock, Landmark, Download, MonitorPlay, BookOpen } from 'lucide-react';
import { getExpediente } from '../data/expedientes';
import { investigators } from '../data/investigators';
import { ufoCases } from '../data/cases';
import { books } from '../data/books';
import { getExtra } from '../data/expediente-extras';
import CaseTypeIcon from '../components/CaseTypeIcon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWikiPoster } from '../hooks/useWikiPoster';

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
  useDocumentTitle(exp?.title);

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

  const relatedCases = ufoCases
    .filter((c) => c.id !== exp.id && (c.type === exp.type || c.country === exp.country))
    .sort((a, b) => (a.type === exp.type && b.type !== exp.type ? -1 : a.country === exp.country && b.country !== exp.country ? -1 : 0))
    .slice(0, 3);

  const extra = getExtra(exp.id);
  const relatedBooks = books.filter((b) => Array.isArray(b.relatedCases) && b.relatedCases.includes(exp.id));

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
          <CaseHero exp={exp} wiki={extra.wiki} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{exp.title}</h1>
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

            <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
              <h2 className="text-xl font-display font-bold mb-3 flex items-center gap-2"><MonitorPlay className="w-5 h-5 text-red-500" /> Videos y documentales</h2>
              <p className="text-sm text-gray-400 mb-4">Documentales, análisis y material de archivo sobre este caso en YouTube.</p>
              <a href={extra.youtubeQuery} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/20">
                <MonitorPlay className="w-4 h-4" /> Ver videos sobre este caso
              </a>
            </section>

            {relatedBooks.length > 0 && (
              <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-amber-400" /> Bibliografía relacionada</h2>
                <div className="space-y-3">
                  {relatedBooks.map((b) => (
                    <a key={b.id} href={b.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <BookOpen className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-amber-400">{b.title}</p>
                        <p className="text-xs text-gray-500">{b.authors.join(', ')} • {b.year}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <Link to="/biblioteca" className="inline-block mt-4 text-xs font-semibold text-amber-400 hover:text-amber-300">Ver toda la biblioteca →</Link>
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
                    <Link key={inv.id} to={`/investigadores?highlight=${inv.id}`} className="block hover:opacity-80">
                      <p className="text-sm font-medium text-white">{inv.name}</p>
                      <p className="text-xs text-gray-500">{inv.specialty}</p>
                    </Link>
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

        {relatedCases.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <h2 className="text-xl font-display font-bold mb-6">Casos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCases.map((c) => (
                <Link key={c.id} to={`/expedientes/${c.id}`} className="flex items-center gap-3 bg-aurora-charcoal/60 border border-white/5 rounded-xl p-4 hover:border-aurora-cyan/30 transition-all">
                  <CaseTypeIcon type={c.type} color={credHex[c.credibility]} size={36} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.date.split('-')[0]} • {c.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseHero({ exp, wiki }: { exp: any; wiki?: string }) {
  const { poster } = useWikiPoster(wiki || '');
  const credHexMap: Record<string, string> = { A: '#22d3ee', B: '#60a5fa', C: '#c084fc' };
  const hex = credHexMap[exp.credibility];
  if (poster) {
    return (
      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
        <img src={poster} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-black via-aurora-black/40 to-transparent" />
      </div>
    );
  }
  return (
    <div
      className="hidden sm:flex shrink-0 w-20 h-20 rounded-2xl items-center justify-center border mb-6"
      style={{ borderColor: `${hex}40`, background: `radial-gradient(circle, ${hex}1a 0%, transparent 70%)` }}
    >
      <CaseTypeIcon type={exp.type} color={hex} size={44} />
    </div>
  );
}
