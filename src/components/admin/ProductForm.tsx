import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Product, Category } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

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
    height_cm: '',
    width_cm: '',
    length_cm: '',
    stock_quantity: '',
    status: 'active',
    in_stock: true
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    if (product) {
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
        height_cm: product.height_cm?.toString() || '',
        width_cm: product.width_cm?.toString() || '',
        length_cm: product.length_cm?.toString() || '',
        stock_quantity: product.stock_quantity.toString(),
        status: product.status === 'active' ? 'active' : 'inactive',
        in_stock: product.in_stock
      });
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
        height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
        width_cm: formData.width_cm ? parseFloat(formData.width_cm) : null,
        length_cm: formData.length_cm ? parseFloat(formData.length_cm) : null,
        stock_quantity: parseInt(formData.stock_quantity),
        status: formData.status,
        in_stock: formData.in_stock
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

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="short_description">Descrição Curta</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição Completa</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
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
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="stock_quantity">Quantidade em Estoque *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                  required
                />
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
                <Label htmlFor="status">Status</Label>
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
                <Label htmlFor="ean">EAN (Código de Barras)</Label>
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

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="height_cm">Altura (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    step="0.01"
                    value={formData.height_cm}
                    onChange={(e) => setFormData({...formData, height_cm: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="width_cm">Largura (cm)</Label>
                  <Input
                    id="width_cm"
                    type="number"
                    step="0.01"
                    value={formData.width_cm}
                    onChange={(e) => setFormData({...formData, width_cm: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="length_cm">Comprimento (cm)</Label>
                  <Input
                    id="length_cm"
                    type="number"
                    step="0.01"
                    value={formData.length_cm}
                    onChange={(e) => setFormData({...formData, length_cm: e.target.value})}
                  />
                </div>
              </div>
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
