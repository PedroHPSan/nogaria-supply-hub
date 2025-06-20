
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Upload, Mail, Star, TrendingUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useJobApplicationForm } from '@/hooks/useJobApplicationForm';

const TrabalheConosco = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    linkedinPortfolio: '',
    mensagem: '',
    curriculo: null as File | null
  });
  
  const { submitForm, isSubmitting } = useJobApplicationForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        curriculo: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitForm({
      nomeCompleto: formData.nomeCompleto,
      email: formData.email,
      linkedinPortfolio: formData.linkedinPortfolio,
      mensagem: formData.mensagem,
      curriculoFile: formData.curriculo || undefined,
    });

    if (result.success) {
      // Reset form
      setFormData({
        nomeCompleto: '',
        email: '',
        linkedinPortfolio: '',
        mensagem: '',
        curriculo: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('curriculo') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const benefits = [
    {
      icon: Star,
      title: "Ambiente Inovador",
      description: "Trabalhe com tecnologias modernas em um ambiente que valoriza a criatividade e inovação"
    },
    {
      icon: Users,
      title: "Equipe Colaborativa",
      description: "Faça parte de uma equipe unida, onde o crescimento de cada um contribui para o sucesso de todos"
    },
    {
      icon: TrendingUp,
      title: "Crescimento Profissional",
      description: "Oportunidades de desenvolvimento e crescimento em uma empresa em expansão"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-dark-navy to-sky-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-gotham">
              Venha crescer com a{' '}
              <span className="bg-gradient-to-r from-neon-green to-grass-green bg-clip-text text-transparent">
                Nogária
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-sky-blue font-light mb-8">
              Se você acredita em agilidade, compromisso e excelência, temos um lugar para você.
            </p>
            <Button 
              size="lg" 
              className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('candidatura-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="mr-2 w-5 h-5" />
              Candidate-se agora
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-dark-navy font-gotham">
              Por que trabalhar na Nogária?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-r from-sky-blue to-grass-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-dark-navy font-gotham">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="candidatura-form" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-gotham text-dark-navy flex items-center justify-center">
                  <Mail className="w-8 h-8 mr-3 text-grass-green" />
                  Envie sua candidatura
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Preencha os dados abaixo. Entraremos em contato em breve!
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        disabled={isSubmitting}
                        minLength={2}
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
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="linkedinPortfolio" className="text-dark-navy font-medium">
                      LinkedIn/Portfólio
                    </Label>
                    <Input
                      id="linkedinPortfolio"
                      name="linkedinPortfolio"
                      type="url"
                      value={formData.linkedinPortfolio}
                      onChange={handleInputChange}
                      className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                      placeholder="https://linkedin.com/in/seuperfil ou link do portfólio"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="curriculo" className="text-dark-navy font-medium">
                      Anexar currículo (PDF) *
                    </Label>
                    <Input
                      id="curriculo"
                      name="curriculo"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="mt-2 border-gray-300 focus:border-grass-green focus:ring-grass-green"
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Apenas arquivos PDF são aceitos (máx. 5MB)
                    </p>
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
                      placeholder="Conte-nos um pouco sobre você, suas experiências e por que gostaria de trabalhar na Nogária"
                      disabled={isSubmitting}
                      minLength={10}
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-grass-green hover:bg-neon-green text-white font-gotham font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Enviar candidatura
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrabalheConosco;
