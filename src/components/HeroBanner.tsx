
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, CreditCard, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-dark-navy to-sky-blue text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-grass-green/10 rounded-full blur-3xl"></div>
        {/* Logo pattern overlay */}
        <div className="absolute top-10 left-10 opacity-5">
          <img 
            src="/lovable-uploads/29287e75-6ba8-4189-962b-42454a69cc1c.png" 
            alt="Nogária Pattern" 
            className="h-32 w-auto"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Suprimentos corporativos com{' '}
            <span className="bg-gradient-to-r from-neon-green to-grass-green bg-clip-text text-transparent">
              agilidade e inteligência
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-sky-blue font-light">
            Limpeza • Higiene • EPI • Informática • Papelaria
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Comece a comprar
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline" 
              onClick={() => navigate('/assinaturas')}
              className="border-2 border-azure text-azure hover:bg-azure hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Assine mensalmente
            </Button>
          </div>
          
          {/* Value propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-gradient-to-r from-sky-blue to-grass-green p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Entrega via Correios em todo Brasil</h3>
              <p className="text-sky-blue/80">Com integração total ao nosso sistema e rastreamento online</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-gradient-to-r from-grass-green to-neon-green p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8 text-dark-navy" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Condições especiais B2B</h3>
              <p className="text-sky-blue/80">Pix, boleto e faturamento corporativo</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-gradient-to-r from-azure to-sky-blue p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Reposição automática</h3>
              <p className="text-sky-blue/80">Assine e receba sem se preocupar com estoque</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
