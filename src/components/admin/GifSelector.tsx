
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check } from 'lucide-react';

interface ImageOption {
  path: string;
  label: string;
  name: string;
}

interface GifSelectorProps {
  selectedGif: string | null;
  onGifSelect: (gifPath: string | null) => void;
}

const IMAGE_OPTIONS: ImageOption[] = [
  // Cleaning & Hygiene
  { path: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', label: 'Limpeza', name: 'cleaning' },
  { path: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', label: 'Higiene', name: 'hygiene' },
  { path: 'https://images.unsplash.com/photo-1631947430066-48c30d57b943', label: 'Produtos de Limpeza', name: 'cleaning-supplies' },
  
  // Safety & PPE
  { path: 'https://images.unsplash.com/photo-1518770660439-4636190af475', label: 'EPI', name: 'ppe' },
  { path: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f', label: 'Segurança', name: 'safety' },
  
  // Office & Stationery
  { path: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', label: 'Papelaria', name: 'stationery' },
  { path: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', label: 'Material de Escritório', name: 'office-supplies' },
  { path: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', label: 'Escritório Moderno', name: 'modern-office' },
  { path: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5', label: 'Organização', name: 'organization' },
  
  // Technology & IT
  { path: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', label: 'Informática', name: 'it-supplies' },
  { path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1', label: 'Tecnologia', name: 'technology' },
  { path: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', label: 'Programação', name: 'programming' },
  { path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', label: 'Computadores', name: 'computers' },
  
  // Disposables & Packaging
  { path: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', label: 'Descartáveis', name: 'disposables' },
  { path: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', label: 'Plásticos', name: 'plastics' },
  { path: 'https://images.unsplash.com/photo-1607748964467-d83a3304a5c8', label: 'Embalagens', name: 'packaging' },
  { path: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43', label: 'Sustentabilidade', name: 'sustainability' },
  
  // Food & Kitchen
  { path: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136', label: 'Cozinha Industrial', name: 'industrial-kitchen' },
  { path: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', label: 'Utensílios', name: 'utensils' },
  { path: 'https://images.unsplash.com/photo-1574484284002-952d92456975', label: 'Alimentação', name: 'food-service' },
  
  // Healthcare & Medical
  { path: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56', label: 'Saúde', name: 'healthcare' },
  { path: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f', label: 'Médico', name: 'medical' },
  
  // Industrial & Manufacturing
  { path: 'https://images.unsplash.com/photo-1565024557982-d9cb12b8e3b8', label: 'Industrial', name: 'industrial' },
  { path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758', label: 'Manufatura', name: 'manufacturing' },
  
  // General Business
  { path: 'https://images.unsplash.com/photo-1497366216548-37526070297c', label: 'Negócios', name: 'business' },
  { path: 'https://images.unsplash.com/photo-1553877522-43269d4ea984', label: 'Corporativo', name: 'corporate' },
  { path: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72', label: 'Gestão', name: 'management' }
];

const GifSelector = ({ selectedGif, onGifSelect }: GifSelectorProps) => {
  const handleImageClick = (imagePath: string) => {
    if (selectedGif === imagePath) {
      onGifSelect(null); // Deselect if already selected
    } else {
      onGifSelect(imagePath);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Main Title */}
        <div>
          <Label className="text-base font-semibold text-gray-800 mb-2 block">
            Selecione abaixo a imagem que irá representar a categoria no catálogo
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
            {IMAGE_OPTIONS.map((image) => (
              <Tooltip key={image.name}>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedGif === image.path 
                        ? 'ring-2 ring-green-500 border-green-500 shadow-md bg-green-50' 
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                    onClick={() => handleImageClick(image.path)}
                  >
                    <CardContent className="p-2">
                      <div className="relative">
                        {/* Image Container */}
                        <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                          <img 
                            src={image.path} 
                            alt={image.label}
                            className="w-full h-full object-cover transition-opacity duration-200"
                            onError={(e) => {
                              // Fallback if image doesn't exist
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNS41MjI5IDMwIDMwIDI1LjUyMjkgMzAgMjBDMzAgMTQuNDc3MSAyNS41MjI5IDEwIDIwIDEwQzE0LjQ3NzEgMTAgMTAgMTQuNDc3MSAxMCAyMEMxMCAyNS41MjI5IDE0LjQ3NzEgMzAgMjAgMzBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                            }}
                          />
                          
                          {/* Selection Overlay */}
                          {selectedGif === image.path && (
                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                              <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                                <Check className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{image.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          
          {/* Selection Feedback */}
          {selectedGif && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <strong>Imagem selecionada:</strong> {IMAGE_OPTIONS.find(img => img.path === selectedGif)?.label}
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
    </TooltipProvider>
  );
};

export default GifSelector;
