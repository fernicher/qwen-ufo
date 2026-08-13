import { useState } from 'react';
import { Send, Check, Loader2, ShieldAlert } from 'lucide-react';

/**
 * Formulario para que quien vio algo lo cuente.
 *
 * Nada de lo que llega se publica solo: queda guardado a la espera de que
 * alguien lo lea y lo contraste. Un testimonio sin verificar no es un
 * expediente, y mezclarlos costaría la credibilidad del archivo entero, así que
 * el texto de la página lo dice tantas veces como haga falta.
 *
 * Tampoco se suben archivos: sólo un enlace al video o la foto. Alojar material
 * ajeno traería moderación, almacenamiento y responsabilidad legal que este
 * proyecto no puede sostener.
 */

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

const VACIO = {
  fecha: '',
  hora: '',
  lugar: '',
  duracion: '',
  descripcion: '',
  movimiento: '',
  testigos: '',
  descartado: '',
  enlace: '',
  alias: '',
  email: '',
  web: '', // campo trampa para bots
};

type Campos = typeof VACIO;

const MIN_RELATO = 30;
const MAX_RELATO = 4000;

const campoBase =
  'w-full bg-aurora-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#34d399]/60 transition-colors';

function Etiqueta({ children, opcional }: { children: React.ReactNode; opcional?: boolean }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
      {children}
      {opcional && <span className="ml-2 normal-case tracking-normal font-normal text-gray-600">opcional</span>}
    </span>
  );
}

export default function SightingForm() {
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [consentimiento, setConsentimiento] = useState(false);
  const [estado, setEstado] = useState<Estado>('idle');
  const [error, setError] = useState('');
  const [oculto, setOculto] = useState(false);

  const set = (campo: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCampos((prev) => ({ ...prev, [campo]: e.target.value }));

  if (oculto) return null;

  const relato = campos.descripcion.trim().length;
  const listo = relato >= MIN_RELATO && campos.lugar.trim().length > 1 && campos.fecha !== '' && consentimiento;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/avistamiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...campos, consentimiento }),
      });
      const j = await r.json().catch(() => ({}));

      // Sin Upstash configurado no hay dónde guardar: se retira el bloque entero
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
      setCampos(VACIO);
      setConsentimiento(false);
    } catch {
      setEstado('error');
      setError('No se pudo enviar. Revisa tu conexión.');
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="bg-[#34d399]/10 border border-[#34d399]/30 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 font-display font-bold text-white mb-2">
          <Check className="w-5 h-5 text-[#34d399]" /> Relato recibido
        </h3>
        <p className="text-sm text-gray-300">
          Queda en espera de revisión. Se lee todo, se contrasta con registros de tráfico aéreo, efemérides y
          lanzamientos, y sólo entonces se decide si se publica. Puede llevar tiempo y puede que nunca se publique:
          eso no significa que no te creamos, sino que sin poder verificarlo no entra al archivo.
        </p>
        <button
          onClick={() => setEstado('idle')}
          className="mt-4 text-sm text-[#34d399] hover:underline"
        >
          Enviar otro avistamiento
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="bg-aurora-charcoal/60 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <Etiqueta>Fecha</Etiqueta>
          <input
            type="date"
            value={campos.fecha}
            onChange={set('fecha')}
            max={new Date().toISOString().slice(0, 10)}
            min="1900-01-01"
            required
            className={campoBase}
          />
        </label>
        <label className="block">
          <Etiqueta opcional>Hora</Etiqueta>
          <input type="time" value={campos.hora} onChange={set('hora')} className={campoBase} />
        </label>
        <label className="block">
          <Etiqueta opcional>Cuánto duró</Etiqueta>
          <input
            type="text"
            value={campos.duracion}
            onChange={set('duracion')}
            maxLength={80}
            placeholder="unos 4 minutos"
            className={campoBase}
          />
        </label>
      </div>

      <label className="block">
        <Etiqueta>Lugar desde donde observaste</Etiqueta>
        <input
          type="text"
          value={campos.lugar}
          onChange={set('lugar')}
          maxLength={160}
          required
          placeholder="Capilla del Monte, Córdoba, Argentina — o las coordenadas si las tienes"
          className={campoBase}
        />
      </label>

      <label className="block">
        <Etiqueta>Qué viste</Etiqueta>
        <textarea
          value={campos.descripcion}
          onChange={set('descripcion')}
          maxLength={MAX_RELATO}
          rows={6}
          required
          placeholder="Forma, color, brillo, hacia dónde mirabas, a qué altura sobre el horizonte, tamaño aparente comparado con la luna, si hubo sonido, cómo estaba el cielo…"
          className={`${campoBase} resize-y`}
        />
        <span className="block text-right text-xs text-gray-600 mt-1">
          {relato < MIN_RELATO ? `faltan ${MIN_RELATO - relato} caracteres` : `${relato}/${MAX_RELATO}`}
        </span>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <Etiqueta opcional>Cómo se movía</Etiqueta>
          <input
            type="text"
            value={campos.movimiento}
            onChange={set('movimiento')}
            maxLength={300}
            placeholder="recto, en zigzag, estático, ascenso vertical"
            className={campoBase}
          />
        </label>
        <label className="block">
          <Etiqueta opcional>Quién más lo vio</Etiqueta>
          <input
            type="text"
            value={campos.testigos}
            onChange={set('testigos')}
            maxLength={300}
            placeholder="dos vecinos, mi hermano"
            className={campoBase}
          />
        </label>
      </div>

      <label className="block">
        <Etiqueta opcional>Qué ya descartaste</Etiqueta>
        <textarea
          value={campos.descartado}
          onChange={set('descartado')}
          maxLength={1000}
          rows={2}
          placeholder="No era un avión: no tenía luces de posición ni hacía ruido. Tampoco coincide con el paso de Starlink de esa noche."
          className={`${campoBase} resize-y`}
        />
        <span className="block text-xs text-gray-600 mt-1">
          Es la parte que más peso le da a un relato. Revisa antes la lista de confusiones de arriba.
        </span>
      </label>

      <label className="block">
        <Etiqueta opcional>Enlace al video o la foto</Etiqueta>
        <input
          type="url"
          value={campos.enlace}
          onChange={set('enlace')}
          maxLength={300}
          placeholder="https://…"
          className={campoBase}
        />
        <span className="block text-xs text-gray-600 mt-1">
          No se suben archivos: súbelo donde prefieras y pega aquí la dirección. Conserva siempre el original sin
          editar.
        </span>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <Etiqueta opcional>Cómo quieres figurar</Etiqueta>
          <input
            type="text"
            value={campos.alias}
            onChange={set('alias')}
            maxLength={60}
            placeholder="Marcelo R., o déjalo vacío para anónimo"
            className={campoBase}
          />
        </label>
        <label className="block">
          <Etiqueta opcional>Tu correo</Etiqueta>
          <input
            type="email"
            value={campos.email}
            onChange={set('email')}
            maxLength={120}
            placeholder="sólo para repreguntarte"
            className={campoBase}
          />
          <span className="block text-xs text-gray-600 mt-1">Nunca se publica.</span>
        </label>
      </div>

      {/* Trampa para bots: invisible y fuera del recorrido del teclado */}
      <input
        type="text"
        value={campos.web}
        onChange={set('web')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex items-start gap-3 bg-aurora-black/40 border border-white/10 rounded-xl p-4 cursor-pointer">
        <input
          type="checkbox"
          checked={consentimiento}
          onChange={(e) => setConsentimiento(e.target.checked)}
          required
          className="mt-0.5 w-4 h-4 shrink-0 accent-[#34d399]"
        />
        <span className="text-sm text-gray-300">
          Autorizo a publicar este relato en el archivo, con el nombre que indiqué arriba o de forma anónima, y
          entiendo que se publicará marcado como <strong className="text-white">testimonio sin verificar</strong>.
          Mi correo no se publica.
        </span>
      </label>

      {estado === 'error' && (
        <p className="flex items-start gap-2 text-sm text-red-400">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!listo || estado === 'enviando'}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#34d399] text-aurora-black font-display font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {estado === 'enviando' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Enviar mi avistamiento
      </button>
    </form>
  );
}
