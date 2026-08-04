import { Globe2, Users } from 'lucide-react';
import { useVisitorStats } from '../hooks/useVisitorStats';
import VisitorMap from './VisitorMap';

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['es'], { type: 'region' });
  } catch {
    return null;
  }
})();

function countryName(code: string): string {
  try {
    return (regionNames && regionNames.of(code)) || code;
  } catch {
    return code;
  }
}

function flagEmoji(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return '🏳️';
  return code.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function VisitorStats() {
  const { data } = useVisitorStats();

  // Se oculta silenciosamente si el contador no está configurado o aún no hay datos.
  if (!data || !data.configured || data.total <= 0) return null;

  const top = data.countries.slice(0, 6);
  const max = top.length ? top[0].count : 1;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-aurora-charcoal/60 border border-white/10 rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20">
                <Users className="w-5 h-5 text-aurora-cyan" />
              </span>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-white tabular-nums leading-none">
                  {data.total.toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-[0.15em] mt-1">Visitas al archivo</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Globe2 className="w-4 h-4 text-aurora-cyan" /> Desde dónde nos visitan
            </div>
          </div>

          <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
            {/* Mapa de visitantes */}
            <div className="h-72 md:h-80 rounded-2xl overflow-hidden border border-white/10">
              <VisitorMap countries={data.countries} />
            </div>

            {/* Top países */}
            <div className="flex flex-col justify-center">
              {top.length === 0 ? (
                <p className="text-sm text-gray-500">Todavía registrando países…</p>
              ) : (
                <ul className="space-y-2.5">
                  {top.map((c) => (
                    <li key={c.code} className="flex items-center gap-3">
                      <span className="text-lg leading-none w-6 text-center" aria-hidden="true">{flagEmoji(c.code)}</span>
                      <span className="text-sm text-gray-300 w-28 shrink-0 truncate">{countryName(c.code)}</span>
                      <span className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-aurora-cyan to-blue-500"
                          style={{ width: `${Math.max(6, (c.count / max) * 100)}%` }}
                        />
                      </span>
                      <span className="text-xs text-gray-400 tabular-nums w-10 text-right">{c.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
