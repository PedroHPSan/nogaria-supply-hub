
import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplet, 
  Sparkles, 
  HardHat, 
  Utensils, 
  Package, 
  FileText, 
  Briefcase, 
  Monitor 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const CategoriesGrid = () => {
  const navigate = useNavigate();

  // Fetch categories and product counts
  const { data: categoriesData } = useQuery({
    queryKey: ['categories-with-counts'],
    queryFn: async () => {
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name, slug, description, image_url')
        .order('name');
      
      if (!categories) return [];
      
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('in_stock', true);
          
          return {
            ...category,
            productCount: count || 0
          };
        })
      );
      
      return categoriesWithCounts;
    },
  });

  // Icon mapping for categories (fallback icons)
  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('limpeza') || name.includes('cleaning')) return Droplet;
    if (name.includes('higiene') || name.includes('hygiene')) return Sparkles;
    if (name.includes('epi') || name.includes('proteção')) return HardHat;
    if (name.includes('descartáveis') || name.includes('disposable')) return Utensils;
    if (name.includes('plásticos') || name.includes('plastic')) return Package;
    if (name.includes('papelaria') || name.includes('stationery')) return FileText;
    if (name.includes('escritório') || name.includes('office')) return Briefcase;
    if (name.includes('informática') || name.includes('ti') || name.includes('it')) return Monitor;
    return Package; // Default icon
  };

  const getGradientForIndex = (index: number) => {
    const gradients = [
      'from-azure to-sky-blue',
      'from-sky-blue to-grass-green',
      'from-deep-blue to-azure',
      'from-grass-green to-neon-green',
      'from-azure to-deep-blue',
      'from-neon-green to-grass-green',
      'from-deep-blue to-sky-blue',
      'from-sky-blue to-azure'
    ];
    return gradients[index % gradients.length];
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/catalog/${slug}`);
  };

  if (!categoriesData) {
    return (
      <section id="categorias" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-grass-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando categorias...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categorias" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-navy mb-4">
            Encontre tudo em um só lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todas as categorias que sua empresa precisa em uma plataforma integrada
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => {
            const IconComponent = getIconForCategory(category.name);
            const gradient = getGradientForIndex(index);
            
            return (
              <Card 
                key={category.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {category.image_url ? (
                      <img 
                        src={category.image_url} 
                        alt={category.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <IconComponent className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-dark-navy mb-2 group-hover:text-azure transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {category.productCount > 0 ? `${category.productCount} produtos` : 'Produtos disponíveis'}
                  </p>
                  
                  {category.description && (
                    <p className="text-gray-600 text-xs mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/catalog')}
            className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Ver todas as categorias
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
