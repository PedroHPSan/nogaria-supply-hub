import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator as CalculatorIcon, Building, Users, Square, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CalculatorInput {
  environmentType: string;
  area: number;
  employees: number;
  cleaningFrequency: string;
  hasKitchen: boolean;
  hasBathrooms: boolean;
  hasWarehouse: boolean;
  hasOfficeSpace: boolean;
}

interface RegistrationData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  cnpj: string;
  companySegment: string;
  jobTitle: string;
  lgpdConsent: boolean;
}

const Calculator = () => {
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'questionnaire' | 'lead-capture' | 'results'>('welcome');
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    environmentType: '',
    area: 0,
    employees: 0,
    cleaningFrequency: '',
    hasKitchen: false,
    hasBathrooms: false,
    hasWarehouse: false,
    hasOfficeSpace: false,
  });
  
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    cnpj: '',
    companySegment: '',
    jobTitle: '',
    lgpdConsent: false,
  });

  const [calculationResult, setCalculationResult] = useState<any>(null);

  const phases = [
    { id: 'welcome', title: 'Boas-vindas', completed: false },
    { id: 'questionnaire', title: 'Questionário', completed: false },
    { id: 'lead-capture', title: 'Seus Dados', completed: false },
    { id: 'results', title: 'Resultados', completed: false },
  ];

  const benefits = [
    {
      icon: Calculator,
      title: 'Cálculos Precisos',
      description: 'Estimativas exatas baseadas nas normas brasileiras NR-24 e melhores práticas do setor'
    },
    {
      icon: CheckCircle,
      title: 'Conformidade Garantida',
      description: 'Recomendações alinhadas com as normas regulamentadoras brasileiras'
    },
    {
      icon: Building,
      title: 'Para Todos os Negócios',
      description: 'Desde pequenos escritórios até grandes complexos industriais'
    },
    {
      icon: Clock,
      title: 'Economia de Tempo',
      description: 'Relatório completo em poucos minutos, enviado por email'
    }
  ];

  const handleCalculate = () => {
    // Mock calculation logic - in real implementation this would use your TypeScript calculation functions
    const mockResult = {
      period: "Mensal",
      items: [
        {
          product: "Detergente Neutro 5L",
          calculatedQuantity: "2.5 litros",
          suggestedPurchase: "1 unidade de 5L",
          notes: "Diluição 1:10 para limpeza geral"
        },
        {
          product: "Papel Higiênico",
          calculatedQuantity: "24 rolos",
          suggestedPurchase: "2 pacotes com 12 unidades",
          notes: "Baseado no número de funcionários"
        },
        {
          product: "Álcool 70%",
          calculatedQuantity: "1 litro",
          suggestedPurchase: "2 frascos de 500ml",
          notes: "Para desinfecção de superfícies"
        }
      ]
    };
    
    setCalculationResult(mockResult);
    setStep(3);
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.lgpdConsent) {
      alert('Por favor, aceite os termos para continuar.');
      return;
    }
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Progress Indicator */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentPhase === phase.id 
                      ? 'bg-grass-green text-dark-navy' 
                      : phase.completed 
                        ? 'bg-sky-blue text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentPhase === phase.id ? 'text-dark-navy' : 'text-gray-600'
                  }`}>
                    {phase.title}
                  </span>
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Phase */}
      {currentPhase === 'welcome' && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto text-center">
                <CalculatorIcon className="w-20 h-20 mx-auto mb-8 text-neon-green" />
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Calculadora Avançada de Suprimentos de Limpeza
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Bem-vindo à nova experiência da Nogária! Nossa calculadora inteligente substituiu a página 
                  "calcule sua necessidade" com uma ferramenta muito mais abrangente e precisa.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                  <p className="text-lg text-white/95 leading-relaxed">
                    Descubra as soluções de limpeza perfeitas para seu negócio e garanta um ambiente 
                    de trabalho saudável e em conformidade com as normas brasileiras. Esta ferramenta oferece 
                    recomendações personalizadas baseadas nas suas necessidades específicas.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setCurrentPhase('questionnaire')}
                    size="lg"
                    className="bg-neon-green hover:bg-grass-green text-dark-navy font-bold text-lg px-8 py-4"
                  >
                    Iniciar Cálculo Gratuito
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-dark-navy font-bold text-lg px-8 py-4"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  Por que usar nossa Calculadora Avançada?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <benefit.icon className="w-12 h-12 text-grass-green mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark-navy mb-3">
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

          {/* What You'll Get Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  O que você receberá
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-grass-green">
                        📊 Relatório Detalhado na Tela
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Lista personalizada de produtos Nogária</li>
                        <li>• Quantidades exatas calculadas</li>
                        <li>• Sugestões de compra otimizadas</li>
                        <li>• Instruções de diluição e uso</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-grass-green">
                        📧 PDF Completo por Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Relatório completo em PDF</li>
                        <li>• Dicas personalizadas de limpeza</li>
                        <li>• Orientações de conformidade NR-24</li>
                        <li>• Melhores práticas do setor</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-dark-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">
                  Pronto para otimizar seus suprimentos de limpeza?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Leva apenas alguns minutos e é completamente gratuito. 
                  Comece agora e descubra como economizar tempo e dinheiro!
                </p>
                <Button 
                  onClick={() => setCurrentPhase('questionnaire')}
                  size="lg"
                  className="bg-grass-green hover:bg-neon-green text-dark-navy font-bold text-xl px-12 py-4"
                >
                  Começar Agora - É Grátis!
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Questionnaire Phase */}
      {currentPhase === 'questionnaire' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-dark-navy mb-8">
                Questionário - Em Desenvolvimento
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Esta seção será implementada na Fase 2 do projeto.
              </p>
              <Button 
                onClick={() => setCurrentPhase('welcome')}
                variant="outline"
                className="border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Calculator;
