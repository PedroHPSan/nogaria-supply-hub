
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/database';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useCategoriesWithProductCount() {
  return useQuery({
    queryKey: ['categories-with-product-count'],
    queryFn: async () => {
      // Get categories
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;

      // Get product counts for each category
      const categoriesWithCounts = await Promise.all(
        (categories || []).map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);
          
          return {
            ...category,
            product_count: count || 0
          };
        })
      );

      return categoriesWithCounts;
    },
  });
}
