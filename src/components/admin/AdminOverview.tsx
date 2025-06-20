
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Users, MessageSquare } from 'lucide-react';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: products },
          { count: orders },
          { count: customers },
          { count: contacts }
        ] = await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          products: products || 0,
          orders: orders || 0,
          customers: customers || 0,
          contacts: contacts || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { icon: Package, label: 'Produtos', value: stats.products, color: 'text-blue-600' },
    { icon: ShoppingCart, label: 'Pedidos', value: stats.orders, color: 'text-green-600' },
    { icon: Users, label: 'Clientes', value: stats.customers, color: 'text-purple-600' },
    { icon: MessageSquare, label: 'Contatos', value: stats.contacts, color: 'text-orange-600' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Dashboard em desenvolvimento...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios Rápidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Relatórios em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
