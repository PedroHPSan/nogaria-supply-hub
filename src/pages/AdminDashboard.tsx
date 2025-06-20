
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import ProductsManagement from '@/components/admin/ProductsManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';
import UsersManagement from '@/components/admin/UsersManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import ContactsManagement from '@/components/admin/ContactsManagement';
import ApplicationsManagement from '@/components/admin/ApplicationsManagement';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user || !isAdmin) {
        navigate('/admin/login');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="customers" element={<UsersManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="applications" element={<ApplicationsManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
