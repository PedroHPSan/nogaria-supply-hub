
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const productCategories = [
    'Material de Limpeza',
    'Produtos de Higiene',
    'EPI - Equipamentos',
    'Descartáveis',
    'Plásticos',
    'Papelaria',
    'Material de Escritório',
    'Suprimentos de TI'
  ];

  const companyLinks = [
    'Sobre a Nogária',
    'Nossa História',
    'Trabalhe Conosco',
    'Política de Qualidade',
    'Certificações'
  ];

  const serviceLinks = [
    'Como Comprar',
    'Formas de Pagamento',
    'Entrega e Frete',
    'Trocas e Devoluções',
    'FAQ'
  ];

  return (
    <footer className="bg-dark-navy text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/f6b72d18-2cb2-4bb0-8bb3-f79d31eb3f47.png" 
                alt="Nogária Logo" 
                className="h-10 w-auto mr-3"
              />
              <div>
                <h3 className="text-2xl font-bold">Nogária</h3>
                <p className="text-sky-blue">Suprimentos Corporativos</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Especialistas em suprimentos corporativos com foco na agilidade e qualidade. 
              Atendemos empresas de todos os portes com soluções completas para escritório, 
              limpeza e segurança.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-sky-blue mr-3" />
                <span className="text-gray-300">Ananindeua - PA, Brasil</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-sky-blue mr-3" />
                <span className="text-gray-300">(91) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-sky-blue mr-3" />
                <span className="text-gray-300">vendas@nogaria.com.br</span>
              </div>
            </div>
          </div>
          
          {/* Product categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Produtos</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Service links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Atendimento</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social media */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4 text-sky-blue">Siga-nos</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-neon-green transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-neon-green transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-neon-green transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter signup */}
      <div className="border-t border-deep-blue">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-sky-blue mb-2">
                Receba ofertas especiais
              </h4>
              <p className="text-gray-300">
                Cadastre-se e seja o primeiro a saber das promoções
              </p>
            </div>
            
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail corporativo"
                className="px-4 py-3 bg-deep-blue border border-azure rounded-l-lg focus:outline-none focus:ring-2 focus:ring-azure text-white placeholder-gray-400 flex-grow md:w-80"
              />
              <button className="bg-azure hover:bg-sky-blue px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-deep-blue">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Nogária Suprimentos Corporativos. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-neon-green transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-neon-green transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-neon-green transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
