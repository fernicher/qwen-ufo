import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

/**
 * Red de seguridad para una ruta: si un componente lanza durante el render, la
 * web entera se quedaba en blanco. Aquí se muestra un aviso en el estilo del
 * sitio y se deja recargar. La `key` del boundary es la ruta, así que navegar
 * a otra página lo reinicia solo.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error de render:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div role="alert" className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-aurora-charcoal/70 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-aurora-cyan mb-3">Archivo interrumpido</p>
          <h1 className="font-display font-bold text-2xl text-white mb-2">Esta página no pudo cargarse</h1>
          <p className="text-sm text-gray-400 mb-6">
            El fallo está registrado en la consola del navegador. Puedes reintentar o volver a la portada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ error: null })}
              className="px-5 py-2.5 rounded-xl border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
            >
              Reintentar
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black text-sm font-bold hover:brightness-110 transition-all"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    );
  }
}
