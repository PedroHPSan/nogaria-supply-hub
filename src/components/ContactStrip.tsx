
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const ContactStrip = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-dark-navy to-deep-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ficou com dúvidas?
          </h2>
          <p className="text-xl text-sky-blue mb-8">
            Converse com nosso time no WhatsApp Business ou pelos nossos canais de atendimento.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <MessageCircle className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-sky-blue text-sm">Atendimento rápido</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Telefone</h3>
              <p className="text-sky-blue text-sm">(91) 99999-9999</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Mail className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">E-mail</h3>
              <p className="text-sky-blue text-sm">vendas@nogaria.com.br</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Localização</h3>
              <p className="text-sky-blue text-sm">Ananindeua - PA</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-neon-green hover:bg-grass-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar e-mail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactStrip;
