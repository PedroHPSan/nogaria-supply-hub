
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface GifOption {
  path: string;
  label: string;
  name: string;
}

interface GifSelectorProps {
  selectedGif: string | null;
  onGifSelect: (gifPath: string | null) => void;
}

const GIF_OPTIONS: GifOption[] = [
  { path: '/assets/gifs/cleaning.gif', label: 'Limpeza', name: 'cleaning' },
  { path: '/assets/gifs/hygiene.gif', label: 'Higiene', name: 'hygiene' },
  { path: '/assets/gifs/ppe.gif', label: 'EPI', name: 'ppe' },
  { path: '/assets/gifs/disposables.gif', label: 'Descartáveis', name: 'disposables' },
  { path: '/assets/gifs/plastics.gif', label: 'Plásticos', name: 'plastics' },
  { path: '/assets/gifs/stationery.gif', label: 'Papelaria', name: 'stationery' },
  { path: '/assets/gifs/office-supplies.gif', label: 'Material de Escritório', name: 'office-supplies' },
  { path: '/assets/gifs/it-supplies.gif', label: 'Informática', name: 'it-supplies' }
];

const GifSelector = ({ selectedGif, onGifSelect }: GifSelectorProps) => {
  const handleGifClick = (gifPath: string) => {
    if (selectedGif === gifPath) {
      onGifSelect(null); // Deselect if already selected
    } else {
      onGifSelect(gifPath);
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-3 block">
        Escolha um GIF homologado
      </Label>
      <p className="text-sm text-gray-500 mb-4">
        Selecione um GIF da galeria abaixo ou envie sua própria imagem.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GIF_OPTIONS.map((gif) => (
          <Card 
            key={gif.name}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedGif === gif.path 
                ? 'ring-2 ring-green-500 border-green-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleGifClick(gif.path)}
          >
            <CardContent className="p-3">
              <div className="relative">
                <div className="w-full h-20 bg-gray-100 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                  <img 
                    src={gif.path} 
                    alt={gif.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if GIF doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNS41MjI5IDMwIDMwIDI1LjUyMjkgMzAgMjBDMzAgMTQuNDc3MSAyNS41MjI5IDEwIDIwIDEwQzE0LjQ3NzEgMTAgMTAgMTQuNDc3MSAxMCAyMEMxMCAyNS41MjI5IDE0LjQ3NzEgMzAgMjAgMzBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                    }}
                  />
                </div>
                
                {selectedGif === gif.path && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              
              <p className="text-xs text-center text-gray-700 font-medium">
                {gif.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedGif && (
        <p className="text-sm text-green-600 mt-3 flex items-center">
          <Check className="w-4 h-4 mr-1" />
          GIF selecionado: {GIF_OPTIONS.find(g => g.path === selectedGif)?.label}
        </p>
      )}
    </div>
  );
};

export default GifSelector;
