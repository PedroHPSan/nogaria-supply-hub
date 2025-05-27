
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contato = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    empresa: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = `Contato do site - ${formData.empresa}`;
    const body = `Nome: ${formData.nomeCompleto}
Empresa: ${formData.empresa}
E-mail: ${formData.email}
Telefone: ${formData.telefone}

Mensagem:
${formData.mensagem}`;

    const mailtoLink = `mailto:contato@nogaria.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    toast({
      title: "Mensagem enviada!",
      description: "Seu cliente de e-mail foi aberto. Obrigado pelo contato!",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-dark-navy to-sky-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-gotham">
              Fale conosco
            </h1>
            <p className="text-xl md:text-2xl text-sky-blue font-light">
              Estamos aqui para ajudar sua empresa a otimizar seus suprimentos
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-gotham text-dark-navy flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-grass-green" />
                    Envie sua mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="nomeCompleto" className="text-dark-navy font-medium">
                        Nome completo *
                      </Label>
                      <Input
                        id="nomeCompleto"
                        name="nomeCompleto"
                        type="text"
                        required
                        value={formData.nomeCompleto}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="empresa" className="text-dark-navy font-medium">
                        Empresa *
                      </Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                        placeholder="Nome da sua empresa"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-dark-navy font-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone" className="text-dark-navy font-medium">
                        Telefone *
                      </Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mensagem" className="text-dark-navy font-medium">
                        Mensagem *
                      </Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        required
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green min-h-[120px]"
                        placeholder="Como podemos ajudar sua empresa?"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-grass-green hover:bg-neon-green text-white font-gotham font-semibold py-3 text-lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Enviar mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-gotham font-bold text-dark-navy mb-6">
                      Informações de contato
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <Mail className="w-6 h-6 text-grass-green mr-4" />
                        <div>
                          <p className="font-medium text-dark-navy">E-mail</p>
                          <p className="text-gray-600">contato@nogaria.com.br</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone className="w-6 h-6 text-grass-green mr-4" />
                        <div>
                          <p className="font-medium text-dark-navy">Telefone</p>
                          <p className="text-gray-600">(91) 99999-9999</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <MapPin className="w-6 h-6 text-grass-green mr-4" />
                        <div>
                          <p className="font-medium text-dark-navy">Endereço</p>
                          <p className="text-gray-600">Belém, Pará, Brasil</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-gradient-to-r from-sky-blue to-grass-green text-white">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-gotham font-bold mb-4">
                      Horário de atendimento
                    </h3>
                    <p className="mb-2">Segunda a Sexta: 8h às 18h</p>
                    <p>Sábado: 8h às 12h</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
