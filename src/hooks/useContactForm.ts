
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

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Map form data to database column names
      const dbData = {
        nome_completo: formData.nomeCompleto,
        empresa: formData.empresa,
        email: formData.email,
        telefone: formData.telefone,
        mensagem: formData.mensagem,
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([dbData]);

      if (error) throw error;

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato por telefone.",
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
