import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Film, Map, Compass, Book } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import AuroraBackground from './AuroraBackground';
import GlobalSearch from './GlobalSearch';

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/catalogo', label: 'Catálogo', icon: Film },
  { to: '/mapa', label: 'Mapa', icon: Map },
  { to: '/expedientes', label: 'Expedientes', icon: Compass },
  { to: '/biblioteca', label: 'Biblioteca', icon: Book },
];

export default function Layout() {
  const location = useLocation();
  const isMapPage = location.pathname === '/mapa';

  return (
    <div className="relative min-h-screen bg-aurora-black text-white overflow-x-hidden">
      {/* Analytics de Vercel */}
      <Analytics />

      {!isMapPage && <AuroraBackground />}

      {/* ... resto del código del Layout ... */}