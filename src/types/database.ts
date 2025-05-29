
export interface Profile {
  id: string;
  company_name?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
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
  notes?: string;
  created_at: string;
  updated_at: string;
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
