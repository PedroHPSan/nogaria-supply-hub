
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
    <div className="space-y-6">
      {/* Main Title */}
      <div>
        <Label className="text-base font-semibold text-gray-800 mb-2 block">
          Escolha uma imagem para representar esta categoria no catálogo
        </Label>
        <p className="text-sm text-gray-600">
          Clique em uma imagem abaixo ou envie sua própria imagem personalizada. Esta imagem será exibida no card da categoria no catálogo.
        </p>
      </div>

      {/* Gallery Section */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Galeria de imagens pré-aprovadas
        </Label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GIF_OPTIONS.map((gif) => (
            <Card 
              key={gif.name}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedGif === gif.path 
                  ? 'ring-2 ring-green-500 border-green-500 shadow-md bg-green-50' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
              onClick={() => handleGifClick(gif.path)}
            >
              <CardContent className="p-4">
                <div className="relative">
                  {/* Image Container */}
                  <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
                    <img 
                      src={gif.path} 
                      alt={gif.label}
                      className="w-full h-full object-cover transition-opacity duration-200"
                      onError={(e) => {
                        // Fallback if GIF doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNS41MjI5IDMwIDMwIDI1LjUyMjkgMzAgMjBDMzAgMTQuNDc3MSAyNS41MjI5IDEwIDIwIDEwQzE0LjQ3NzEgMTAgMTAgMTQuNDc3MSAxMCAyMEMxMCAyNS41MjI5IDE0LjQ3NzEgMzAgMjAgMzBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                      }}
                    />
                    
                    {/* Selection Overlay */}
                    {selectedGif === gif.path && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <p className="text-sm text-center text-gray-700 font-medium leading-tight">
                    {gif.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Selection Feedback */}
        {selectedGif && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 flex items-center">
              <Check className="w-4 h-4 mr-2" />
              <strong>Imagem selecionada:</strong> {GIF_OPTIONS.find(g => g.path === selectedGif)?.label}
            </p>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="flex items-center space-x-4">
        <Separator className="flex-1" />
        <span className="text-sm text-gray-500 font-medium">OU</span>
        <Separator className="flex-1" />
      </div>

      {/* Custom Upload Section Label */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Envie sua própria imagem personalizada
        </Label>
        <p className="text-xs text-gray-500">
          Formato recomendado: JPG, PNG ou GIF. Tamanho máximo: 2MB.
        </p>
      </div>
    </div>
  );
};

export default GifSelector;
