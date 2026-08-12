import { ExternalLink, Camera, ClipboardList, EyeOff, Building2 } from 'lucide-react';
import { declassifications } from '../data/declassifications';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';

/** Lo que explica la enorme mayoría de los reportes. Descartarlo primero es lo que da valor al resto. */
const CONFUSIONES = [
  { titulo: 'Satélites Starlink', detalle: 'Una fila de puntos regulares que cruza el cielo en silencio, sobre todo poco después del atardecer.' },
  { titulo: 'Venus y Júpiter', detalle: 'Muy brillantes cerca del horizonte, parecen moverse y cambiar de color por la turbulencia atmosférica.' },
  { titulo: 'Drones', detalle: 'Luces de colores que se detienen, giran en seco y descienden. Cada vez son la explicación más frecuente.' },
  { titulo: 'Globos sonda y linternas', detalle: 'Se desplazan con el viento y suben o bajan sin control aparente.' },
  { titulo: 'Nubes lenticulares', detalle: 'Con forma de disco y bordes limpios, típicas de zonas de montaña.' },
  { titulo: 'Reentradas y meteoros', detalle: 'Un objeto que se fragmenta en varios puntos brillantes y se apaga en segundos.' },
];

const ANOTAR = [
  'Fecha y hora exactas, con la zona horaria.',
  'Lugar desde donde observaste, con coordenadas si puedes.',
  'Hacia dónde mirabas y a qué altura sobre el horizonte.',
  'Cuánto duró, medido y no estimado de memoria.',
  'Trayectoria: recta, en zigzag, estática, en ascenso.',
  'Tamaño aparente comparado con algo conocido: la luna, la uña del pulgar con el brazo extendido.',
  'Color, brillo y si cambiaron durante la observación.',
  'Si hubo sonido, y si algún aparato eléctrico se comportó de forma extraña.',
  'Quién más lo vio y cómo contactarlo.',
  'Estado del cielo: nubes, viento, visibilidad.',
];

const GRABAR = [
  'Apoya el teléfono en algo fijo: el temblor de la mano arruina cualquier análisis posterior.',
  'Incluye en el encuadre una referencia fija —un tejado, un árbol, una antena—. Sin ella no se puede calcular ni tamaño ni distancia.',
  'No uses zoom digital: multiplica el ruido y destruye el detalle real.',
  'Graba en una sola toma larga en vez de varios clips cortos.',
  'Guarda el archivo original sin editar ni recortar, y no lo mandes por mensajería antes de archivarlo: la compresión borra información.',
  'Anota qué dispositivo usaste.',
];

export default function Reportar() {
  useDocumentTitle('Cómo reportar un avistamiento');

  return (
    <div className="min-h-screen">
      <PageHero
        scene="reportar"
        accent="#34d399"
        badge="Guía práctica"
        title={<>Cómo reportar un <span className="text-[#34d399]">avistamiento</span></>}
        subtitle="Qué descartar primero, qué anotar mientras ocurre y a qué organismo oficial acudir en cada país."
      />

      <div className="px-4 pb-12 pt-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-2">
              <EyeOff className="w-6 h-6 text-[#34d399]" /> Primero, descarta lo evidente
            </h2>
            <p className="text-gray-400 mb-6">
              Casi todo lo que se reporta tiene explicación conocida. Descartarla no le resta interés a tu observación:
              es justamente lo que hace creíble al puñado de casos que no encajan en ninguna de estas categorías.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {CONFUSIONES.map((c) => (
                <div key={c.titulo} className="bg-aurora-charcoal/60 border border-white/5 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-1">{c.titulo}</h3>
                  <p className="text-sm text-gray-400">{c.detalle}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-2">
              <ClipboardList className="w-6 h-6 text-[#34d399]" /> Qué anotar mientras ocurre
            </h2>
            <p className="text-gray-400 mb-6">
              La memoria se reordena sola en cuestión de minutos. Todo lo que puedas escribir en el momento vale más
              que cualquier reconstrucción posterior.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {ANOTAR.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-2">
              <Camera className="w-6 h-6 text-[#34d399]" /> Si vas a grabar
            </h2>
            <p className="text-gray-400 mb-6">
              La mayoría de los videos que circulan son inservibles por motivos técnicos, no por lo que muestran.
              Estas seis cosas marcan la diferencia entre un registro analizable y una mancha luminosa.
            </p>
            <ul className="space-y-3">
              {GRABAR.map((item, i) => (
                <li key={item} className="flex gap-4 bg-aurora-charcoal/60 border border-white/5 rounded-xl p-4">
                  <span className="font-display font-bold text-[#34d399] shrink-0">{i + 1}</span>
                  <p className="text-sm text-gray-300">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-2">
              <Building2 className="w-6 h-6 text-[#34d399]" /> Dónde reportarlo
            </h2>
            <p className="text-gray-400 mb-6">
              Organismos oficiales que investigan el fenómeno, con su punto de entrada público. No todos admiten
              denuncias de particulares: algunos sólo publican los casos que investigan por vía militar o aeronáutica.
              Si el tuyo no está en la lista, la autoridad aeronáutica civil de tu país es el primer sitio al que acudir.
            </p>
            <div className="space-y-3">
              {declassifications.map((d) => (
                <a
                  key={d.id}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-aurora-charcoal/60 border border-white/5 rounded-xl p-4 hover:border-[#34d399]/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#34d399]">{d.country}</span>
                      <span className="text-xs text-gray-500">{d.period}</span>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-[#34d399] transition-colors">{d.agency}</h3>
                    <p className="text-sm text-gray-400 mt-1">{d.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#34d399] shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </section>

          <p className="text-xs text-gray-600 border-t border-white/5 pt-6">
            Este archivo no recibe denuncias ni las traslada a ningún organismo. La guía es orientativa: los canales
            oficiales y sus requisitos cambian, así que confirma siempre en el sitio del organismo antes de enviar nada.
          </p>
        </div>
      </div>
    </div>
  );
}
