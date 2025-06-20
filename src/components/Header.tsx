
import { useState } from 'react';
import { Menu, X, User, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Calcule sua necessidade', href: '/calculadora', isNew: true },
    { label: 'Assinaturas', href: '/assinaturas' },
    { label: 'Catálogo', href: '/catalog' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
    { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
  ];

  const handleCartClick = () => {
    navigate('/checkout');
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-gradient-to-b from-dark-navy to-sky-blue text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-dark-navy/80 backdrop-blur-sm text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📞 Atendimento: (91) 99371-7808</span>
            <span>📧 vendas@nogaria.com.br</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://wa.me/5591993717808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-neon-green transition-colors"
            >
              <img 
                src="/lovable-uploads/65be387d-156c-4cb1-aa9a-e3ba406c6226.png" 
                alt="WhatsApp Business" 
                className="w-4 h-4"
              />
              <span>WhatsApp Business</span>
            </a>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleAdminClick}
              className="text-xs text-white/80 hover:text-white hover:bg-white/10"
            >
              Área do Administrador
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/30145d0a-0baf-4fc4-86a4-2c72d1be5c67.png" 
              alt="Nogária Logo" 
              className="h-12 w-auto"
            />
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-white">Nogária</h1>
              <p className="text-sm text-sky-blue font-light">Suprimentos Corporativos</p>
            </div>
          </div>

          {/* Search bar - Desktop */}
          <SearchBar className="hidden md:flex flex-1 max-w-2xl mx-8" />

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2 text-white hover:text-neon-green hover:bg-white/10"
              onClick={handleAuthClick}
            >
              <User className="w-5 h-5" />
              <span>{user ? 'Sair' : 'Minha Conta'}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="relative text-white hover:text-neon-green hover:bg-white/10"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-neon-green text-dark-navy text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden mt-4">
          <SearchBar placeholder="Buscar produtos..." />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block mt-4">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-white/90 hover:text-neon-green font-medium transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-neon-green flex items-center gap-2"
                >
                  {item.label}
                  {item.isNew && (
                    <Badge variant="secondary" className="bg-neon-green text-dark-navy text-xs font-bold px-2 py-1">
                      NEW
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-navy/90 backdrop-blur-sm border-t border-white/20">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="block text-white/90 hover:text-neon-green font-medium py-2 w-full text-left flex items-center gap-2"
                  >
                    {item.label}
                    {item.isNew && (
                      <Badge variant="secondary" className="bg-neon-green text-dark-navy text-xs font-bold px-2 py-1">
                        NEW
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
              <li>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={handleAuthClick}
                >
                  <User className="w-4 h-4 mr-2" />
                  {user ? 'Sair' : 'Minha Conta'}
                </Button>
              </li>
              <li>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={handleAdminClick}
                >
                  Área do Administrador
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
