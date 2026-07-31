import Hero from '../components/Hero';
import CollectionCarousel from '../components/CollectionCarousel';
import TimelinePreview from '../components/TimelinePreview';
import InvestigatorsPreview from '../components/InvestigatorsPreview';
import { collections, featuredCollections } from '../data/collections';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Hero />
      <CollectionCarousel collections={featuredCollections} title="Colecciones Destacadas" />
      <CollectionCarousel collections={collections.filter((c) => !c.featured)} title="Explorar por Temática" />
      <TimelinePreview />
      <InvestigatorsPreview />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-aurora-charcoal/60 border border-white/10 rounded-3xl p-10 md:p-16">
            <Shield className="w-12 h-12 text-aurora-cyan mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">El archivo crece cada día</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">Nuevos casos, documentales y avistamientos se añaden continuamente.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/catalogo" className="px-8 py-4 bg-aurora-cyan text-aurora-black font-display font-bold rounded-xl hover:bg-aurora-cyanGlow flex items-center gap-2">Explorar Catálogo <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/mapa" className="px-8 py-4 bg-white/5 text-white font-display font-semibold rounded-xl border border-white/10 hover:border-aurora-cyan/50">Ver Mapa Global</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}