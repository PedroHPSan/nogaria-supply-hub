
-- Let's fix the functions one by one to avoid conflicts
-- First, let's update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix handle_new_user function  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;

-- Fix has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Fix validate_contact_submission function
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
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
$$;

-- Fix validate_job_application function
CREATE OR REPLACE FUNCTION public.validate_job_application()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
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
$$;

-- Fix log_admin_action function
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action TEXT,
  p_table_name TEXT DEFAULT NULL,
  p_record_id TEXT DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;
