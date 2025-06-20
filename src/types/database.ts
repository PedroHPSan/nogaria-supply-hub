export interface Profile {
  id: string;
  email: string;
  company_name?: string;
  cnpj?: string;
  phone?: string;
  address?: string;
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
  description?: string;
  slug: string;
  image_url?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  short_description?: string;
  sku?: string;
  price?: number;
  category_id?: string;
  image_url?: string;
  images?: string[];
  in_stock: boolean;
  stock_quantity: number;
  specifications?: any;
  brand?: string;
  ean?: string;
  weight_kg?: number;
  height_cm?: number;
  width_cm?: number;
  length_cm?: number;
  status?: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id?: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method?: 'pix' | 'credit_card' | 'bank_slip' | 'b2b_invoice';
  total_amount: number;
  shipping_address?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company: string;
  cnpj?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  billing_period: string;
  features?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  start_date?: string;
  end_date?: string;
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
  linkedin_portfolio?: string;
  mensagem: string;
  curriculo_url?: string;
  status: 'received' | 'reviewing' | 'interview' | 'hired' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface CalculatorResult {
  id: string;
  user_id?: string;
  company_size?: string;
  monthly_usage?: any;
  estimated_savings?: number;
  recommendations?: any;
  created_at: string;
}

export interface CalculatorLead {
  id: string;
  result_id?: string;
  full_name: string;
  company_name: string;
  business_email: string;
  phone: string;
  cnpj?: string;
  company_segment?: string;
  job_title?: string;
  lgpd_consent: boolean;
  created_at: string;
}
