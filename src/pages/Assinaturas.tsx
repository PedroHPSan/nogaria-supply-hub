
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Truck, DollarSign, Shield, CheckCircle, Star, ArrowRight } from 'lucide-react';

const Assinaturas = () => {
  const whatsappBase = "https://wa.me/559193717808";
  
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 349,90',
      period: '/mês',
      description: 'Para escritórios pequenos até 10 pessoas',
      color: 'from-azure to-deep-blue',
      features: [
        'Kit básico de limpeza',
        'Entrega mensal',
        'Suporte via WhatsApp',
        'Produtos de higiene essenciais',
        'Flexibilidade para pausar'
      ],
      whatsappMessage: 'Olá! Tenho interesse no plano Starter (R$ 349,90/mês) para meu escritório. Gostaria de mais informações.',
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 529,90',
      period: '/mês',
      description: 'Para equipes médias - o mais vendido',
      color: 'from-sky-blue to-grass-green',
      features: [
        'Kit completo de limpeza',
        'Produtos de higiene premium',
        'Entrega quinzenal',
        'Descartáveis inclusos',
        'Gerente dedicado',
        'Relatórios de consumo'
      ],
      whatsappMessage: 'Olá! Tenho interesse no plano Premium (R$ 529,90/mês) - o mais vendido. Gostaria de agendar uma consulta.',
      popular: true
    },
    {
      name: 'PRO',
      price: 'R$ 879,90',
      period: '/mês',
      description: 'Para grandes escritórios e instalações',
      color: 'from-grass-green to-neon-green',
      features: [
        'Kit completo + EPI',
        'Entrega semanal',
        'Consultoria especializada',
        'Produtos industriais',
        'Customização total',
        'Suporte prioritário',
        'Relatórios avançados'
      ],
      whatsappMessage: 'Olá! Tenho interesse no plano PRO (R$ 879,90/mês) com kit EPI incluso. Preciso de uma proposta personalizada.',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Entrega automática',
      description: 'Receba sem se preocupar com reposição de estoque'
    },
    {
      icon: DollarSign,
      title: 'Redução de custos',
      description: 'Economize até 30% comparado a compras avulsas'
    },
    {
      icon: Shield,
      title: 'Garantia de estoque',
      description: 'Nunca fique sem produtos essenciais'
    }
  ];

  const faqItems = [
    {
      question: 'Posso personalizar minha assinatura?',
      answer: 'Sim! Todos os planos podem ser customizados conforme suas necessidades específicas. Nossa equipe fará uma análise do seu consumo e ajustará a frequência e produtos.'
    },
    {
      question: 'Quais formas de pagamento aceitas?',
      answer: 'Aceitamos Pix, boleto bancário, cartão de crédito corporativo e faturamento com prazo para empresas. O pagamento é mensal e pode ser ajustado conforme sua preferência.'
    },
    {
      question: 'Como funciona a entrega?',
      answer: 'Realizamos entregas via Correios em todo o Brasil com rastreamento online. A frequência varia por plano: mensal (Starter), quinzenal (Premium) ou semanal (PRO).'
    },
    {
      question: 'Posso cancelar quando quiser?',
      answer: 'Sim, oferecemos total flexibilidade. Você pode pausar, alterar ou cancelar sua assinatura a qualquer momento sem multas ou taxas extras.'
    },
    {
      question: 'Há desconto para contratos anuais?',
      answer: 'Sim! Oferecemos condições especiais para contratos de 12 meses. Entre em contato para conhecer nossas ofertas exclusivas.'
    }
  ];

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappBase}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-blue to-grass-green text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-gotham">
              Assinaturas inteligentes para sua empresa
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Produtos de limpeza e higiene entregues automaticamente. 
              Sem preocupação, sem falta de estoque.
            </p>
            <Button 
              size="lg"
              onClick={() => openWhatsApp('Olá! Gostaria de falar com um consultor sobre os planos de assinatura da Nogária.')}
              className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale com um consultor
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-dark-navy mb-12">
              Por que assinar com a Nogária?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-sky-blue to-grass-green p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-navy mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark-navy mb-4">
                Escolha o plano ideal para sua empresa
              </h2>
              <p className="text-xl text-gray-600">
                Todos os planos incluem frete grátis e flexibilidade total
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={plan.name}
                  className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular ? 'border-2 border-neon-green shadow-lg scale-105' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-neon-green text-dark-navy px-4 py-2 rounded-full text-sm font-bold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Mais Vendido
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-dark-navy mb-2">
                      {plan.name}
                    </CardTitle>
                    
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-dark-navy">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-grass-green mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-3 font-semibold text-lg transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-neon-green hover:bg-grass-green text-dark-navy' 
                          : 'bg-azure hover:bg-deep-blue text-white'
                      }`}
                      onClick={() => openWhatsApp(plan.whatsappMessage)}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contratar via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-16 bg-gradient-to-r from-dark-navy to-deep-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Precisa de algo personalizado?
            </h2>
            <p className="text-xl text-sky-blue mb-8">
              Criamos planos sob medida para grandes empresas e necessidades específicas.
              Fale conosco e receba uma proposta exclusiva.
            </p>
            
            <Button 
              size="lg"
              onClick={() => openWhatsApp('Olá! Preciso de um plano personalizado para minha empresa. Gostaria de receber uma proposta sob medida.')}
              className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Solicitar plano personalizado
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-dark-navy mb-12">
              Perguntas frequentes
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-dark-navy hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                size="lg"
                onClick={() => openWhatsApp('Olá! Tenho uma dúvida sobre os planos de assinatura que não encontrei nas perguntas frequentes.')}
                className="border-2 border-azure text-azure hover:bg-azure hover:text-white px-8 py-4 text-lg font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ainda tem dúvidas?
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assinaturas;
