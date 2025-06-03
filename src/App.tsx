
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
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import TrabalheConosco from "./pages/TrabalheConosco";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import LGPDInfo from "./pages/LGPDInfo";
import AuthPage from "./components/auth/AuthPage";
import NotFound from "./pages/NotFound";

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
            <Route path="/catalog/escritorio" element={<CategoryOffice />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/lgpd" element={<LGPDInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
