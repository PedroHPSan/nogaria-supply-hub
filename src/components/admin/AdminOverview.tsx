
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Package, Users, ShoppingCart, MessageSquare, FolderOpen, Briefcase } from 'lucide-react';

interface DashboardStats {
  products: number;
  categories: number;
  users: number;
  orders: number;
  contacts: number;
  applications: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
    contacts: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: productsCount },
        { count: categoriesCount },
        { count: usersCount },
        { count: ordersCount },
        { count: contactsCount },
        { count: applicationsCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        products: productsCount || 0,
        categories: categoriesCount || 0,
        users: usersCount || 0,
        orders: ordersCount || 0,
        contacts: contactsCount || 0,
        applications: applicationsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Produtos Cadastrados',
      value: stats.products,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Categorias Ativas',
      value: stats.categories,
      icon: FolderOpen,
      color: 'text-green-600'
    },
    {
      title: 'Usuários Ativos',
      value: stats.users,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Pedidos Realizados',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'text-orange-600'
    },
    {
      title: 'Mensagens de Contato',
      value: stats.contacts,
      icon: MessageSquare,
      color: 'text-pink-600'
    },
    {
      title: 'Candidaturas',
      value: stats.applications,
      icon: Briefcase,
      color: 'text-indigo-600'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Visão geral e gerenciamento do sistema Nogária</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <IconComponent className={`w-5 h-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : card.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOverview;
