import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import GifSelector from './GifSelector';

interface CategoryFormProps {
  category?: Category | null;
  onSave: () => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSave, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: ''
  });
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        image_url: category.image_url || ''
      });
      
      // Check if the current image_url is one of our predefined GIFs
      if (category.image_url && category.image_url.startsWith('/assets/gifs/')) {
        setSelectedGif(category.image_url);
      } else {
        setSelectedGif(null);
      }
    }
  }, [category]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleGifSelect = (imagePath: string | null) => {
    setSelectedGif(imagePath);
    if (imagePath) {
      // Clear custom image URL when gallery image is selected
      setFormData(prev => ({ ...prev, image_url: '' }));
    }
  };

  const handleImageUrlChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
    if (imageUrl) {
      // Clear gallery selection when custom image is provided
      setSelectedGif(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use selected gallery image if available, otherwise use custom image URL
      const finalImageUrl = selectedGif || formData.image_url || null;
      
      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        image_url: finalImageUrl
      };

      let error;
      if (category) {
        ({ error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', category.id));
      } else {
        ({ error } = await supabase
          .from('categories')
          .insert([categoryData]));
      }

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Categoria ${category ? 'atualizada' : 'criada'} com sucesso.`
      });
      onSave();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a categoria.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações da Categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">Nome da Categoria *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                URL amigável gerada automaticamente. Ex: "produtos-limpeza"
              </p>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            {/* Image/Gallery Selection */}
            <div>
              <GifSelector 
                selectedGif={selectedGif}
                onGifSelect={handleGifSelect}
              />
            </div>

            {/* Custom Image URL - After the Gallery selector */}
            <div>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            {/* Preview of selected image */}
            {(selectedGif || formData.image_url) && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Preview da imagem selecionada
                </Label>
                <div className="w-40 h-28 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img 
                    src={selectedGif || formData.image_url} 
                    alt="Preview da categoria"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Categoria'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
