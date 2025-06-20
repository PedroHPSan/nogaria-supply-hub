
export interface Profile {
  id: string;
  email: string;
  company_name?: string | null;
  cnpj?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  slug: string;
  image_url?: string | null;
  parent_id?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  short_description?: string | null;
  sku?: string | null;
  price?: number | null;
  category_id?: string | null;
  image_url?: string | null;
  images?: string[] | null;
  in_stock: boolean;
  stock_quantity: number;
  specifications?: any | null;
  brand?: string | null;
  ean?: string | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  width_cm?: number | null;
  length_cm?: number | null;
  status?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string | null;
  updated_at: string | null;
  product?: Product;
}

export interface Order {
  id: string;
  user_id?: string | null;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method?: 'pix' | 'credit_card' | 'bank_slip' | 'b2b_invoice' | null;
  total_amount: number;
  shipping_address?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company: string;
  cnpj?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  billing_period: string;
  features?: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  start_date?: string | null;
  end_date?: string | null;
  auto_renew: boolean;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  nome_completo: string;
  empresa: string;
  email: string;
  telefone: string;
  mensagem: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  nome_completo: string;
  email: string;
  linkedin_portfolio?: string | null;
  mensagem: string;
  curriculo_url?: string | null;
  status: 'received' | 'reviewing' | 'interview' | 'hired' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface CalculatorResult {
  id: string;
  user_id?: string | null;
  company_size?: string | null;
  monthly_usage?: any | null;
  estimated_savings?: number | null;
  recommendations?: any | null;
  created_at: string;
}

export interface CalculatorLead {
  id: string;
  result_id?: string | null;
  full_name: string;
  company_name: string;
  business_email: string;
  phone: string;
  cnpj?: string | null;
  company_segment?: string | null;
  job_title?: string | null;
  lgpd_consent: boolean;
  created_at: string;
}
