
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Building2 } from 'lucide-react';
import { RegistrationData } from './types';

interface LeadCaptureFormProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const LeadCaptureForm = ({ data, updateData, onSubmit, onBack }: LeadCaptureFormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!data.companyName.trim()) {
      newErrors.companyName = 'Nome da empresa é obrigatório';
    }

    if (!data.businessEmail.trim()) {
      newErrors.businessEmail = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(data.businessEmail)) {
      newErrors.businessEmail = 'E-mail inválido';
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!data.lgpdConsent) {
      newErrors.lgpdConsent = 'É necessário aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-navy mb-4">
              Quase pronto! 
            </h2>
            <p className="text-lg text-gray-600">
              Para gerar seu orçamento personalizado, precisamos de algumas informações básicas
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-grass-green flex items-center">
                <Building2 className="w-6 h-6 mr-2" />
                Informações para Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={data.fullName}
                      onChange={(e) => updateData({ fullName: e.target.value })}
                      placeholder="Seu nome completo"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <Input
                      id="companyName"
                      value={data.companyName}
                      onChange={(e) => updateData({ companyName: e.target.value })}
                      placeholder="Nome da sua empresa"
                      className={errors.companyName ? 'border-red-500' : ''}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessEmail">E-mail Corporativo *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={data.businessEmail}
                      onChange={(e) => updateData({ businessEmail: e.target.value })}
                      placeholder="email@empresa.com"
                      className={errors.businessEmail ? 'border-red-500' : ''}
                    />
                    {errors.businessEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={data.phone}
                      onChange={(e) => updateData({ phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={data.cnpj}
                      onChange={(e) => updateData({ cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="jobTitle">Cargo</Label>
                    <Input
                      id="jobTitle"
                      value={data.jobTitle}
                      onChange={(e) => updateData({ jobTitle: e.target.value })}
                      placeholder="Seu cargo na empresa"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companySegment">Segmento da Empresa</Label>
                  <Input
                    id="companySegment"
                    value={data.companySegment}
                    onChange={(e) => updateData({ companySegment: e.target.value })}
                    placeholder="Ex: Escritório, Clínica, Loja, Indústria"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="lgpdConsent"
                    checked={data.lgpdConsent}
                    onChange={(e) => updateData({ lgpdConsent: e.target.checked })}
                    className="mt-1"
                  />
                  <label htmlFor="lgpdConsent" className="text-sm text-gray-600">
                    Aceito receber comunicações da Nogária e concordo com o tratamento dos meus dados conforme a{' '}
                    <a href="/lgpd" target="_blank" className="text-grass-green hover:underline">
                      Política de Privacidade
                    </a>
                    . *
                  </label>
                  {errors.lgpdConsent && (
                    <p className="text-red-500 text-sm">{errors.lgpdConsent}</p>
                  )}
                </div>

                <div className="bg-sky-blue/10 p-4 rounded-lg">
                  <h4 className="font-medium text-sky-blue mb-2">🔒 Seus dados estão seguros</h4>
                  <p className="text-sm text-gray-600">
                    Utilizamos suas informações apenas para gerar orçamentos personalizados e comunicações relevantes. 
                    Não compartilhamos seus dados com terceiros.
                  </p>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    onClick={onBack}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Voltar
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-grass-green hover:bg-grass-green/90 text-white"
                  >
                    Gerar Orçamento Personalizado
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
