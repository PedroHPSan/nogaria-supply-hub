
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';

const CategoryEPI = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'epi-001',
      name: 'Capacete de Segurança Classe A',
      description: 'Capacete com proteção contra impactos e choques elétricos',
      price: 45.90,
      image: '/placeholder.svg'
    },
    {
      id: 'epi-002',
      name: 'Luva de Látex Descartável - 100un',
      description: 'Luvas de látex powder free para proteção das mãos',
      price: 28.50,
      image: '/placeholder.svg'
    },
    {
      id: 'epi-003',
      name: 'Óculos de Proteção Incolor',
      description: 'Óculos de segurança com lentes antiembaçantes',
      price: 12.90,
      image: '/placeholder.svg'
    },
    {
      id: 'epi-004',
      name: 'Máscara PFF2 N95 - 20un',
      description: 'Respirador descartável com 95% de eficiência de filtração',
      price: 89.90,
      image: '/placeholder.svg'
    },
    {
      id: 'epi-005',
      name: 'Calçado de Segurança Botina',
      description: 'Botina com bico de aço e solado antiderrapante',
      price: 165.90,
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
              EPI - Equipamentos de Proteção Individual
            </h1>
            <p className="text-xl text-white/90">
              Equipamentos certificados para segurança no trabalho
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

export default CategoryEPI;
