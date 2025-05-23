
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, CreditCard, RotateCcw } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-hero text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Tudo que seu escritório precisa —{' '}
            <span className="bg-gradient-to-r from-sky-blue to-neon-green bg-clip-text text-transparent">
              sem complicação
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-sky-blue font-light">
            Limpeza • Higiene • EPI • Papelaria • Informática
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-azure hover:bg-deep-blue text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Comprar agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline" 
              className="border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Assinaturas empresariais
            </Button>
          </div>
          
          {/* Value propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-azure/20 p-4 rounded-full mb-4 group-hover:bg-azure/30 transition-colors">
                <Truck className="w-8 h-8 text-sky-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Entrega ágil via Correios</h3>
              <p className="text-gray-300">Pedidos despachados em até 24 h*</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-azure/20 p-4 rounded-full mb-4 group-hover:bg-azure/30 transition-colors">
                <CreditCard className="w-8 h-8 text-sky-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Condições especiais B2B</h3>
              <p className="text-gray-300">Pix, boleto e faturamento sob aprovação</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-azure/20 p-4 rounded-full mb-4 group-hover:bg-azure/30 transition-colors">
                <RotateCcw className="w-8 h-8 text-sky-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Assine & esqueça</h3>
              <p className="text-gray-300">Reposição automática mensal sem falta de estoque</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
