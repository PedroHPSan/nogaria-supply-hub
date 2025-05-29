
import { useState, useMemo } from 'react';
import { useProducts } from './useProducts';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products = [], isLoading } = useProducts();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    hasResults: searchResults.length > 0,
    hasQuery: searchQuery.trim().length > 0
  };
}
