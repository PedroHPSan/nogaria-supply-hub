
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CalculatorLead {
  full_name: string;
  company_name: string;
  business_email: string;
  phone: string;
  cnpj?: string;
  company_segment?: string;
  job_title?: string;
  lgpd_consent: boolean;
}

export interface CalculatorResult {
  totalAreaM2: number;
  numeroFuncionarios: number;
  custoMensalTotal: number;
  custoComDesconto: number;
  percentualDesconto: number;
  productsByCategory: any;
  estimativaMensal: string;
}

export const useCalculatorLeads = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitCalculatorLead = async (
    leadData: CalculatorLead,
    calculatorData: any,
    calculationResult: CalculatorResult
  ) => {
    setIsSubmitting(true);
    
    try {
      // First, create a calculator result record
      const { data: resultData, error: resultError } = await supabase
        .from('calculator_results')
        .insert({
          company_size: `${calculationResult.numeroFuncionarios} funcionários`,
          monthly_usage: calculatorData,
          estimated_savings: calculationResult.custoMensalTotal - calculationResult.custoComDesconto,
          recommendations: calculationResult
        })
        .select()
        .single();

      if (resultError) {
        console.error('Error creating calculator result:', resultError);
        throw new Error('Erro ao salvar resultado do cálculo');
      }

      // Then, create the lead record
      const { data: leadRecord, error: leadError } = await supabase
        .from('calculator_leads')
        .insert({
          result_id: resultData.id,
          full_name: leadData.full_name,
          company_name: leadData.company_name,
          business_email: leadData.business_email,
          phone: leadData.phone,
          cnpj: leadData.cnpj,
          company_segment: leadData.company_segment,
          job_title: leadData.job_title,
          lgpd_consent: leadData.lgpd_consent
        })
        .select()
        .single();

      if (leadError) {
        console.error('Error creating calculator lead:', leadError);
        throw new Error('Erro ao salvar informações do lead');
      }

      toast({
        title: "Dados salvos com sucesso!",
        description: "Suas informações foram registradas e você receberá o relatório em breve.",
      });

      return { success: true, leadId: leadRecord.id, resultId: resultData.id };

    } catch (error: any) {
      console.error('Error submitting calculator lead:', error);
      
      toast({
        title: "Erro ao salvar dados",
        description: error.message || "Ocorreu um erro ao processar suas informações. Tente novamente.",
        variant: "destructive"
      });

      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackCalculatorSession = async (sessionData: any, completed: boolean = false) => {
    try {
      await supabase
        .from('calculator_sessions')
        .insert({
          session_data: sessionData,
          completed
        });
    } catch (error) {
      console.error('Error tracking calculator session:', error);
      // Don't throw error for analytics tracking
    }
  };

  return {
    submitCalculatorLead,
    trackCalculatorSession,
    isSubmitting
  };
};
