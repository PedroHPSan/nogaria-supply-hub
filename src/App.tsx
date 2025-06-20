import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Assinaturas from "./pages/Assinaturas";
import Catalog from "./pages/Catalog";
import Calculator from "./pages/Calculator";
import Checkout from "./pages/Checkout";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import CategoryIT from "./pages/CategoryIT";
import CategoryCleaning from "./pages/CategoryCleaning";
import CategoryOffice from "./pages/CategoryOffice";
import CategoryHygiene from "./pages/CategoryHygiene";
import CategoryPPE from "./pages/CategoryPPE";
import CategoryDisposables from "./pages/CategoryDisposables";
import CategoryPlastics from "./pages/CategoryPlastics";
import CategoryStationery from "./pages/CategoryStationery";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import TrabalheConosco from "./pages/TrabalheConosco";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import LGPDInfo from "./pages/LGPDInfo";
import AuthPage from "./components/auth/AuthPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminOverview from "./components/admin/AdminOverview";
import ProductsManagement from "./components/admin/ProductsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/assinaturas" element={<Assinaturas />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/it" element={<CategoryIT />} />
            <Route path="/catalog/limpeza" element={<CategoryCleaning />} />
            <Route path="/catalog/higiene" element={<CategoryHygiene />} />
            <Route path="/catalog/epi" element={<CategoryPPE />} />
            <Route path="/catalog/descartaveis" element={<CategoryDisposables />} />
            <Route path="/catalog/plasticos" element={<CategoryPlastics />} />
            <Route path="/catalog/papelaria" element={<CategoryStationery />} />
            <Route path="/catalog/escritorio" element={<CategoryOffice />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/lgpd" element={<LGPDInfo />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="orders" element={<div>Orders Management - Em desenvolvimento</div>} />
              <Route path="customers" element={<div>Customers Management - Em desenvolvimento</div>} />
              <Route path="contacts" element={<div>Contacts Management - Em desenvolvimento</div>} />
              <Route path="applications" element={<div>Applications Management - Em desenvolvimento</div>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
