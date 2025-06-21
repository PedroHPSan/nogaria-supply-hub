
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

interface CategoryFormProps {
  category?: Category | null;
  onSave: () => void;
  onCancel: () => void;
}

// Default image for all categories - modern minimalist design
const DEFAULT_CATEGORY_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMjQiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIvPgo8cGF0aCBkPSJNODUgODVIMTE1VjExNUg4NVY4NVoiIGZpbGw9InVybCgjZ3JhZGllbnQxX2xpbmVhcl8xXzEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMV8xIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIyMDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM5QjJEQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMEI5ODEiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDFfbGluZWFyXzFfMSIgeDE9Ijg1IiB5MT0iODUiIHgyPSIxMTUiIHkyPSIxMTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM5QjJEQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMEI5ODEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';

const CategoryForm = ({ category, onSave, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || ''
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        image_url: DEFAULT_CATEGORY_IMAGE // Always use default image
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

            {/* Preview of default image */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Imagem da categoria
              </Label>
              <div className="w-40 h-28 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                <img 
                  src={DEFAULT_CATEGORY_IMAGE} 
                  alt="Imagem padrão da categoria"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Uma imagem padrão será automaticamente atribuída a esta categoria.
              </p>
            </div>
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
