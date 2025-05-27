
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator as CalculatorIcon, Building, Users, Square, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CalculatorInput {
  environmentType: string;
  area: number;
  employees: number;
  cleaningFrequency: string;
  hasKitchen: boolean;
  hasBathrooms: boolean;
  hasWarehouse: boolean;
  hasOfficeSpace: boolean;
}

interface RegistrationData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  cnpj: string;
  companySegment: string;
  jobTitle: string;
  lgpdConsent: boolean;
}

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    environmentType: '',
    area: 0,
    employees: 0,
    cleaningFrequency: '',
    hasKitchen: false,
    hasBathrooms: false,
    hasWarehouse: false,
    hasOfficeSpace: false,
  });
  
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    cnpj: '',
    companySegment: '',
    jobTitle: '',
    lgpdConsent: false,
  });

  const [calculationResult, setCalculationResult] = useState<any>(null);

  const handleCalculate = () => {
    // Mock calculation logic - in real implementation this would use your TypeScript calculation functions
    const mockResult = {
      period: "Mensal",
      items: [
        {
          product: "Detergente Neutro 5L",
          calculatedQuantity: "2.5 litros",
          suggestedPurchase: "1 unidade de 5L",
          notes: "Diluição 1:10 para limpeza geral"
        },
        {
          product: "Papel Higiênico",
          calculatedQuantity: "24 rolos",
          suggestedPurchase: "2 pacotes com 12 unidades",
          notes: "Baseado no número de funcionários"
        },
        {
          product: "Álcool 70%",
          calculatedQuantity: "1 litro",
          suggestedPurchase: "2 frascos de 500ml",
          notes: "Para desinfecção de superfícies"
        }
      ]
    };
    
    setCalculationResult(mockResult);
    setStep(3);
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.lgpdConsent) {
      alert('Por favor, aceite os termos para continuar.');
      return;
    }
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CalculatorIcon className="w-16 h-16 mx-auto mb-6 text-neon-green" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calcule Sua Necessidade
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Pare de adivinhar, comece a economizar! Calcule suas necessidades de limpeza corporativa instantaneamente.
            </p>
            <p className="text-lg text-white/80">
              Obtenha uma lista precisa e personalizada de suprimentos essenciais para sua empresa em apenas alguns minutos. É Grátis e Fácil!
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-dark-navy">
                    Vamos calcular exatamente o que seu espaço de trabalho precisa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="environmentType">Tipo principal do ambiente</Label>
                      <Select onValueChange={(value) => setCalculatorData({...calculatorData, environmentType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de ambiente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Escritório</SelectItem>
                          <SelectItem value="kitchen">Cozinha</SelectItem>
                          <SelectItem value="bathroom">Banheiro</SelectItem>
                          <SelectItem value="warehouse">Almoxarifado</SelectItem>
                          <SelectItem value="mixed">Ambiente Misto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="area">Área aproximada (m²)</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 150"
                        value={calculatorData.area || ''}
                        onChange={(e) => setCalculatorData({...calculatorData, area: Number(e.target.value)})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="employees">Número de funcionários</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 25"
                        value={calculatorData.employees || ''}
                        onChange={(e) => setCalculatorData({...calculatorData, employees: Number(e.target.value)})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="frequency">Frequência de limpeza</Label>
                      <Select onValueChange={(value) => setCalculatorData({...calculatorData, cleaningFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diária</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="biweekly">Quinzenal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-4 block">Ambientes específicos incluídos:</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasKitchen"
                          checked={calculatorData.hasKitchen}
                          onCheckedChange={(checked) => setCalculatorData({...calculatorData, hasKitchen: !!checked})}
                        />
                        <Label htmlFor="hasKitchen">Cozinha/Copa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasBathrooms"
                          checked={calculatorData.hasBathrooms}
                          onCheckedChange={(checked) => setCalculatorData({...calculatorData, hasBathrooms: !!checked})}
                        />
                        <Label htmlFor="hasBathrooms">Banheiros</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasWarehouse"
                          checked={calculatorData.hasWarehouse}
                          onCheckedChange={(checked) => setCalculatorData({...calculatorData, hasWarehouse: !!checked})}
                        />
                        <Label htmlFor="hasWarehouse">Almoxarifado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasOfficeSpace"
                          checked={calculatorData.hasOfficeSpace}
                          onCheckedChange={(checked) => setCalculatorData({...calculatorData, hasOfficeSpace: !!checked})}
                        />
                        <Label htmlFor="hasOfficeSpace">Espaço de Escritório</Label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!calculatorData.environmentType || !calculatorData.area || !calculatorData.employees || !calculatorData.cleaningFrequency}
                    className="w-full bg-grass-green hover:bg-neon-green text-dark-navy py-3 text-lg"
                  >
                    Calcular Necessidades
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-dark-navy">
                    Ótimo! Seu relatório personalizado está pronto 📊
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-lg text-gray-600">
                    Para visualizar seu relatório detalhado e receber dicas personalizadas para otimizar suas compras Nogária, 
                    complete um rápido cadastro.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        value={registrationData.fullName}
                        onChange={(e) => setRegistrationData({...registrationData, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        type="text"
                        placeholder="Nome da sua empresa"
                        value={registrationData.companyName}
                        onChange={(e) => setRegistrationData({...registrationData, companyName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessEmail">Email Corporativo</Label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={registrationData.businessEmail}
                        onChange={(e) => setRegistrationData({...registrationData, businessEmail: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone (com DDD)</Label>
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={registrationData.phone}
                        onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ (Opcional)</Label>
                      <Input
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={registrationData.cnpj}
                        onChange={(e) => setRegistrationData({...registrationData, cnpj: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Seu Cargo (Opcional)</Label>
                      <Input
                        type="text"
                        placeholder="Ex: Gerente Administrativo"
                        value={registrationData.jobTitle}
                        onChange={(e) => setRegistrationData({...registrationData, jobTitle: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lgpdConsent"
                      checked={registrationData.lgpdConsent}
                      onCheckedChange={(checked) => setRegistrationData({...registrationData, lgpdConsent: !!checked})}
                    />
                    <Label htmlFor="lgpdConsent" className="text-sm">
                      Concordo em receber comunicações da Nogária com ofertas, novidades e dicas de limpeza.
                    </Label>
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    disabled={!registrationData.fullName || !registrationData.companyName || !registrationData.businessEmail || !registrationData.phone || !registrationData.lgpdConsent}
                    className="w-full bg-grass-green hover:bg-neon-green text-dark-navy py-3 text-lg"
                  >
                    Ver Meu Relatório
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 3 && calculationResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-dark-navy">
                    Obrigado por se cadastrar! Aqui está seu relatório detalhado:
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-sky-blue/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Relatório para: {calculationResult.period}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {calculationResult.items.map((item: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-lg text-dark-navy mb-2">{item.product}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Calculado:</span>
                            <p>{item.calculatedQuantity}</p>
                          </div>
                          <div>
                            <span className="font-medium">Sugerido para Compra:</span>
                            <p>{item.suggestedPurchase}</p>
                          </div>
                          <div>
                            <span className="font-medium">Observação:</span>
                            <p>{item.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-lg">
                      Esperamos que este relatório ajude você a otimizar o gerenciamento de suprimentos de limpeza!
                    </p>
                    <p>
                      Gostaria de solicitar um orçamento personalizado para esses itens da Nogária, ou falar com um de nossos especialistas em soluções de limpeza?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-grass-green hover:bg-neon-green text-dark-navy">
                        Solicitar Orçamento
                      </Button>
                      <Button variant="outline" className="border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white">
                        Falar com Especialista
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Calculator;
