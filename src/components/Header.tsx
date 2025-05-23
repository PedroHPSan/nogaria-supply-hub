
import { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Categorias', href: '#categorias' },
    { label: 'Assinaturas', href: '/assinaturas' },
    { label: 'Atacado', href: '/atacado' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-dark-navy text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📞 Atendimento: (91) 99999-9999</span>
            <span>📧 vendas@nogaria.com.br</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>WhatsApp Business</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f6b72d18-2cb2-4bb0-8bb3-f79d31eb3f47.png" 
              alt="Nogária Logo" 
              className="h-12 w-auto"
            />
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-dark-navy">Nogária</h1>
              <p className="text-sm text-gray-600">Suprimentos Corporativos</p>
            </div>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos, categorias..."
                className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-azure"
              />
              <Button className="absolute right-0 top-0 h-full px-6 bg-azure hover:bg-deep-blue rounded-l-none">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-dark-navy hover:text-azure">
              <User className="w-5 h-5" />
              <span>Minha Conta</span>
            </Button>
            
            <Button variant="ghost" className="relative text-dark-navy hover:text-azure">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-neon-green text-dark-navy text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block mt-4">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-azure font-medium transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-azure"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-azure font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Minha Conta
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
