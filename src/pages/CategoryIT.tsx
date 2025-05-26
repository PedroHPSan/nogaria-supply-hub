
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CategoryIT = () => {
  const [cart, setCart] = useState<any[]>([]);

  const products = [
    {
      sku: 'INF-008',
      name: 'Mouse USB Óptico - Preto',
      image: '/placeholder-mouse.jpg',
      description: 'Plug-and-play. Ideal para escritório ou home office.',
      price: 'R$ 29,90',
      compatibility: 'Windows/Mac/Linux'
    },
    {
      sku: 'INF-009',
      name: 'Teclado USB ABNT2',
      image: '/placeholder-keyboard.jpg', 
      description: 'Teclado padrão brasileiro com teclas multimídia',
      price: 'R$ 45,90',
      compatibility: 'Windows/Mac/Linux'
    },
    {
      sku: 'INF-010',
      name: 'Cabo HDMI 2.0 - 1.5m',
      image: '/placeholder-cable.jpg',
      description: 'Cabo HDMI high speed com ethernet, 4K@60Hz',
      price: 'R$ 24,90',
      compatibility: 'Universal'
    }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    console.log('Produto adicionado ao carrinho:', product);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Suprimentos de TI
            </h1>
            <p className="text-xl text-white/90">
              Equipamentos e acessórios para informática
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Tipo de Item
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Compatibilidade
              </Button>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.sku} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Imagem do produto</span>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-xs text-sky-blue mb-4">Compatível: {product.compatibility}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-grass-green">{product.price}</span>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="bg-sky-blue hover:bg-deep-blue text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryIT;
