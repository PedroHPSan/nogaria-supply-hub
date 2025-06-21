
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import CategoryForm from './CategoryForm';

interface CategoryWithProductCount extends Category {
  product_count?: number;
}

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // First get categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoriesError) throw categoriesError;

      // Then get product counts for each category
      const categoriesWithCounts = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);
          
          return {
            ...category,
            product_count: count || 0
          };
        })
      );

      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, categoryName: string) => {
    // Check if category has products
    const category = categories.find(c => c.id === id);
    if (category && category.product_count && category.product_count > 0) {
      toast({
        title: "Erro",
        description: `Não é possível excluir a categoria "${categoryName}" pois ela possui ${category.product_count} produto(s) associado(s).`,
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCategories(categories.filter(c => c.id !== id));
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso."
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a categoria.",
        variant: "destructive"
      });
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm || editingCategory) {
    return (
      <CategoryForm
        category={editingCategory}
        onSave={() => {
          setShowForm(false);
          setEditingCategory(null);
          fetchCategories();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingCategory(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Categorias</h1>
          <p className="text-gray-600 mt-2">
            Gerencie as categorias que aparecem no catálogo público. Todas as alterações refletem imediatamente no site.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Categorias ({categories.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3">Carregando categorias...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Slug (URL)</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">Produtos</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          /catalog/{category.slug}
                        </code>
                      </TableCell>
                      <TableCell>{category.description || 'N/A'}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Package className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="font-semibold">{category.product_count || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {category.created_at ? new Date(category.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCategory(category)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(category.id, category.name)}
                            className="text-red-600 hover:text-red-700"
                            disabled={category.product_count && category.product_count > 0}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria cadastrada'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? 'Tente ajustar os termos de busca'
                      : 'Crie sua primeira categoria para organizar os produtos'
                    }
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeira Categoria
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManagement;
