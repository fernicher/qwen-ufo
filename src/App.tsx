import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';

/**
 * La portada va en el paquete inicial porque es la puerta de entrada; el resto
 * se carga al navegar. Así quien sólo abre la portada no se descarga Leaflet ni
 * las once páginas enteras.
 */
const Noticias = lazy(() => import('./pages/Noticias'));
const Canales = lazy(() => import('./pages/Canales'));
const Catalogo = lazy(() => import('./pages/Catalogo'));
const Mapa = lazy(() => import('./pages/Mapa'));
const Expedientes = lazy(() => import('./pages/Expedientes'));
const ExpedienteDetail = lazy(() => import('./pages/ExpedienteDetail'));
const Biblioteca = lazy(() => import('./pages/Biblioteca'));
const Investigadores = lazy(() => import('./pages/Investigadores'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Favoritos = lazy(() => import('./pages/Favoritos'));
const InvestigadorDetail = lazy(() => import('./pages/InvestigadorDetail'));
const EscalaHynek = lazy(() => import('./pages/EscalaHynek'));
const Reportar = lazy(() => import('./pages/Reportar'));

/** Marcador mientras llega el trozo de la página, en el estilo del sitio. */
function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Cargando…</span>
      <span className="w-10 h-10 rounded-full border-2 border-aurora-cyan/25 border-t-aurora-cyan animate-spin" aria-hidden="true" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/expedientes" element={<Expedientes />} />
            <Route path="/expedientes/:id" element={<ExpedienteDetail />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/canales" element={<Canales />} />
            <Route path="/investigadores" element={<Investigadores />} />
            <Route path="/investigadores/:id" element={<InvestigadorDetail />} />
            <Route path="/escala-hynek" element={<EscalaHynek />} />
            <Route path="/reportar" element={<Reportar />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
