import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Product, Category } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    sku: '',
    price: '',
    category_id: '',
    brand: '',
    ean: '',
    weight_kg: '',
    dimensions: '', // Will store as "HxWxL" format
    stock_quantity: '',
    status: 'active',
    in_stock: true
  });
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    if (product) {
      // Parse dimensions from individual fields back to "HxWxL" format
      const dimensions = product.height_cm && product.width_cm && product.length_cm 
        ? `${product.height_cm}x${product.width_cm}x${product.length_cm}`
        : '';

      setFormData({
        name: product.name,
        description: product.description || '',
        short_description: product.short_description || '',
        sku: product.sku || '',
        price: product.price?.toString() || '',
        category_id: product.category_id || '',
        brand: product.brand || '',
        ean: product.ean || '',
        weight_kg: product.weight_kg?.toString() || '',
        dimensions: dimensions,
        stock_quantity: product.stock_quantity.toString(),
        status: product.status === 'active' ? 'active' : 'inactive',
        in_stock: product.in_stock
      });

      // Set images from product data
      if (product.images && product.images.length > 0) {
        setImages(product.images);
      } else if (product.image_url) {
        setImages([product.image_url]);
      }
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive"
      });
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome do produto é obrigatório';
    }

    if (!formData.sku.trim()) {
      errors.sku = 'ID do produto é obrigatório';
    }

    if (!formData.description.trim()) {
      errors.description = 'Descrição é obrigatória';
    }

    if (!formData.category_id) {
      errors.category_id = 'Categoria é obrigatória';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Preço deve ser maior que zero';
    }

    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
      errors.stock_quantity = 'Quantidade em estoque deve ser maior ou igual a zero';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const parseDimensions = (dimensionsStr: string) => {
    if (!dimensionsStr) return { height: null, width: null, length: null };
    
    const parts = dimensionsStr.split('x').map(part => parseFloat(part.trim()));
    if (parts.length === 3 && parts.every(part => !isNaN(part))) {
      return {
        height: parts[0],
        width: parts[1],
        length: parts[2]
      };
    }
    return { height: null, width: null, length: null };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, corrija os erros do formulário antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Parse dimensions
      const { height, width, length } = parseDimensions(formData.dimensions);

      const productData = {
        name: formData.name,
        description: formData.description || null,
        short_description: formData.short_description || null,
        sku: formData.sku || null,
        price: formData.price ? parseFloat(formData.price) : null,
        category_id: formData.category_id || null,
        brand: formData.brand || null,
        ean: formData.ean || null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        height_cm: height,
        width_cm: width,
        length_cm: length,
        stock_quantity: parseInt(formData.stock_quantity),
        status: formData.status,
        in_stock: formData.in_stock,
        images: images,
        image_url: images.length > 0 ? images[0] : null // First image as main image
      };

      let error;
      if (product) {
        ({ error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id));
      } else {
        ({ error } = await supabase
          .from('products')
          .insert([productData]));
      }

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Produto ${product ? 'atualizado' : 'criado'} com sucesso.`
      });
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o produto.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category_id);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h1>
          <p className="text-gray-600 mt-1">
            {product ? 'Modifique as informações do produto' : 'Adicione um novo produto ao catálogo'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sku">ID do produto *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className={formErrors.sku ? 'border-red-500' : ''}
                />
                {formErrors.sku && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.sku}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.name}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className={formErrors.description ? 'border-red-500' : ''}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select 
                  value={formData.category_id} 
                  onValueChange={(value) => setFormData({...formData, category_id: value})}
                >
                  <SelectTrigger className={formErrors.category_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione onde este produto aparecerá no catálogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory && (
                  <p className="text-green-600 text-sm mt-1">
                    ✓ Este produto aparecerá em: <strong>/catalog/{selectedCategory.slug}</strong>
                  </p>
                )}
                {formErrors.category_id && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.category_id}
                  </p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Selecione a categoria onde este produto deve aparecer no catálogo público.
                </p>
                {categories.length === 0 && (
                  <p className="text-amber-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Nenhuma categoria encontrada. <a href="/admin/categories" className="underline ml-1">Criar categoria</a>
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preço e Estoque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className={formErrors.price ? 'border-red-500' : ''}
                />
                {formErrors.price && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.price}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="stock_quantity">Quantidade em Estoque *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                  className={formErrors.stock_quantity ? 'border-red-500' : ''}
                />
                {formErrors.stock_quantity && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.stock_quantity}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="in_stock"
                  checked={formData.in_stock}
                  onCheckedChange={(checked) => setFormData({...formData, in_stock: checked})}
                />
                <Label htmlFor="in_stock">Produto em estoque</Label>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ean">Código de Barras (EAN)</Label>
                <Input
                  id="ean"
                  value={formData.ean}
                  onChange={(e) => setFormData({...formData, ean: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dimensões e Peso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weight_kg">Peso (kg)</Label>
                <Input
                  id="weight_kg"
                  type="number"
                  step="0.01"
                  value={formData.weight_kg}
                  onChange={(e) => setFormData({...formData, weight_kg: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="dimensions">Dimensões (Altura x Largura x Profundidade em cm)</Label>
                <Input
                  id="dimensions"
                  placeholder="Ex: 10x20x30"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formato: Altura x Largura x Profundidade (em centímetros)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Imagens do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={images}
                onImagesChange={setImages}
                maxImages={4}
                maxSizeInMB={1}
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
