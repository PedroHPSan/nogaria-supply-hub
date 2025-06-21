
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const ContactStrip = () => {
  const phoneNumber = "(91) 99371-7808";
  const whatsappNumber = "5591993717808"; // Format for WhatsApp URL
  const email = "vendas@nogaria.com.br";
  const location = "NOGARIA, Ananindeua - PA";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleLocationClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section id="contato" className="py-16 bg-gradient-to-r from-dark-navy to-deep-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ficou com dúvidas?
          </h2>
          <p className="text-xl text-sky-blue mb-8">
            Converse com nosso time no WhatsApp Business ou pelos nossos canais de atendimento.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-sky-blue text-sm">Atendimento rápido</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
              <Phone className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Telefone</h3>
              <a 
                href={`tel:+55${whatsappNumber}`}
                className="text-sky-blue text-sm hover:text-neon-green transition-colors"
              >
                {phoneNumber}
              </a>
            </div>
            
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
              onClick={handleEmailClick}
            >
              <Mail className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">E-mail</h3>
              <p className="text-sky-blue text-sm hover:text-neon-green transition-colors">{email}</p>
            </div>
            
            <div 
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
              onClick={handleLocationClick}
            >
              <MapPin className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Localização</h3>
              <p className="text-sky-blue text-sm hover:text-neon-green transition-colors">Ananindeua - PA</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={handleEmailClick}
              className="border-2 border-azure text-azure hover:bg-azure hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
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
