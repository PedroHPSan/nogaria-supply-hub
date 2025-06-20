import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CategoryStationery = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'pap-001',
      name: 'Caderno Universitário',
      description: '96 folhas pautadas',
      price: 18.2,
      image: '/placeholder.svg'
    },
    {
      id: 'pap-002',
      name: 'Bloco de Notas Adesivas',
      description: 'Pacote com 400 folhas coloridas',
      price: 14.7,
      image: '/placeholder.svg'
    },
    {
      id: 'pap-003',
      name: 'Marcador Permanente',
      description: 'Ponta chanfrada, cor preta',
      price: 5.9,
      image: '/placeholder.svg'
    },
    {
      id: 'pap-004',
      name: 'Folhas de Sulfite A4 75g',
      description: 'Resma com 500 folhas',
      price: 29.9,
      image: '/placeholder.svg'
    },
    {
      id: 'pap-005',
      name: 'Clips nº 2',
      description: 'Caixa com 100 unidades',
      price: 3.4,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Papelaria</h1>
            <p className="text-xl text-white/90">Suprimentos para escritório e escola</p>
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

export default CategoryStationery;
