import { useEffect, useState } from 'react';
import { Users, Check } from 'lucide-react';

/**
 * Opinión de los lectores sobre un expediente.
 *
 * Deliberadamente separada de la clasificación de evidencia (A/B/C), que se
 * asigna por la documentación disponible. Que a mucha gente le convenza un caso
 * no lo vuelve mejor documentado, y el aviso al pie lo dice sin rodeos: si se
 * confunden las dos cosas, el archivo pasa a ser una encuesta de popularidad.
 *
 * El voto se recuerda en el navegador. No es infalible —quien quiera votar dos
 * veces puede— pero alcanza para lo que es: un termómetro, no un referéndum.
 */

const OPCIONES = [
  { id: 'convence', label: 'Me convence', color: '#34d399' },
  { id: 'dudas', label: 'Me deja dudas', color: '#fbbf24' },
  { id: 'terrenal', label: 'Tiene explicación terrenal', color: '#94a3b8' },
] as const;

type OpcionId = (typeof OPCIONES)[number]['id'];
type Votos = Record<OpcionId, number>;

const memoria = (caso: string) => `aurora:voto:${caso}`;

export default function CaseReactions({ caso }: { caso: string }) {
  const [votos, setVotos] = useState<Votos | null>(null);
  const [total, setTotal] = useState(0);
  const [elegido, setElegido] = useState<OpcionId | null>(null);
  const [oculto, setOculto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let vigente = true;
    setElegido(localStorage.getItem(memoria(caso)) as OpcionId | null);

    fetch(`/api/reaccion?caso=${encodeURIComponent(caso)}`)
      .then((r) => r.json())
      .then((j) => {
        if (!vigente) return;
        // Sin Upstash configurado no hay dónde contar: se retira el bloque
        if (j.configured === false) {
          setOculto(true);
          return;
        }
        if (j.votos) {
          setVotos(j.votos);
          setTotal(j.total ?? 0);
        }
      })
      .catch(() => setOculto(true));

    return () => {
      vigente = false;
    };
  }, [caso]);

  async function votar(opcion: OpcionId) {
    if (elegido || enviando) return;
    setEnviando(true);
    // Se marca al instante: si la red falla, el recuento se corrige al recargar
    setElegido(opcion);
    localStorage.setItem(memoria(caso), opcion);
    try {
      const r = await fetch(`/api/reaccion?caso=${encodeURIComponent(caso)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voto: opcion }),
      });
      const j = await r.json();
      if (j.votos) {
        setVotos(j.votos);
        setTotal(j.total ?? 0);
      }
    } catch {
      /* el voto queda marcado en el navegador; el recuento se recupera solo */
    } finally {
      setEnviando(false);
    }
  }

  if (oculto || !votos) return null;

  return (
    <section className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-6">
      <h2 className="text-xl font-display font-bold mb-1 flex items-center gap-2">
        <Users className="w-5 h-5 text-aurora-cyan" /> ¿Qué te parece este caso?
      </h2>
      <p className="text-sm text-gray-400 mb-5">
        {total > 0
          ? `Así lo votaron ${total} ${total === 1 ? 'lector' : 'lectores'}.`
          : 'Todavía no votó nadie. Estrenalo vos.'}
      </p>

      <div className="space-y-2.5">
        {OPCIONES.map((o) => {
          const cuantos = votos[o.id] ?? 0;
          const parte = total > 0 ? Math.round((cuantos / total) * 100) : 0;
          const esMio = elegido === o.id;

          return (
            <button
              key={o.id}
              onClick={() => votar(o.id)}
              disabled={!!elegido}
              aria-pressed={esMio}
              className={`relative w-full overflow-hidden text-left rounded-lg border px-4 py-3 transition-colors ${
                esMio ? 'border-white/25' : 'border-white/10'
              } ${elegido ? 'cursor-default' : 'hover:border-white/30 cursor-pointer'}`}
            >
              {/* Barra de resultados, sólo visible una vez que se votó */}
              {elegido && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 transition-all duration-500"
                  style={{ width: `${parte}%`, background: `${o.color}22` }}
                />
              )}
              <span className="relative flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-gray-200">
                  {esMio && <Check className="w-4 h-4 shrink-0" style={{ color: o.color }} />}
                  {o.label}
                </span>
                {elegido && (
                  <span className="text-sm font-semibold shrink-0" style={{ color: o.color }}>
                    {parte}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-600 mt-4 pt-4 border-t border-white/5">
        Es la opinión de quienes pasan por acá, nada más. No modifica la clasificación de evidencia del
        expediente, que se asigna por la documentación disponible y no por cuánta gente le crea.
      </p>
    </section>
  );
}
