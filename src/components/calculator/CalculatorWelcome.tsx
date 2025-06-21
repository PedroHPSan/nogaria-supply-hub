import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator as CalculatorIcon, Building, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react';
interface CalculatorWelcomeProps {
  onStartCalculation: () => void;
}
const CalculatorWelcome = ({
  onStartCalculation
}: CalculatorWelcomeProps) => {
  const benefits = [{
    icon: CalculatorIcon,
    title: 'Cálculos Precisos',
    description: 'Estimativas exatas baseadas nas normas brasileiras NR-24 e melhores práticas do setor'
  }, {
    icon: CheckCircle,
    title: 'Conformidade Garantida',
    description: 'Recomendações alinhadas com as normas regulamentadoras brasileiras'
  }, {
    icon: Building,
    title: 'Para Todos os Negócios',
    description: 'Desde pequenos escritórios até grandes complexos industriais'
  }, {
    icon: Clock,
    title: 'Economia de Tempo',
    description: 'Relatório completo em poucos minutos, enviado por email'
  }];
  return <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <CalculatorIcon className="w-20 h-20 mx-auto mb-8 text-neon-green" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Calculadora Avançada de Suprimentos de Limpeza
            </h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-lg text-white/95 leading-relaxed">
                Descubra as soluções de limpeza perfeitas para seu negócio e garanta um ambiente 
                de trabalho saudável e em conformidade com as normas brasileiras. Esta ferramenta oferece 
                recomendações personalizadas baseadas nas suas necessidades específicas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onStartCalculation} size="lg" className="bg-neon-green hover:bg-grass-green text-dark-navy font-bold text-lg px-8 py-4">
                Iniciar Cálculo Gratuito
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white hover:bg-white hover:text-dark-navy font-bold text-lg px-8 py-4 text-gray-950">
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
              {benefits.map((benefit, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-grass-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-dark-navy mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

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
            <Button onClick={onStartCalculation} size="lg" className="bg-grass-green hover:bg-neon-green text-dark-navy font-bold text-xl px-12 py-4">
              Começar Agora - É Grátis!
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>;
};
export default CalculatorWelcome;