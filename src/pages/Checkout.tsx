
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    cnpj: '',
    address: '',
    observations: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const getItemPrice = (item: any) => {
    // Handle both database cart items (with product) and local cart items
    if (item.product && item.product.price !== undefined) {
      return Number(item.product.price) || 0;
    }
    return Number(item.price) || 0;
  };

  const getItemName = (item: any) => {
    if (item.product && item.product.name) {
      return item.product.name;
    }
    return item.name || 'Produto';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.company) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Create order message for WhatsApp
    const orderDetails = cart.map(item => {
      const price = getItemPrice(item);
      const name = getItemName(item);
      const total = price * item.quantity;
      return `• ${name} - Qtd: ${item.quantity} - R$ ${total.toFixed(2)}`;
    }).join('\n');
    
    const message = `*NOVO PEDIDO - NOGÁRIA*\n\n` +
      `*Cliente:* ${customerInfo.name}\n` +
      `*Empresa:* ${customerInfo.company}\n` +
      `*E-mail:* ${customerInfo.email}\n` +
      `*Telefone:* ${customerInfo.phone}\n` +
      `*CNPJ:* ${customerInfo.cnpj}\n` +
      `*Endereço:* ${customerInfo.address}\n\n` +
      `*PRODUTOS:*\n${orderDetails}\n\n` +
      `*TOTAL: R$ ${getCartTotal().toFixed(2)}*\n\n` +
      `*Observações:* ${customerInfo.observations}`;
    
    const whatsappUrl = `https://wa.me/5591993717808?text=${encodeURIComponent(message)}`;
    
    // Clear cart and redirect
    clearCart();
    
    // Show success message
    toast({
      title: "Pedido enviado!",
      description: "Redirecionando para WhatsApp e página de confirmação..."
    });
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Redirect to confirmation page after a short delay
    setTimeout(() => {
      navigate('/checkout/confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Finalizar Pedido
            </h1>
            <p className="text-xl text-white/90">
              Complete suas informações e envie seu pedido via WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Empresa *</Label>
                    <Input
                      id="company"
                      value={customerInfo.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={customerInfo.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Endereço de Entrega</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="observations">Observações</Label>
                    <Textarea
                      id="observations"
                      value={customerInfo.observations}
                      onChange={(e) => handleInputChange('observations', e.target.value)}
                      placeholder="Informações adicionais sobre o pedido..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Seu carrinho está vazio
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => {
                        const price = getItemPrice(item);
                        const name = getItemName(item);
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{name}</h4>
                              <p className="text-sm text-gray-500">
                                R$ {price.toFixed(2)} cada
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity({ productId: item.id, quantity: Math.max(1, item.quantity - 1) })}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              
                              <span className="px-3 py-1 bg-gray-100 rounded">
                                {item.quantity}
                              </span>
                              
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity({ productId: item.id, quantity: item.quantity + 1 })}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-grass-green">
                            R$ {getCartTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-grass-green hover:bg-grass-green/90"
                    disabled={cart.length === 0}
                  >
                    Enviar Pedido via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Checkout;
