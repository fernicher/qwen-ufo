import Hero from '../components/Hero';
import NewsFeed from '../components/NewsFeed';
import VisitorStats from '../components/VisitorStats';
import CollectionCarousel from '../components/CollectionCarousel';
import TimelinePreview from '../components/TimelinePreview';
import InvestigatorsPreview from '../components/InvestigatorsPreview';
import { collections, featuredCollections } from '../data/collections';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Project Aurora — Archivo Desclasificado UAP');

  return (
    <div>
      <Hero />
      <CollectionCarousel collections={featuredCollections} title="Colecciones Destacadas" accent="#22d3ee" />
      <NewsFeed />
      <CollectionCarousel collections={collections.filter((c) => !c.featured)} title="Explorar por Temática" accent="#a78bfa" />
      <TimelinePreview />
      <InvestigatorsPreview />
      <VisitorStats />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-aurora-charcoal/60 border border-white/10 rounded-3xl p-10 md:p-16">
            <Shield className="w-12 h-12 text-aurora-cyan mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">El archivo crece cada día</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">Nuevos casos, documentales y avistamientos se añaden continuamente.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/catalogo" className="px-8 py-4 bg-gradient-to-r from-aurora-cyan to-blue-500 text-aurora-black font-display font-bold rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">Explorar Catálogo <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/mapa" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-display font-bold rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:brightness-110 active:scale-95 transition-all">Ver Mapa Global</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
