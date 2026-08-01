import { Heart } from 'lucide-react';
import { useAuroraStore } from '../store/useStore';
import { catalog } from '../data/catalog';
import CatalogCard from '../components/CatalogCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Favoritos() {
  useDocumentTitle('Favoritos');
  const { favorites } = useAuroraStore();
  const favIds = new Set(favorites.map((f: any) => f.id));
  const items = catalog.filter((c) => favIds.has(c.id));

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] text-aurora-cyan uppercase border border-aurora-cyan/30 rounded-full bg-aurora-cyan/5">Tu colección</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Mis <span className="text-aurora-cyan">Favoritos</span></h1>
          <p className="text-gray-400">{items.length === 0 ? 'Todavía no marcaste ningún título' : `${items.length} título${items.length === 1 ? '' : 's'} guardado${items.length === 1 ? '' : 's'}`}</p>
        </div>

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
  );
}
