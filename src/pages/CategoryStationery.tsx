
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';

const CategoryStationery = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'stationery-001',
      name: 'Caderno Universitário 200 folhas',
      description: 'Caderno espiral com folhas pautadas, capa dura',
      price: 18.90,
      image: '/placeholder.svg'
    },
    {
      id: 'stationery-002',
      name: 'Caneta Esferográfica Azul - 50un',
      description: 'Canetas esferográficas ponta média, tinta azul',
      price: 75.00,
      image: '/placeholder.svg'
    },
    {
      id: 'stationery-003',
      name: 'Lápis HB - 144un',
      description: 'Lápis grafite HB, corpo hexagonal, caixa com 144 unidades',
      price: 89.90,
      image: '/placeholder.svg'
    },
    {
      id: 'stationery-004',
      name: 'Borracha Branca - 40un',
      description: 'Borrachas brancas para lápis, macias e eficientes',
      price: 24.90,
      image: '/placeholder.svg'
    },
    {
      id: 'stationery-005',
      name: 'Régua 30cm Transparente - 20un',
      description: 'Réguas acrílicas transparentes com marcação precisa',
      price: 35.90,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Papelaria
            </h1>
            <p className="text-xl text-white/90">
              Materiais de papelaria para escritório e educação
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Imagem do produto</span>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-grass-green">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <Button 
                        onClick={() => addToCart({ productId: product.id })}
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

export default CategoryStationery;
