import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CategoryPlastics = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'pla-001',
      name: 'Balde Plástico 10L',
      description: 'Resistente para diversas utilidades',
      price: 22.5,
      image: '/placeholder.svg'
    },
    {
      id: 'pla-002',
      name: 'Pote Hermético 1L',
      description: 'Armazenamento seguro de alimentos',
      price: 9.8,
      image: '/placeholder.svg'
    },
    {
      id: 'pla-003',
      name: 'Pá Plástica',
      description: 'Ideal para limpeza e jardinagem',
      price: 7.9,
      image: '/placeholder.svg'
    },
    {
      id: 'pla-004',
      name: 'Lixeira Basculante 25L',
      description: 'Tampa prática e durável',
      price: 34.0,
      image: '/placeholder.svg'
    },
    {
      id: 'pla-005',
      name: 'Caixa Organizadora 50L',
      description: 'Organização eficiente de materiais',
      price: 45.5,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Plásticos</h1>
            <p className="text-xl text-white/90">Linhas diversas em plástico</p>
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
                      <span className="text-2xl font-bold text-grass-green">R$ {product.price.toFixed(2)}</span>
                      <Button onClick={() => addToCart({ productId: product.id })} className="bg-sky-blue hover:bg-deep-blue text-white">
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

export default CategoryPlastics;
