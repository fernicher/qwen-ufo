import { Navigate, Link } from 'react-router-dom';
import { Quote, CalendarDays, MapPin, Clock, Timer, Users, Ban, ExternalLink, FileSearch, ShieldQuestion } from 'lucide-react';
import { testimoniosOrdenados, hayTestimonios, type Testimonio } from '../data/testimonios';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';

const ACENTO = '#c4b5fd';

const fechaLarga = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Dato suelto de la ficha. No se dibuja si el relato no lo trae. */
function Dato({ icon: Icon, children }: { icon: typeof MapPin; children?: string }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
      <Icon className="w-3.5 h-3.5 text-gray-600 shrink-0" />
      {children}
    </span>
  );
}

function Tarjeta({ t }: { t: Testimonio }) {
  return (
    <article
      id={t.id}
      className="scroll-mt-24 bg-aurora-charcoal/40 border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* La marca va arriba de todo: nadie debería leer el relato sin verla */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2.5 bg-white/[0.03] border-b border-white/10">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#c4b5fd]">
          <ShieldQuestion className="w-3.5 h-3.5" /> Testimonio sin verificar
        </span>
        <span className="text-[11px] text-gray-600">
          Relato de un particular. No hay documentación que lo respalde.
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="font-display font-bold text-lg text-white">
          {t.lugar}
          {t.pais && <span className="text-gray-500 font-normal">, {t.pais}</span>}
        </h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 mb-5">
          <Dato icon={CalendarDays}>{fechaLarga(t.fecha)}</Dato>
          <Dato icon={Clock}>{t.hora}</Dato>
          <Dato icon={Timer}>{t.duracion}</Dato>
          <Dato icon={Users}>{t.testigos}</Dato>
        </div>

        <blockquote className="relative pl-5 border-l-2 border-[#c4b5fd]/30">
          <Quote className="absolute -left-[9px] -top-1 w-4 h-4 text-[#c4b5fd]/50 bg-aurora-charcoal" />
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{t.relato}</p>
        </blockquote>

        {(t.movimiento || t.descartado) && (
          <dl className="grid sm:grid-cols-2 gap-4 mt-5 text-sm">
            {t.movimiento && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Cómo se movía</dt>
                <dd className="text-gray-400">{t.movimiento}</dd>
              </div>
            )}
            {t.descartado && (
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  <Ban className="w-3.5 h-3.5" /> Lo que dice haber descartado
                </dt>
                <dd className="text-gray-400">{t.descartado}</dd>
              </div>
            )}
          </dl>
        )}

        {/* La nota es lo que separa un archivo de un muro de mensajes */}
        <div className="flex gap-3 mt-5 bg-aurora-black/50 border border-white/10 rounded-xl p-4">
          <FileSearch className="w-4 h-4 text-[#c4b5fd] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Nota del archivo</h3>
            <p className="text-sm text-gray-400">{t.nota}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-white/5">
          <span className="text-xs text-gray-600">
            {t.autor ? `Enviado por ${t.autor}` : 'Enviado de forma anónima'} · Publicado el {fechaLarga(t.publicado)}
          </span>
          {t.enlace && (
            <a
              href={t.enlace}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 text-xs text-[#c4b5fd] hover:underline"
            >
              Material aportado <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Testimonios() {
  useDocumentTitle('Testimonios de avistamientos');

  // Sin relatos publicados la sección no existe. Quien llegue por una URL vieja
  // aterriza donde puede hacer algo útil, en vez de en una página vacía.
  if (!hayTestimonios) return <Navigate to="/reportar" replace />;

  return (
    <div className="min-h-screen">
      <PageHero
        scene="testimonios"
        accent={ACENTO}
        badge="Relatos del público"
        title={<>Testimonios <span className="text-[#c4b5fd]">sin verificar</span></>}
        subtitle="Lo que cuenta la gente que envió su avistamiento al archivo. Publicado tal como llegó, sin comprobar."
      />

      <div className="px-4 pb-12 pt-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#c4b5fd]/[0.07] border border-[#c4b5fd]/25 rounded-2xl p-5 mb-8">
            <h2 className="font-display font-bold text-white mb-2">Esto no son expedientes</h2>
            <p className="text-sm text-gray-400">
              Un <Link to="/expedientes" className="text-[#c4b5fd] hover:underline">expediente</Link> tiene respaldo:
              informes oficiales, registros de radar, prensa de la época, investigación de terceros. Un testimonio es
              lo que alguien dice haber visto, y nada más. Se publican porque la coincidencia entre relatos tiene
              valor por sí misma, no porque estén comprobados. Cada uno lleva una nota con lo que se pudo contrastar,
              que muchas veces es nada.
            </p>
          </div>

          <div className="space-y-6">
            {testimoniosOrdenados.map((t) => (
              <Tarjeta key={t.id} t={t} />
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/5">
            <p className="text-sm text-gray-400">
              ¿Viste algo? Antes de escribir, revisa{' '}
              <Link to="/reportar" className="text-[#c4b5fd] hover:underline">
                qué conviene descartar y qué anotar
              </Link>
              . Los relatos que llegan se leen uno por uno; publicar puede llevar tiempo y no todos se publican.
            </p>
            <p className="text-xs text-gray-600 mt-3">
              Los relatos se editan sólo para corregir ortografía o recortar datos personales. No se corrige el
              contenido de lo que cada persona dice haber visto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
