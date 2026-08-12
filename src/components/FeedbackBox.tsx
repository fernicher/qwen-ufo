import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquarePlus, Send, Check, X, Loader2 } from 'lucide-react';

/**
 * Buzón de sugerencias. Lo que se envía llega al mantenedor del archivo y no se
 * publica en el sitio: no hay moderación pública que hacer ni spam a la vista.
 *
 * Se muestra plegado en una sola línea y sólo ocupa sitio cuando alguien lo abre.
 * Si la función serverless no está configurada, el bloque entero desaparece.
 */

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

export default function FeedbackBox() {
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState(''); // campo trampa para bots
  const [estado, setEstado] = useState<Estado>('idle');
  const [error, setError] = useState('');
  const [oculto, setOculto] = useState(false);

  if (oculto) return null;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (mensaje.trim().length < 4) return;
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, email, web, pagina: location.pathname }),
      });
      const j = await r.json().catch(() => ({}));

      // Sin Upstash configurado no hay dónde guardar: se retira el bloque
      if (j.configured === false) {
        setOculto(true);
        return;
      }
      if (!r.ok || j.error) {
        setEstado('error');
        setError(j.error || 'No se pudo enviar. Inténtalo más tarde.');
        return;
      }
      setEstado('enviado');
      setMensaje('');
      setEmail('');
    } catch {
      setEstado('error');
      setError('No se pudo enviar. Revisa tu conexión.');
    }
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-aurora-cyan border border-white/10 hover:border-aurora-cyan/40 rounded-full px-4 py-2 transition-colors"
      >
        <MessageSquarePlus className="w-4 h-4" /> ¿Qué mejorarías del archivo?
      </button>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-left bg-aurora-charcoal/60 border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="font-display font-bold text-white">Cuéntame qué te parece</h2>
          <p className="text-xs text-gray-500 mt-1">
            Qué te gustó, qué no, qué caso falta. Llega directo a quien mantiene el archivo y no se publica.
          </p>
        </div>
        <button
          onClick={() => { setAbierto(false); setEstado('idle'); }}
          className="shrink-0 p-1 text-gray-500 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {estado === 'enviado' ? (
        <div className="flex items-center gap-3 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-4">
          <Check className="w-5 h-5 shrink-0" />
          <p>Recibido, gracias. Se lee todo, aunque no siempre haya respuesta.</p>
        </div>
      ) : (
        <form onSubmit={enviar} className="space-y-3">
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            maxLength={1000}
            rows={4}
            required
            placeholder="Me faltó el caso de… / La sección X se entiende mal en el móvil…"
            className="w-full bg-aurora-black/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-aurora-cyan/50 resize-y"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={120}
            placeholder="Tu correo (opcional, sólo si quieres respuesta)"
            className="w-full bg-aurora-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-aurora-cyan/50"
          />

          {/* Trampa para bots: invisible y fuera del recorrido del teclado */}
          <input
            type="text"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {estado === 'error' && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-gray-600">{mensaje.length}/1000</span>
            <button
              type="submit"
              disabled={estado === 'enviando' || mensaje.trim().length < 4}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {estado === 'enviando' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
