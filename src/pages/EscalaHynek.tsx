import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { ufoCases } from '../data/cases';
import type { HynekScale } from '../data/cases';
import { HYNEK_ORDER, hynekMeta } from '../data/hynek';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';

export default function EscalaHynek() {
  useDocumentTitle('La escala de Hynek — Cómo se clasifican los encuentros');

  // Cada nivel se ilustra con los casos del propio archivo, no con ejemplos sueltos
  const casesByLevel = useMemo(() => {
    const map = {} as Record<HynekScale, typeof ufoCases>;
    HYNEK_ORDER.forEach((level) => {
      map[level] = ufoCases.filter((c) => c.hynek === level);
    });
    return map;
  }, []);

  const clasificados = ufoCases.filter((c) => c.hynek).length;

  return (
    <div className="min-h-screen">
      <PageHero
        scene="hynek"
        accent="#34d399"
        badge="Cómo se clasifica"
        title={<>La escala de <span className="text-[#34d399]">Hynek</span></>}
        subtitle="El astrónomo J. Allen Hynek ordenó los encuentros según la distancia y el tipo de interacción. Es la clasificación que usa este archivo."
      />

      <div className="px-4 pb-12 pt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 mb-10">
            <p className="text-gray-300 leading-relaxed">
              Hynek fue consultor científico del Proyecto Blue Book de la Fuerza Aérea estadounidense y llegó al tema
              como escéptico. Su clasificación, publicada en 1972, separó por primera vez los avistamientos lejanos de
              los encuentros a corta distancia, y sirve para comparar casos sin entrar a discutir su origen. Los niveles
              cuarto y quinto se añadieron después, ya fuera de su propuesta original.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {clasificados} de los {ufoCases.length} casos del archivo tienen nivel asignado. El resto son avistamientos
              a distancia, detecciones de radar o episodios cuya descripción no permite clasificarlos con rigor.
            </p>
          </div>

          <ol className="space-y-6">
            {HYNEK_ORDER.map((level, i) => {
              const meta = hynekMeta[level];
              const ejemplos = casesByLevel[level];
              return (
                <li
                  key={level}
                  className="relative bg-aurora-charcoal/60 border border-white/5 rounded-2xl p-6 transition-colors hover:border-white/15"
                  style={{ borderLeft: `3px solid ${meta.color}` }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full border"
                      style={{ color: meta.color, borderColor: `${meta.color}66`, background: `${meta.color}1a` }}
                    >
                      {meta.label}
                    </span>
                    <h2 className="font-display font-bold text-xl text-white">{meta.name}</h2>
                    <span className="text-xs text-gray-500 ml-auto">
                      {ejemplos.length === 0
                        ? 'sin casos en el archivo'
                        : `${ejemplos.length} caso${ejemplos.length === 1 ? '' : 's'}`}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">{meta.description}</p>

                  {ejemplos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ejemplos.map((c) => (
                        <Link
                          key={c.id}
                          to={`/expedientes/${c.id}`}
                          className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:text-white hover:border-white/25 transition-colors"
                        >
                          <FileText className="w-3 h-3" style={{ color: meta.color }} /> {c.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {i === HYNEK_ORDER.length - 1 && (
                    <p className="text-xs text-gray-500 mt-4 border-t border-white/5 pt-4">
                      Este último nivel no forma parte de la escala de Hynek: es una categoría propia de este archivo
                      para agrupar las leyendas de ciudades intraterrenas, que se documentan como folclore y no como
                      avistamientos.
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/expedientes"
              className="px-6 py-3 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              Ver todos los expedientes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/investigadores?highlight=hynek"
              className="px-6 py-3 bg-white/5 border border-white/10 text-gray-200 font-display font-semibold rounded-xl hover:border-white/25 transition-colors"
            >
              Quién fue Hynek
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
