
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import ProductImageGallery from '@/components/ProductImageGallery';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<{
    images: string[];
    name: string;
  } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  const navigate = useNavigate();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { addToCart, cartCount } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = !localSearchTerm || 
      product.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(localSearchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
    
    const matchesPrice = (!priceRange.min || (product.price && product.price >= parseFloat(priceRange.min))) &&
                        (!priceRange.max || (product.price && product.price <= parseFloat(priceRange.max)));
    
    return matchesSearch && matchesCategory && matchesPrice && product.in_stock;
  });

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/catalog/${categorySlug}`);
  };

  const openGallery = (product: any) => {
    const images = product.images && product.images.length > 0 
      ? product.images 
      : product.image_url 
      ? [product.image_url] 
      : [];
    
    setSelectedProduct({
      images,
      name: product.name
    });
    setGalleryOpen(true);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grass-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando catálogo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Catálogo Nogária
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Encontre tudo que sua empresa precisa em um só lugar
            </p>
            
            {cartCount > 0 && (
              <Button 
                onClick={goToCheckout}
                className="bg-white text-sky-blue hover:bg-gray-100 px-8 py-4 font-semibold text-lg rounded-full"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                Ver Carrinho ({cartCount})
              </Button>
            )}
          </div>
        </div>
      </section>

      {searchQuery ? (
        // Search Results View
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-dark-navy mb-8">
                Resultados para "{searchQuery}"
              </h2>
              
              {/* Filters */}
              <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Nome, SKU, descrição..."
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl"
                    >
                      <option value="">Todas as categorias</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preço mínimo</label>
                    <Input
                      type="number"
                      placeholder="R$ 0,00"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preço máximo</label>
                    <Input
                      type="number"
                      placeholder="R$ 999,99"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => {
                  const mainImage = product.images && product.images.length > 0 
                    ? product.images[0] 
                    : product.image_url;
                  const hasMultipleImages = (product.images && product.images.length > 1) || 
                    (product.images && product.images.length === 0 && product.image_url);

                  return (
                    <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden rounded-2xl">
                      <CardHeader className="pb-4">
                        <div 
                          className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden cursor-pointer"
                          onClick={() => openGallery(product)}
                        >
                          {mainImage ? (
                            <div className="relative w-full h-full">
                              <img 
                                src={mainImage} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                              />
                              {hasMultipleImages && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  +{(product.images?.length || 1)} fotos
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">Imagem do produto</span>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-grass-green transition-colors">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.short_description || product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-grass-green">
                            {product.price ? `R$ ${product.price.toFixed(2)}` : 'Consulte'}
                          </span>
                          <Button 
                            onClick={() => addToCart({ productId: product.id })}
                            className="bg-grass-green hover:bg-neon-green text-white rounded-xl px-6"
                            disabled={!product.in_stock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.in_stock ? 'Adicionar' : 'Indisponível'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        // Category Grid View - Now Dynamic
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-6">
                  Explore Nossas Categorias
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Descubra nossa ampla gama de produtos organizados por categoria para facilitar sua busca
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                  <Card 
                    key={category.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border-0 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-sky-blue to-grass-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {category.image_url ? (
                          <img 
                            src={category.image_url} 
                            alt={category.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-gradient-to-br from-sky-blue to-grass-green rounded"></div>
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-dark-navy group-hover:text-grass-green transition-colors mb-3">
                        {category.name}
                      </CardTitle>
                      
                      {category.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {category.description}
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-sky-blue to-grass-green rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                      </div>
                      
                      <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-grass-green font-semibold text-sm">Explorar categoria →</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery Modal */}
      {selectedProduct && (
        <ProductImageGallery
          images={selectedProduct.images}
          productName={selectedProduct.name}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Catalog;
