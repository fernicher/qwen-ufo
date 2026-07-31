import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Mapa from './pages/Mapa';
import Expedientes from './pages/Expedientes';
import ExpedienteDetail from './pages/ExpedienteDetail';
import Biblioteca from './pages/Biblioteca';
import Investigadores from './pages/Investigadores';
import Timeline from './pages/Timeline';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/expedientes" element={<Expedientes />} />
          <Route path="/expedientes/:id" element={<ExpedienteDetail />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/investigadores" element={<Investigadores />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;