
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from './SearchResults';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ className = "", placeholder = "Buscar produtos, categorias..." }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults, hasQuery, hasResults } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (hasQuery) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <div className="flex w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neon-green bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
        />
        <Button 
          onClick={handleSearch}
          className="h-[52px] px-6 bg-grass-green hover:bg-neon-green text-dark-navy rounded-l-none rounded-r-lg flex-shrink-0"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
      
      {isOpen && hasQuery && (
        <SearchResults
          results={searchResults}
          query={searchQuery}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
