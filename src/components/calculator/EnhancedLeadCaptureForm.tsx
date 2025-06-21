import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { useCalculatorLeads, CalculatorLead } from '@/hooks/useCalculatorLeads';
import { CalculationResult } from './CalculationEngine';

interface EnhancedLeadCaptureFormProps {
  calculatorData: any;
  calculationResult: CalculationResult;
  onSubmit: (result: any) => void;
  onBack: () => void;
}

const EnhancedLeadCaptureForm = ({ 
  calculatorData, 
  calculationResult, 
  onSubmit, 
  onBack 
}: EnhancedLeadCaptureFormProps) => {
  const { submitCalculatorLead, isSubmitting } = useCalculatorLeads();
  
  const [formData, setFormData] = useState<CalculatorLead>({
    full_name: '',
    company_name: '',
    business_email: '',
    phone: '',
    cnpj: '',
    company_segment: '',
    job_title: '',
    lgpd_consent: false,
  });

  const [errors, setErrors] = useState<Partial<CalculatorLead>>({});

  const companySegments = [
    'Saúde e Hospitalar',
    'Educação',
    'Hotelaria e Turismo',
    'Escritórios e Corporativo',
    'Varejo e Comércio',
    'Indústria',
    'Serviços',
    'Governo e Setor Público',
    'Outros'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CalculatorLead> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Nome completo é obrigatório';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Nome da empresa é obrigatório';
    }

    if (!formData.business_email.trim()) {
      newErrors.business_email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.business_email)) {
      newErrors.business_email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.lgpd_consent) {
      newErrors.lgpd_consent = 'Consentimento LGPD é obrigatório' as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: keyof CalculatorLead, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await submitCalculatorLead(formData, calculatorData, calculationResult);
    
    if (result.success) {
      onSubmit({
        ...result,
        email: formData.business_email
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-navy mb-4">
              Precisamos dos seus dados para enviar o relatório
            </h2>
            <p className="text-lg text-gray-600">
              Suas informações são seguras e utilizadas apenas para envio do relatório personalizado
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-dark-navy">
                    <User className="w-5 h-5 mr-2" />
                    Dados para Contato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name">Nome Completo *</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => updateFormData('full_name', e.target.value)}
                          placeholder="Seu nome completo"
                          className={errors.full_name ? 'border-red-500' : ''}
                        />
                        {errors.full_name && (
                          <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="business_email">Email Corporativo *</Label>
                        <Input
                          id="business_email"
                          type="email"
                          value={formData.business_email}
                          onChange={(e) => updateFormData('business_email', e.target.value)}
                          placeholder="email@empresa.com"
                          className={errors.business_email ? 'border-red-500' : ''}
                        />
                        {errors.business_email && (
                          <p className="text-sm text-red-500 mt-1">{errors.business_email}</p>
                        )}
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_name">Nome da Empresa *</Label>
                        <Input
                          id="company_name"
                          value={formData.company_name}
                          onChange={(e) => updateFormData('company_name', e.target.value)}
                          placeholder="Nome da empresa"
                          className={errors.company_name ? 'border-red-500' : ''}
                        />
                        {errors.company_name && (
                          <p className="text-sm text-red-500 mt-1">{errors.company_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Optional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cnpj">CNPJ (Opcional)</Label>
                        <Input
                          id="cnpj"
                          value={formData.cnpj || ''}
                          onChange={(e) => updateFormData('cnpj', e.target.value)}
                          placeholder="00.000.000/0000-00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="job_title">Cargo (Opcional)</Label>
                        <Input
                          id="job_title"
                          value={formData.job_title || ''}
                          onChange={(e) => updateFormData('job_title', e.target.value)}
                          placeholder="Seu cargo na empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company_segment">Segmento da Empresa (Opcional)</Label>
                      <Select onValueChange={(value) => updateFormData('company_segment', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySegments.map((segment) => (
                            <SelectItem key={segment} value={segment}>
                              {segment}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* LGPD Consent */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="lgpd_consent"
                          checked={formData.lgpd_consent}
                          onCheckedChange={(checked) => updateFormData('lgpd_consent', checked as boolean)}
                        />
                        <Label htmlFor="lgpd_consent" className="text-sm leading-relaxed">
                          Autorizo o uso dos meus dados para envio do relatório e contato comercial, 
                          conforme a Lei Geral de Proteção de Dados (LGPD). *
                        </Label>
                      </div>
                      {errors.lgpd_consent && (
                        <p className="text-sm text-red-500">{errors.lgpd_consent}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        onClick={onBack}
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                      
                      <Button
                        type="submit"
                        className="bg-grass-green hover:bg-grass-green/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Processando..."
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Gerar Relatório
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-grass-green">Resumo do Cálculo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-navy">
                      {calculationResult.numeroFuncionarios}
                    </div>
                    <div className="text-sm text-gray-600">Funcionários</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-dark-navy">
                      {calculationResult.totalAreaM2.toLocaleString('pt-BR')} m²
                    </div>
                    <div className="text-sm text-gray-600">Área Total</div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-center">
                      <div className="text-lg text-gray-600">Custo Mensal</div>
                      <div className="text-2xl font-bold text-grass-green">
                        {formatCurrency(calculationResult.custoComDesconto)}
                      </div>
                      <div className="text-sm text-grass-green">
                        {calculationResult.percentualDesconto}% OFF com assinatura
                      </div>
                    </div>
                  </div>

                  <div className="bg-grass-green/10 p-3 rounded-lg">
                    <p className="text-sm text-grass-green font-medium text-center">
                      💰 Economia anual de {formatCurrency((calculationResult.custoMensalTotal - calculationResult.custoComDesconto) * 12)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedLeadCaptureForm;
