
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/database';

interface SearchResultsProps {
  results: Product[];
  query: string;
  onClose: () => void;
}

const SearchResults = ({ results, query, onClose }: SearchResultsProps) => {
  const { addToCart } = useCart();

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
        <p className="text-gray-500">Nenhum produto encontrado para "{query}"</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
      <div className="p-4 border-b">
        <p className="text-sm text-gray-600">{results.length} produto(s) encontrado(s) para "{query}"</p>
      </div>
      <div className="p-2">
        {results.slice(0, 5).map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded" />
              ) : (
                <span className="text-xs text-gray-500">IMG</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{product.name}</h4>
              <p className="text-xs text-gray-500 truncate">{product.short_description}</p>
              {product.price && (
                <p className="text-sm font-bold text-grass-green">R$ {product.price.toFixed(2)}</p>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => {
                addToCart({ productId: product.id });
                onClose();
              }}
              className="bg-sky-blue hover:bg-deep-blue text-white"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {results.length > 5 && (
          <div className="p-3 text-center">
            <Button variant="link" onClick={onClose}>
              Ver todos os {results.length} resultados no catálogo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
