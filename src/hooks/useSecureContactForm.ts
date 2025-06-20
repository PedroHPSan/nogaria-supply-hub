
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  nomeCompleto: string;
  empresa: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export function useSecureContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validatePhoneNumber = (phone: string): boolean => {
    // Brazilian phone format validation
    const phoneRegex = /^(\+?55\s?)?\(?[1-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Frontend validation with detailed error messages
      if (!formData.nomeCompleto || formData.nomeCompleto.trim().length < 2) {
        throw new Error('Nome completo deve ter pelo menos 2 caracteres');
      }
      
      if (!formData.empresa || formData.empresa.trim().length < 2) {
        throw new Error('Nome da empresa deve ter pelo menos 2 caracteres');
      }
      
      if (!formData.email || !validateEmail(formData.email)) {
        throw new Error('Formato de e-mail inválido');
      }
      
      if (!formData.telefone || !validatePhoneNumber(formData.telefone)) {
        throw new Error('Formato de telefone inválido. Use o formato (XX) XXXXX-XXXX');
      }
      
      if (!formData.mensagem || formData.mensagem.trim().length < 10) {
        throw new Error('Mensagem deve ter pelo menos 10 caracteres');
      }

      // Sanitize data before sending
      const sanitizedData = {
        nome_completo: formData.nomeCompleto.trim(),
        empresa: formData.empresa.trim(),
        email: formData.email.trim().toLowerCase(),
        telefone: formData.telefone.trim(),
        mensagem: formData.mensagem.trim(),
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([sanitizedData]);

      if (error) {
        // Handle database validation errors with user-friendly messages
        if (error.message.includes('Invalid email format')) {
          throw new Error('Formato de e-mail inválido');
        }
        if (error.message.includes('Invalid phone format')) {
          throw new Error('Formato de telefone inválido');
        }
        if (error.message.includes('Nome completo deve ter pelo menos')) {
          throw new Error('Nome completo muito curto');
        }
        if (error.message.includes('Nome da empresa deve ter pelo menos')) {
          throw new Error('Nome da empresa muito curto');
        }
        if (error.message.includes('Mensagem deve ter pelo menos')) {
          throw new Error('Mensagem muito curta');
        }
        throw error;
      }

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
    validatePhoneNumber,
    validateEmail,
  };
}
