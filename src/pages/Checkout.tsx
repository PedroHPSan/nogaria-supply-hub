
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, CreditCard, Smartphone, FileText, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'pix'
  });

  const paymentMethods = [
    { id: 'pix', label: 'Pix', icon: Smartphone },
    { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
    { id: 'boleto', label: 'Boleto Bancário', icon: FileText },
    { id: 'b2b', label: 'Faturamento B2B', icon: Building }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendOrderViaWhatsApp = () => {
    const message = `Olá! Gostaria de finalizar meu pedido com os seguintes dados:

*Empresa:* ${formData.companyName}
*CNPJ:* ${formData.cnpj}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Endereço:* ${formData.address}
*Forma de Pagamento:* ${paymentMethods.find(p => p.id === formData.paymentMethod)?.label}
*Observações:* ${formData.notes || 'Nenhuma'}

Aguardo o contato para confirmação!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/559193717808?text=${encodedMessage}`, '_blank');
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
              Revise seu carrinho, preencha seus dados e envie seu pedido
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-dark-navy">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark-navy">Dados da Empresa</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Razão social da empresa"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Corporativo</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contato@empresa.com.br"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Endereço de Entrega</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Endereço completo com CEP"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark-navy">Forma de Pagamento</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all ${
                          formData.paymentMethod === method.id 
                            ? 'border-grass-green bg-grass-green/10' 
                            : 'hover:border-sky-blue'
                        }`}
                        onClick={() => handleInputChange('paymentMethod', method.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <method.icon className={`w-8 h-8 mx-auto mb-2 ${
                            formData.paymentMethod === method.id ? 'text-grass-green' : 'text-gray-600'
                          }`} />
                          <p className="text-sm font-medium">{method.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <Label htmlFor="notes">Observações do Pedido</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Informações adicionais sobre o pedido (opcional)"
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    onClick={sendOrderViaWhatsApp}
                    className="w-full bg-grass-green hover:bg-neon-green text-white py-4 text-lg font-semibold"
                    disabled={!formData.companyName || !formData.cnpj || !formData.email}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar pedido via WhatsApp
                  </Button>
                  
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    Seu pedido será enviado via WhatsApp para confirmação e processamento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Checkout;
