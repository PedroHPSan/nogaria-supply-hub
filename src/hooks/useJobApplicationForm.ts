
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationFormData {
  nomeCompleto: string;
  email: string;
  linkedinPortfolio?: string;
  mensagem: string;
  curriculoFile?: File;
}

export function useJobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: JobApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Validate required fields on frontend
      if (!formData.nomeCompleto || formData.nomeCompleto.trim().length < 2) {
        throw new Error('Nome completo deve ter pelo menos 2 caracteres');
      }
      
      if (!formData.email || !formData.email.includes('@')) {
        throw new Error('E-mail inválido');
      }
      
      if (!formData.mensagem || formData.mensagem.trim().length < 10) {
        throw new Error('Mensagem deve ter pelo menos 10 caracteres');
      }

      // Map form data to database column names
      const dbData = {
        nome_completo: formData.nomeCompleto.trim(),
        email: formData.email.trim(),
        linkedin_portfolio: formData.linkedinPortfolio?.trim() || null,
        mensagem: formData.mensagem.trim(),
        curriculo_url: null, // Would be set after file upload
      };

      const { error } = await supabase
        .from('job_applications')
        .insert([dbData]);

      if (error) {
        // Handle database validation errors with user-friendly messages
        if (error.message.includes('Invalid email format')) {
          throw new Error('Formato de e-mail inválido');
        }
        if (error.message.includes('Nome completo deve ter pelo menos')) {
          throw new Error('Nome completo deve ter pelo menos 2 caracteres');
        }
        if (error.message.includes('Mensagem deve ter pelo menos')) {
          throw new Error('Mensagem deve ter pelo menos 10 caracteres');
        }
        throw error;
      }

      toast({
        title: "Candidatura enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Job application submission error:', error);
      
      toast({
        title: "Erro ao enviar candidatura",
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
  };
}
