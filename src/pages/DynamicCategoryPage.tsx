
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import ProductImageGallery from '@/components/ProductImageGallery';
import { getCategoryImage } from '@/constants/defaultImages';

const DynamicCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedProduct, setSelectedProduct] = useState<{
    images: string[];
    name: string;
  } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  const navigate = useNavigate();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { addToCart } = useCart();

  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const categoryProducts = products.filter(product => 
    product.category_id === currentCategory?.id &&
    product.in_stock &&
    (!searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!priceRange.min || (product.price && product.price >= parseFloat(priceRange.min))) &&
    (!priceRange.max || (product.price && product.price <= parseFloat(priceRange.max)))
  );

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
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
            <Button onClick={() => navigate('/catalog')}>
              Voltar ao Catálogo
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/catalog')}
              className="text-white hover:bg-white/20 mb-6 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Catálogo
            </Button>
            <div className="text-center">
              {/* Category Image Display */}
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-4">
                <img 
                  src={getCategoryImage(currentCategory?.image_url)} 
                  alt={currentCategory?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentCategory?.name}
              </h1>
              {currentCategory?.description && (
                <p className="text-xl text-white/90">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Buscar produtos</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Nome, SKU, descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
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
              {categoryProducts.map((product) => {
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
            
            {categoryProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500">Tente ajustar os filtros ou adicione produtos nesta categoria</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
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

export default DynamicCategoryPage;
