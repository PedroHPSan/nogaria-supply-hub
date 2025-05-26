
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Confirmation Section */}
      <section className="bg-gradient-to-br from-sky-blue to-grass-green text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Pedido enviado com sucesso!
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              Um consultor da Nogária entrará em contato em breve para confirmar os detalhes e agendar a entrega.
            </p>
            
            <Button 
              onClick={() => navigate('/catalog')}
              className="bg-white text-sky-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao catálogo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CheckoutConfirmation;
