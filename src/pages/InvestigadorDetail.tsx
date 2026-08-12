import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Globe, BookOpen, Award, FileText, Users } from 'lucide-react';
import { getInvestigator, credStyles, credLabels } from '../data/investigators';
import { casesByInvestigator } from '../data/expedientes';
import { useWikiPoster } from '../hooks/useWikiPoster';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function InvestigadorDetail() {
  const { id } = useParams<{ id: string }>();
  const inv = getInvestigator(id || '');
  useDocumentTitle(inv ? `${inv.name} — Investigadores` : 'Investigador no encontrado');
  const { poster } = useWikiPoster(inv?.wiki || '');

  if (!inv) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Users className="w-12 h-12 text-gray-600" />
        <h1 className="text-2xl font-display font-bold text-white">Ese investigador no está en el archivo</h1>
        <Link to="/investigadores" className="text-aurora-cyan hover:text-aurora-cyanGlow font-semibold">
          Ver todos los investigadores
        </Link>
      </div>
    );
  }

  const cases = casesByInvestigator(inv.id);
  const cred = credStyles[inv.credibility] || 'text-gray-400 border-gray-400/40 bg-gray-400/10';
  const initials = inv.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/investigadores" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-aurora-cyan mb-8">
          <ArrowLeft className="w-4 h-4" /> Volver a investigadores
        </Link>

        <header className="flex flex-col sm:flex-row items-start gap-6 mb-10">
          <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-aurora-cyan/20 to-blue-600/20 border border-aurora-cyan/20 flex items-center justify-center">
            {poster ? (
              <img src={poster} alt={inv.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-display font-bold text-aurora-cyan">{initials}</span>
            )}
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border mb-3 ${cred}`}>
              <Award className="w-3 h-3" /> {credLabels[inv.credibility] || inv.credibility}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{inv.name}</h1>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <Globe className="w-4 h-4 text-aurora-cyan" /> {inv.country}
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-aurora-cyan/80 mt-3">{inv.specialty}</p>
          </div>
        </header>

        <section className="bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 mb-6">
          <p className="text-gray-200 leading-relaxed">{inv.bio}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display font-bold text-lg text-white mb-4">
              <BookOpen className="w-5 h-5 text-aurora-cyan" /> Obras
            </h2>
            <ul className="space-y-2">
              {inv.works.map((w) => (
                <li key={w} className="text-sm text-gray-300 border-l-2 border-aurora-cyan/30 pl-3">{w}</li>
              ))}
            </ul>
          </section>

          <section className="bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display font-bold text-lg text-white mb-4">
              <FileText className="w-5 h-5 text-aurora-cyan" /> Casos en el archivo
            </h2>
            {cases.length === 0 ? (
              <p className="text-sm text-gray-500">Todavía no hay expedientes que lo referencien.</p>
            ) : (
              <ul className="space-y-2">
                {cases.map((c) => (
                  <li key={c.id}>
                    <Link to={`/expedientes/${c.id}`} className="text-sm text-gray-300 hover:text-aurora-cyan flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gray-600 shrink-0" /> {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
