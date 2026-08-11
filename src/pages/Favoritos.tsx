import { Heart } from 'lucide-react';
import { useAuroraStore } from '../store/useStore';
import { catalog } from '../data/catalog';
import CatalogCard from '../components/CatalogCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHero from '../components/PageHero';

export default function Favoritos() {
  useDocumentTitle('Favoritos');
  const { favorites } = useAuroraStore();
  const favIds = new Set(favorites.map((f: any) => f.id));
  const items = catalog.filter((c) => favIds.has(c.id));

  return (
    <div className="min-h-screen">
      <PageHero
        scene="favoritos"
        accent="#f43f5e"
        badge="Tu colección"
        title={<>Mis <span className="text-[#f43f5e]">Favoritos</span></>}
        subtitle={items.length === 0 ? 'Todavía no marcaste ningún título' : `${items.length} título${items.length === 1 ? '' : 's'} guardado${items.length === 1 ? '' : 's'}`}
      />
      <div className="px-4 pb-12 pt-10">
      <div className="max-w-7xl mx-auto">

        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Marcá el corazón en cualquier título del catálogo para verlo acá.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item) => <CatalogCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
