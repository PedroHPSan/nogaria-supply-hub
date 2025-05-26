
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Catalog = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage on component mount
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    } catch {
      setCart([]);
    }
  }, []);

  const categories = [
    'Limpeza',
    'Higiene', 
    'EPI',
    'Descartáveis',
    'Plásticos',
    'Papelaria',
    'Material de Escritório',
    'Suprimentos de TI'
  ];

  const sampleProducts = [
    {
      sku: 'LMP-001',
      name: 'Detergente Neutro 5L',
      image: '/placeholder-product.jpg',
      description: 'Detergente neutro concentrado para limpeza geral',
      price: 'R$ 24,90',
      category: 'Limpeza'
    },
    {
      sku: 'HIG-002', 
      name: 'Papel Higiênico 30m - Pacote 12 unid',
      image: '/placeholder-product.jpg',
      description: 'Papel higiênico folha dupla, alta qualidade',
      price: 'R$ 32,50',
      category: 'Higiene'
    },
    {
      sku: 'EPI-003',
      name: 'Luva Nitrílica Descartável - Caixa 100 unid',
      image: '/placeholder-product.jpg', 
      description: 'Luvas de nitrilo sem pó, tamanho M',
      price: 'R$ 45,90',
      category: 'EPI'
    }
  ];

  const addToCart = (product: any) => {
    const updatedCart = [...cart, { ...product, id: Date.now() }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('Produto adicionado ao carrinho:', product);
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catálogo de Produtos
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Explore nossas categorias e monte seu carrinho com facilidade
            </p>
            
            {cart.length > 0 && (
              <Button 
                onClick={goToCheckout}
                className="bg-white text-sky-blue hover:bg-gray-100 px-6 py-3 font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ver Carrinho ({cart.length})
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
              Navegue por categoria
            </h2>
            
            <Tabs defaultValue="Limpeza" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sampleProducts
                      .filter(product => product.category === category)
                      .map((product) => (
                        <Card key={product.sku} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-4">
                            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                              <span className="text-gray-500">Imagem do produto</span>
                            </div>
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
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
                  
                  {sampleProducts.filter(product => product.category === category).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">Em breve, produtos desta categoria</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Catalog;
