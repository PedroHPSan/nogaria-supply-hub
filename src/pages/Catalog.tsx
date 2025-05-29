
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Filter } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { addToCart, cartCount } = useCart();

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return product.name.toLowerCase().includes(query) ||
           product.description?.toLowerCase().includes(query) ||
           product.sku?.toLowerCase().includes(query);
  });

  const goToCheckout = () => {
    navigate('/checkout');
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grass-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
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
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Catálogo de Produtos'}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {searchQuery ? `${filteredProducts.length} produto(s) encontrado(s)` : 'Explore nossas categorias e monte seu carrinho com facilidade'}
            </p>
            
            {cartCount > 0 && (
              <Button 
                onClick={goToCheckout}
                className="bg-white text-sky-blue hover:bg-gray-100 px-6 py-3 font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ver Carrinho ({cartCount})
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {searchQuery ? (
              // Search Results View
              <div>
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  Resultados da busca
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <span className="text-gray-500">Imagem do produto</span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{product.short_description || product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-grass-green">
                            {product.price ? `R$ ${product.price.toFixed(2)}` : 'Consulte'}
                          </span>
                          <Button 
                            onClick={() => addToCart({ productId: product.id })}
                            className="bg-sky-blue hover:bg-deep-blue text-white"
                            disabled={!product.in_stock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.in_stock ? 'Adicionar' : 'Indisponível'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Nenhum produto encontrado para sua busca</p>
                  </div>
                )}
              </div>
            ) : (
              // Category Tabs View
              <div>
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  Navegue por categoria
                </h2>
                
                <Tabs defaultValue={categories[0]?.slug || "all"} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8">
                    {categories.slice(0, 8).map((category) => (
                      <TabsTrigger key={category.id} value={category.slug} className="text-xs md:text-sm">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.slug}>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products
                          .filter(product => product.category_id === category.id)
                          .map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                              <CardHeader className="pb-4">
                                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                  {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                  ) : (
                                    <span className="text-gray-500">Imagem do produto</span>
                                  )}
                                </div>
                                <CardTitle className="text-lg">{product.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600 text-sm mb-4">{product.short_description || product.description}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-2xl font-bold text-grass-green">
                                    {product.price ? `R$ ${product.price.toFixed(2)}` : 'Consulte'}
                                  </span>
                                  <Button 
                                    onClick={() => addToCart({ productId: product.id })}
                                    className="bg-sky-blue hover:bg-deep-blue text-white"
                                    disabled={!product.in_stock}
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    {product.in_stock ? 'Adicionar' : 'Indisponível'}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                      
                      {products.filter(product => product.category_id === category.id).length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">Em breve, produtos desta categoria</p>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Catalog;
