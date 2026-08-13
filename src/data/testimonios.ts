/**
 * Testimonios enviados por el público y aceptados para publicar.
 *
 * ESTO NO SON EXPEDIENTES. Un expediente tiene documentación de respaldo:
 * informes oficiales, radar, prensa de la época, investigación de terceros. Un
 * testimonio es lo que alguien dice haber visto, y nada más. Se publican porque
 * el volumen y la coincidencia entre relatos tienen valor, no porque estén
 * comprobados. Por eso viven en su propia página, se ven distintos y llevan la
 * marca de "sin verificar" encima.
 *
 * Si alguna vez un testimonio consigue respaldo documental, deja de ser un
 * testimonio: se convierte en expediente y se pasa a `cases.ts`.
 *
 * ── Cómo se llena ────────────────────────────────────────────────────────────
 * 1. Los envíos llegan a Upstash vía `api/avistamiento` y quedan pendientes.
 * 2. `npm run avistamientos` los baja y los imprime ya con esta forma.
 * 3. Se pega aquí lo que se decide publicar, se recorta el relato si hace falta
 *    y se escribe la `nota` con lo que se comprobó. Sin `nota` no se publica:
 *    es la parte que distingue a un archivo de un muro de mensajes.
 *
 * Mientras este array esté vacío, la página `/testimonios` no existe: no
 * aparece en el menú, ni en el sitemap, ni responde la ruta.
 */

export interface Testimonio {
  /** Slug estable: lugar y fecha. Se usa como ancla para compartir el relato. */
  id: string;
  /** Fecha del avistamiento, YYYY-MM-DD. */
  fecha: string;
  /** Hora local, HH:MM. Opcional porque mucha gente no la recuerda. */
  hora?: string;
  /** Lugar tal como lo describió quien envió el relato. */
  lugar: string;
  pais?: string;
  duracion?: string;
  /** El relato, ya revisado. Los saltos de línea se respetan al mostrarlo. */
  relato: string;
  movimiento?: string;
  testigos?: string;
  /** Qué dice haber descartado quien lo envió. */
  descartado?: string;
  /** Enlace al video o la foto, si lo aportó. */
  enlace?: string;
  /** Cómo pidió figurar. Sin esto se publica como anónimo. */
  autor?: string;
  /** Fecha en que se publicó en el archivo, YYYY-MM-DD. */
  publicado: string;
  /**
   * Qué se comprobó y qué no. Obligatoria: es lo que convierte un mensaje
   * suelto en material de archivo. Ejemplos de lo que corresponde escribir:
   * "No coincide con ningún paso de Starlink de esa noche ni con tráfico
   * comercial registrado", o directamente "No fue posible verificar nada".
   */
  nota: string;
}

export const testimonios: Testimonio[] = [
  // Ejemplo de la forma que tiene una entrada. Descomentar sólo con un envío real:
  //
  // {
  //   id: 'capilla-del-monte-2024-03',
  //   fecha: '2024-03-15',
  //   hora: '22:40',
  //   lugar: 'Capilla del Monte, Córdoba',
  //   pais: 'Argentina',
  //   duracion: 'unos 4 minutos',
  //   relato: 'Tres luces naranjas en formación triangular sobre el cerro…',
  //   movimiento: 'estáticas y luego ascenso vertical',
  //   testigos: 'dos vecinos',
  //   descartado: 'No había ruido ni luces de posición.',
  //   autor: 'Marcelo R.',
  //   publicado: '2026-08-13',
  //   nota: 'No fue posible verificar. Esa noche no hubo pasos de Starlink visibles desde la zona.',
  // },
];

/** Los más recientes primero: es lo que alguien espera al abrir la página. */
export const testimoniosOrdenados = [...testimonios].sort((a, b) => b.fecha.localeCompare(a.fecha));

/**
 * Interruptor único de toda la sección. Con el array vacío no hay página que
 * mostrar, así que se apagan a la vez la ruta, el enlace del menú, la entrada
 * del sitemap y el aviso de /reportar. Evita publicar una página vacía.
 */
export const hayTestimonios = testimonios.length > 0;
