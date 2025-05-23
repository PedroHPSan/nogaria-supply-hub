
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Calculator } from 'lucide-react';

const WholesaleBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-neon-green to-grass-green relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Package className="w-12 h-12 text-dark-navy" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-6">
            Precisa comprar em grande volume?
          </h2>
          
          <p className="text-xl text-dark-navy/80 mb-8 max-w-2xl mx-auto">
            Conte com preços imbatíveis no atacado e condições especiais para sua empresa
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-dark-navy mx-auto mb-3" />
              <h3 className="font-semibold text-dark-navy mb-2">Preços Especiais</h3>
              <p className="text-dark-navy/70 text-sm">Descontos progressivos conforme o volume</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <Calculator className="w-8 h-8 text-dark-navy mx-auto mb-3" />
              <h3 className="font-semibold text-dark-navy mb-2">Orçamento Personalizado</h3>
              <p className="text-dark-navy/70 text-sm">Cotação sob medida para sua necessidade</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <Package className="w-8 h-8 text-dark-navy mx-auto mb-3" />
              <h3 className="font-semibold text-dark-navy mb-2">Entrega Programada</h3>
              <p className="text-dark-navy/70 text-sm">Logistics otimizada para grandes volumes</p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-dark-navy hover:bg-deep-blue text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Solicitar orçamento atacado
          </Button>
          
          <p className="text-sm text-dark-navy/60 mt-4">
            * Compras a partir de R$ 2.000 recebem condições especiais
          </p>
        </div>
      </div>
    </section>
  );
};

export default WholesaleBanner;
