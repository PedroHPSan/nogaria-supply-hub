
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator as CalculatorIcon, Building, Users, Square, Clock, ArrowRight, CheckCircle, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AmbienteConfig {
  id: string;
  tipo: string;
  areaM2: number;
  descricaoOutro?: string;
  // Dados específicos para banheiros
  numeroCabines?: number;
  numeroMictorio?: number;
  numeroLavatório?: number;
  // Dados específicos para cozinha
  numeroFogoes?: number;
  numeroGeladeiras?: number;
  numeroMesas?: number;
  // Questões NR-24
  nr24_pisosConservados?: boolean;
  nr24_paredesLavaveisImpermeaveis?: boolean;
  nr24_lixeirasComTampaBanheiroCozinha?: boolean;
  nr24_fornecimentoHigienicosContinuo?: boolean;
  nr24_coletorAbsorventesFeminino?: boolean;
  nr24_higienizacaoSuperficiesAlimentosCozinha?: boolean;
}

interface CalculatorInput {
  numeroFuncionarios: number;
  frequenciaLimpezaManutencaoDiaria: string;
  frequenciaLimpezaProfundaPisos: string;
  frequenciaHigienizacaoBanheiros: string;
  frequenciaLimpezaAltoContato: string;
  nivelSujidadeGeral: string;
  ambientes: AmbienteConfig[];
  possuiProgramaControlePragas: boolean;
  produtosAnvisaUtilizados: boolean;
  fispqDisponivel: boolean;
  episFornecidosUtilizados: boolean;
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
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'questionnaire' | 'lead-capture' | 'results'>('welcome');
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    numeroFuncionarios: 0,
    frequenciaLimpezaManutencaoDiaria: '',
    frequenciaLimpezaProfundaPisos: '',
    frequenciaHigienizacaoBanheiros: '',
    frequenciaLimpezaAltoContato: '',
    nivelSujidadeGeral: '',
    ambientes: [],
    possuiProgramaControlePragas: false,
    produtosAnvisaUtilizados: false,
    fispqDisponivel: false,
    episFornecidosUtilizados: false,
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

  const phases = [
    { id: 'welcome', title: 'Boas-vindas', completed: currentPhase !== 'welcome' },
    { id: 'questionnaire', title: 'Questionário', completed: currentPhase !== 'welcome' && currentPhase !== 'questionnaire' },
    { id: 'lead-capture', title: 'Seus Dados', completed: currentPhase === 'results' },
    { id: 'results', title: 'Resultados', completed: false },
  ];

  const benefits = [
    {
      icon: Calculator,
      title: 'Cálculos Precisos',
      description: 'Estimativas exatas baseadas nas normas brasileiras NR-24 e melhores práticas do setor'
    },
    {
      icon: CheckCircle,
      title: 'Conformidade Garantida',
      description: 'Recomendações alinhadas com as normas regulamentadoras brasileiras'
    },
    {
      icon: Building,
      title: 'Para Todos os Negócios',
      description: 'Desde pequenos escritórios até grandes complexos industriais'
    },
    {
      icon: Clock,
      title: 'Economia de Tempo',
      description: 'Relatório completo em poucos minutos, enviado por email'
    }
  ];

  const tiposAmbiente = [
    { value: 'escritorio', label: 'Escritório' },
    { value: 'banheiro_vestiario', label: 'Banheiro/Vestiário' },
    { value: 'cozinha_refeitorio', label: 'Cozinha/Refeitório' },
    { value: 'area_producao', label: 'Área de Produção' },
    { value: 'almoxarifado', label: 'Almoxarifado' },
    { value: 'corredor_hall', label: 'Corredor/Hall' },
    { value: 'area_externa', label: 'Área Externa' },
    { value: 'outro', label: 'Outro' },
  ];

  const frequenciaOptions = [
    { value: 'diaria', label: 'Diária' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'quinzenal', label: 'Quinzenal' },
    { value: 'mensal', label: 'Mensal' },
  ];

  const nivelSujidadeOptions = [
    { value: 'baixo', label: 'Baixo' },
    { value: 'medio', label: 'Médio' },
    { value: 'alto', label: 'Alto' },
    { value: 'muito_alto', label: 'Muito Alto' },
  ];

  const adicionarAmbiente = () => {
    const novoAmbiente: AmbienteConfig = {
      id: Date.now().toString(),
      tipo: '',
      areaM2: 0,
    };
    setCalculatorData(prev => ({
      ...prev,
      ambientes: [...prev.ambientes, novoAmbiente]
    }));
  };

  const removerAmbiente = (id: string) => {
    setCalculatorData(prev => ({
      ...prev,
      ambientes: prev.ambientes.filter(ambiente => ambiente.id !== id)
    }));
  };

  const atualizarAmbiente = (id: string, dados: Partial<AmbienteConfig>) => {
    setCalculatorData(prev => ({
      ...prev,
      ambientes: prev.ambientes.map(ambiente =>
        ambiente.id === id ? { ...ambiente, ...dados } : ambiente
      )
    }));
  };

  const proximoPassoQuestionario = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentPhase('lead-capture');
    }
  };

  const passoAnteriorQuestionario = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentPhase('welcome');
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.lgpdConsent) {
      alert('Por favor, aceite os termos para continuar.');
      return;
    }
    setCurrentPhase('results');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Progress Indicator */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentPhase === phase.id 
                      ? 'bg-grass-green text-dark-navy' 
                      : phase.completed 
                        ? 'bg-sky-blue text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentPhase === phase.id ? 'text-dark-navy' : 'text-gray-600'
                  }`}>
                    {phase.title}
                  </span>
                  {index < phases.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Phase */}
      {currentPhase === 'welcome' && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-sky-blue to-grass-green text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto text-center">
                <CalculatorIcon className="w-20 h-20 mx-auto mb-8 text-neon-green" />
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Calculadora Avançada de Suprimentos de Limpeza
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Bem-vindo à nova experiência da Nogária! Nossa calculadora inteligente substituiu a página 
                  "calcule sua necessidade" com uma ferramenta muito mais abrangente e precisa.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                  <p className="text-lg text-white/95 leading-relaxed">
                    Descubra as soluções de limpeza perfeitas para seu negócio e garanta um ambiente 
                    de trabalho saudável e em conformidade com as normas brasileiras. Esta ferramenta oferece 
                    recomendações personalizadas baseadas nas suas necessidades específicas.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setCurrentPhase('questionnaire')}
                    size="lg"
                    className="bg-neon-green hover:bg-grass-green text-dark-navy font-bold text-lg px-8 py-4"
                  >
                    Iniciar Cálculo Gratuito
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-dark-navy font-bold text-lg px-8 py-4"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  Por que usar nossa Calculadora Avançada?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <benefit.icon className="w-12 h-12 text-grass-green mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark-navy mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-dark-navy mb-12">
                  O que você receberá
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-grass-green">
                        📊 Relatório Detalhado na Tela
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Lista personalizada de produtos Nogária</li>
                        <li>• Quantidades exatas calculadas</li>
                        <li>• Sugestões de compra otimizadas</li>
                        <li>• Instruções de diluição e uso</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-grass-green">
                        📧 PDF Completo por Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Relatório completo em PDF</li>
                        <li>• Dicas personalizadas de limpeza</li>
                        <li>• Orientações de conformidade NR-24</li>
                        <li>• Melhores práticas do setor</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-dark-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">
                  Pronto para otimizar seus suprimentos de limpeza?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Leva apenas alguns minutos e é completamente gratuito. 
                  Comece agora e descubra como economizar tempo e dinheiro!
                </p>
                <Button 
                  onClick={() => setCurrentPhase('questionnaire')}
                  size="lg"
                  className="bg-grass-green hover:bg-neon-green text-dark-navy font-bold text-xl px-12 py-4"
                >
                  Começar Agora - É Grátis!
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Questionnaire Phase */}
      {currentPhase === 'questionnaire' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-dark-navy mb-4">
                  Questionário - Passo {currentStep} de 3
                </h2>
                <p className="text-lg text-gray-600">
                  Responda algumas perguntas para calcularmos suas necessidades exatas
                </p>
              </div>

              {/* Step 1: Informações Gerais */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-grass-green flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Informações Gerais do Negócio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="funcionarios">Número de funcionários</Label>
                      <Input
                        id="funcionarios"
                        type="number"
                        value={calculatorData.numeroFuncionarios || ''}
                        onChange={(e) => setCalculatorData(prev => ({
                          ...prev,
                          numeroFuncionarios: parseInt(e.target.value) || 0
                        }))}
                        placeholder="Ex: 25"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Frequência de limpeza de manutenção diária</Label>
                        <Select
                          value={calculatorData.frequenciaLimpezaManutencaoDiaria}
                          onValueChange={(value) => setCalculatorData(prev => ({
                            ...prev,
                            frequenciaLimpezaManutencaoDiaria: value
                          }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequenciaOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Frequência de limpeza profunda dos pisos</Label>
                        <Select
                          value={calculatorData.frequenciaLimpezaProfundaPisos}
                          onValueChange={(value) => setCalculatorData(prev => ({
                            ...prev,
                            frequenciaLimpezaProfundaPisos: value
                          }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequenciaOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Frequência de higienização dos banheiros</Label>
                        <Select
                          value={calculatorData.frequenciaHigienizacaoBanheiros}
                          onValueChange={(value) => setCalculatorData(prev => ({
                            ...prev,
                            frequenciaHigienizacaoBanheiros: value
                          }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequenciaOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Nível geral de sujidade</Label>
                        <Select
                          value={calculatorData.nivelSujidadeGeral}
                          onValueChange={(value) => setCalculatorData(prev => ({
                            ...prev,
                            nivelSujidadeGeral: value
                          }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            {nivelSujidadeOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Configuração de Ambientes */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-grass-green flex items-center justify-between">
                        <div className="flex items-center">
                          <Building className="w-6 h-6 mr-2" />
                          Configuração de Ambientes
                        </div>
                        <Button
                          onClick={adicionarAmbiente}
                          variant="outline"
                          size="sm"
                          className="border-grass-green text-grass-green hover:bg-grass-green hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Adicionar Ambiente
                        </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {calculatorData.ambientes.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum ambiente configurado ainda.</p>
                        <p className="text-sm">Clique em "Adicionar Ambiente" para começar.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {calculatorData.ambientes.map((ambiente, index) => (
                          <Card key={ambiente.id} className="border-l-4 border-l-grass-green">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center justify-between">
                                <span>Ambiente {index + 1}</span>
                                <Button
                                  onClick={() => removerAmbiente(ambiente.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Tipo do ambiente</Label>
                                  <Select
                                    value={ambiente.tipo}
                                    onValueChange={(value) => atualizarAmbiente(ambiente.id, { tipo: value })}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {tiposAmbiente.map(tipo => (
                                        <SelectItem key={tipo.value} value={tipo.value}>
                                          {tipo.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label>Área (m²)</Label>
                                  <Input
                                    type="number"
                                    value={ambiente.areaM2 || ''}
                                    onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                      areaM2: parseFloat(e.target.value) || 0 
                                    })}
                                    placeholder="Ex: 50"
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              {/* Campos específicos para banheiro/vestiário */}
                              {ambiente.tipo === 'banheiro_vestiario' && (
                                <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                                  <h4 className="font-medium text-blue-900">Detalhes do Banheiro/Vestiário</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <Label>Número de cabines</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroCabines || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroCabines: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label>Número de mictórios</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroMictorio || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroMictorio: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label>Número de lavatórios</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroLavatório || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroLavatório: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Campos específicos para cozinha/refeitório */}
                              {ambiente.tipo === 'cozinha_refeitorio' && (
                                <div className="bg-green-50 p-4 rounded-lg space-y-4">
                                  <h4 className="font-medium text-green-900">Detalhes da Cozinha/Refeitório</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <Label>Número de fogões</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroFogoes || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroFogoes: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label>Número de geladeiras</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroGeladeiras || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroGeladeiras: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label>Número de mesas</Label>
                                      <Input
                                        type="number"
                                        value={ambiente.numeroMesas || ''}
                                        onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                          numeroMesas: parseInt(e.target.value) || 0 
                                        })}
                                        className="mt-1"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Campo para descrição de "outro" */}
                              {ambiente.tipo === 'outro' && (
                                <div>
                                  <Label>Descrição do ambiente</Label>
                                  <Input
                                    value={ambiente.descricaoOutro || ''}
                                    onChange={(e) => atualizarAmbiente(ambiente.id, { 
                                      descricaoOutro: e.target.value 
                                    })}
                                    placeholder="Descreva o tipo de ambiente"
                                    className="mt-1"
                                  />
                                </div>
                              )}

                              {/* Questões NR-24 */}
                              <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
                                <h4 className="font-medium text-yellow-900">Questões de Conformidade NR-24</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`pisos-${ambiente.id}`}
                                      checked={ambiente.nr24_pisosConservados || false}
                                      onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                        nr24_pisosConservados: !!checked 
                                      })}
                                    />
                                    <label htmlFor={`pisos-${ambiente.id}`} className="text-sm">
                                      Pisos estão conservados e sem irregularidades
                                    </label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`paredes-${ambiente.id}`}
                                      checked={ambiente.nr24_paredesLavaveisImpermeaveis || false}
                                      onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                        nr24_paredesLavaveisImpermeaveis: !!checked 
                                      })}
                                    />
                                    <label htmlFor={`paredes-${ambiente.id}`} className="text-sm">
                                      Paredes são laváveis e impermeáveis
                                    </label>
                                  </div>

                                  {(ambiente.tipo === 'banheiro_vestiario' || ambiente.tipo === 'cozinha_refeitorio') && (
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`lixeiras-${ambiente.id}`}
                                        checked={ambiente.nr24_lixeirasComTampaBanheiroCozinha || false}
                                        onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                          nr24_lixeirasComTampaBanheiroCozinha: !!checked 
                                        })}
                                      />
                                      <label htmlFor={`lixeiras-${ambiente.id}`} className="text-sm">
                                        Lixeiras possuem tampa
                                      </label>
                                    </div>
                                  )}

                                  {ambiente.tipo === 'banheiro_vestiario' && (
                                    <>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`higienicos-${ambiente.id}`}
                                          checked={ambiente.nr24_fornecimentoHigienicosContinuo || false}
                                          onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                            nr24_fornecimentoHigienicosContinuo: !!checked 
                                          })}
                                        />
                                        <label htmlFor={`higienicos-${ambiente.id}`} className="text-sm">
                                          Fornecimento contínuo de papel higiênico, sabonete e toalhas
                                        </label>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`absorventes-${ambiente.id}`}
                                          checked={ambiente.nr24_coletorAbsorventesFeminino || false}
                                          onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                            nr24_coletorAbsorventesFeminino: !!checked 
                                          })}
                                        />
                                        <label htmlFor={`absorventes-${ambiente.id}`} className="text-sm">
                                          Coletor para absorventes femininos (se aplicável)
                                        </label>
                                      </div>
                                    </>
                                  )}

                                  {ambiente.tipo === 'cozinha_refeitorio' && (
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`superficies-${ambiente.id}`}
                                        checked={ambiente.nr24_higienizacaoSuperficiesAlimentosCozinha || false}
                                        onCheckedChange={(checked) => atualizarAmbiente(ambiente.id, { 
                                          nr24_higienizacaoSuperficiesAlimentosCozinha: !!checked 
                                        })}
                                      />
                                      <label htmlFor={`superficies-${ambiente.id}`} className="text-sm">
                                        Higienização adequada de superfícies que entram em contato com alimentos
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Práticas e Conformidade */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-grass-green flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Práticas de Limpeza e Conformidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="programa-pragas"
                          checked={calculatorData.possuiProgramaControlePragas}
                          onCheckedChange={(checked) => setCalculatorData(prev => ({
                            ...prev,
                            possuiProgramaControlePragas: !!checked
                          }))}
                        />
                        <label htmlFor="programa-pragas" className="text-sm font-medium">
                          Possui programa de controle de pragas implementado
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="produtos-anvisa"
                          checked={calculatorData.produtosAnvisaUtilizados}
                          onCheckedChange={(checked) => setCalculatorData(prev => ({
                            ...prev,
                            produtosAnvisaUtilizados: !!checked
                          }))}
                        />
                        <label htmlFor="produtos-anvisa" className="text-sm font-medium">
                          Utiliza produtos registrados na ANVISA
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="fispq"
                          checked={calculatorData.fispqDisponivel}
                          onCheckedChange={(checked) => setCalculatorData(prev => ({
                            ...prev,
                            fispqDisponivel: !!checked
                          }))}
                        />
                        <label htmlFor="fispq" className="text-sm font-medium">
                          FISPQ (Ficha de Informações de Segurança) disponível para consulta
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="epis"
                          checked={calculatorData.episFornecidosUtilizados}
                          onCheckedChange={(checked) => setCalculatorData(prev => ({
                            ...prev,
                            episFornecidosUtilizados: !!checked
                          }))}
                        />
                        <label htmlFor="epis" className="text-sm font-medium">
                          EPIs adequados são fornecidos e utilizados pela equipe de limpeza
                        </label>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Informações importantes:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Essas informações nos ajudam a fazer recomendações mais precisas</li>
                        <li>• Produtos Nogária são registrados na ANVISA e atendem todas as normas</li>
                        <li>• Fornecemos FISPQ completa para todos os nossos produtos</li>
                        <li>• Orientamos sobre o uso correto de EPIs para cada produto</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  onClick={passoAnteriorQuestionario}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Voltar
                </Button>
                
                <Button
                  onClick={proximoPassoQuestionario}
                  className="bg-grass-green hover:bg-grass-green/90 text-white"
                  disabled={
                    (currentStep === 1 && (!calculatorData.numeroFuncionarios || !calculatorData.frequenciaLimpezaManutencaoDiaria)) ||
                    (currentStep === 2 && calculatorData.ambientes.length === 0)
                  }
                >
                  {currentStep === 3 ? 'Finalizar Questionário' : 'Próximo Passo'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Phase */}
      {currentPhase === 'lead-capture' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-dark-navy mb-8">
                Captura de Leads - Em Desenvolvimento
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Esta seção será implementada na Fase 3 do projeto.
              </p>
              <Button 
                onClick={() => setCurrentPhase('questionnaire')}
                variant="outline"
                className="border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white"
              >
                Voltar ao Questionário
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Results Phase */}
      {currentPhase === 'results' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-dark-navy mb-8">
                Resultados - Em Desenvolvimento
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Esta seção será implementada na Fase 4 do projeto.
              </p>
              <Button 
                onClick={() => setCurrentPhase('welcome')}
                variant="outline"
                className="border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Calculator;
