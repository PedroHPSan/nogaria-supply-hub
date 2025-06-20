
-- Fix existing policies by dropping and recreating them

-- Drop existing policies on user_roles if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;

-- Drop existing policies on cart_items if they exist
DROP POLICY IF EXISTS "Users can manage their own cart items" ON public.cart_items;

-- Drop existing policies on profiles if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Now create the corrected policies

-- 1. Add missing INSERT policy for profiles table
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Recreate existing policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Fix user_roles table security - Add comprehensive policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all user roles" ON public.user_roles
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert user roles" ON public.user_roles
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles" ON public.user_roles
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles" ON public.user_roles
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Secure cart_items table with comprehensive user isolation
CREATE POLICY "Users can view their own cart items" ON public.cart_items
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" ON public.cart_items
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" ON public.cart_items
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON public.cart_items
  FOR DELETE 
  USING (auth.uid() = user_id);

-- 4. Enhanced profile creation trigger with role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert user profile
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't block user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Add input validation function for contact submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate phone format (Brazilian format)
  IF NEW.telefone !~ '^\+?55\s?\(?[1-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$' AND 
     NEW.telefone !~ '^\(?[1-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$' THEN
    RAISE EXCEPTION 'Invalid phone format';
  END IF;
  
  -- Sanitize text inputs
  NEW.nome_completo = trim(NEW.nome_completo);
  NEW.empresa = trim(NEW.empresa);
  NEW.mensagem = trim(NEW.mensagem);
  
  -- Validate required fields are not empty after trimming
  IF length(NEW.nome_completo) < 2 THEN
    RAISE EXCEPTION 'Nome completo deve ter pelo menos 2 caracteres';
  END IF;
  
  IF length(NEW.empresa) < 2 THEN
    RAISE EXCEPTION 'Nome da empresa deve ter pelo menos 2 caracteres';
  END IF;
  
  IF length(NEW.mensagem) < 10 THEN
    RAISE EXCEPTION 'Mensagem deve ter pelo menos 10 caracteres';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for contact submission validation
DROP TRIGGER IF EXISTS validate_contact_submission_trigger ON public.contact_submissions;
CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT OR UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.validate_contact_submission();

-- 6. Add validation for job applications
CREATE OR REPLACE FUNCTION public.validate_job_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Sanitize text inputs
  NEW.nome_completo = trim(NEW.nome_completo);
  NEW.mensagem = trim(NEW.mensagem);
  
  -- Validate required fields
  IF length(NEW.nome_completo) < 2 THEN
    RAISE EXCEPTION 'Nome completo deve ter pelo menos 2 caracteres';
  END IF;
  
  IF length(NEW.mensagem) < 10 THEN
    RAISE EXCEPTION 'Mensagem deve ter pelo menos 10 caracteres';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for job application validation
DROP TRIGGER IF EXISTS validate_job_application_trigger ON public.job_applications;
CREATE TRIGGER validate_job_application_trigger
  BEFORE INSERT OR UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.validate_job_application();

-- 7. Create audit logging table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_log
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action TEXT,
  p_table_name TEXT DEFAULT NULL,
  p_record_id TEXT DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.admin_audit_log (
    admin_user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
