import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const productCategories = [
    { name: 'Material de Limpeza', path: '/catalog/limpeza' },
    { name: 'Produtos de Higiene', path: '/catalog/higiene' },
    { name: 'EPI - Equipamentos', path: '/catalog/epi' },
    { name: 'Descartáveis', path: '/catalog/descartaveis' },
    { name: 'Plásticos', path: '/catalog/plasticos' },
    { name: 'Papelaria', path: '/catalog/papelaria' },
    { name: 'Material de Escritório', path: '/catalog/escritorio' },
    { name: 'Suprimentos de TI', path: '/catalog/informatica' }
  ];

  const companyLinks = [
    { name: 'Sobre a Nogária', path: '/sobre' },
    { name: 'Nossa História', path: '/sobre' },
    { name: 'Trabalhe Conosco', path: '/trabalhe-conosco' },
    { name: 'Política de Qualidade', path: '/sobre' },
    { name: 'Certificações', path: '/sobre' }
  ];

  const serviceLinks = [
    { name: 'Como Comprar', path: '/catalog' },
    { name: 'Formas de Pagamento', path: '/contato' },
    { name: 'Entrega e Frete', path: '/contato' },
    { name: 'Trocas e Devoluções', path: '/contato' },
    { name: 'FAQ', path: '/contato' }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with an email service
    alert('Obrigado por se inscrever! Em breve você receberá nossas ofertas especiais.');
  };

  return (
    <footer className="bg-dark-navy text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => handleLinkClick('/')}>
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
                <a 
                  href="tel:+5591993717808" 
                  className="text-gray-300 hover:text-neon-green transition-colors"
                >
                  (91) 99371-7808
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-sky-blue mr-3" />
                <a 
                  href="mailto:vendas@nogaria.com.br" 
                  className="text-gray-300 hover:text-neon-green transition-colors"
                >
                  vendas@nogaria.com.br
                </a>
              </div>
            </div>
          </div>
          
          {/* Product categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Produtos</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <button 
                    onClick={() => handleLinkClick(category.path)}
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200 text-left"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Service links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-sky-blue">Atendimento</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-300 hover:text-neon-green transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Social media */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4 text-sky-blue">Siga-nos</h5>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/nogaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-neon-green transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com/nogaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-neon-green transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com/company/nogaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-neon-green transition-colors"
                >
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
            
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail corporativo"
                required
                className="px-4 py-3 bg-deep-blue border border-azure rounded-l-lg focus:outline-none focus:ring-2 focus:ring-azure text-white placeholder-gray-400 flex-grow md:w-80"
              />
              <button 
                type="submit"
                className="bg-azure hover:bg-sky-blue px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200"
              >
                Inscrever
              </button>
            </form>
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
              <button 
                onClick={() => handleLinkClick('/privacy-policy')}
                className="hover:text-neon-green transition-colors"
              >
                Política de Privacidade
              </button>
              <button 
                onClick={() => handleLinkClick('/terms-of-use')}
                className="hover:text-neon-green transition-colors"
              >
                Termos de Uso
              </button>
              <button 
                onClick={() => handleLinkClick('/lgpd')}
                className="hover:text-neon-green transition-colors"
              >
                LGPD
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
