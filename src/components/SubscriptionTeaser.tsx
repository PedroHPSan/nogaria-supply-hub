
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, DollarSign, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionTeaser = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: 'R$ 349',
      period: '/mês',
      color: 'from-azure to-deep-blue',
      features: ['Produtos básicos de limpeza', 'Entrega mensal', 'Suporte via WhatsApp']
    },
    {
      name: 'Premium',
      price: 'R$ 529',
      period: '/mês', 
      color: 'from-sky-blue to-grass-green',
      features: ['Linha completa + EPI', 'Entrega quinzenal', 'Gerente dedicado'],
      popular: true
    },
    {
      name: 'PRO',
      price: 'R$ 879',
      period: '/mês',
      color: 'from-grass-green to-neon-green',
      features: ['Todas as categorias', 'Entrega semanal', 'Consultoria inclusa']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-navy mb-4">
            Planos de assinatura
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Monte seu combo e reduza custos de reposição. Nunca mais fique sem estoque.
          </p>
          
          {/* Benefits overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-azure/10 p-3 rounded-full mb-3">
                <Calendar className="w-6 h-6 text-azure" />
              </div>
              <span className="text-sm font-medium text-gray-700">Reposição automática</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-sky-blue/10 p-3 rounded-full mb-3">
                <DollarSign className="w-6 h-6 text-sky-blue" />
              </div>
              <span className="text-sm font-medium text-gray-700">Preços fixos</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-grass-green/10 p-3 rounded-full mb-3">
                <Truck className="w-6 h-6 text-grass-green" />
              </div>
              <span className="text-sm font-medium text-gray-700">Frete grátis</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-neon-green/10 p-3 rounded-full mb-3">
                <CheckCircle className="w-6 h-6 text-grass-green" />
              </div>
              <span className="text-sm font-medium text-gray-700">Flexibilidade total</span>
            </div>
          </div>
        </div>
        
        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'border-2 border-neon-green shadow-lg scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-neon-green text-dark-navy px-4 py-2 rounded-full text-sm font-bold">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-dark-navy mb-2">{plan.name}</h3>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-dark-navy">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>
                
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
                  onClick={() => navigate('/assinaturas')}
                >
                  Escolher plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate('/assinaturas')}
            className="border-2 border-azure text-azure hover:bg-azure hover:text-white px-8 py-4 text-lg font-semibold"
          >
            Explorar todos os planos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTeaser;
