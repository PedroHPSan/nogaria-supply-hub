
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorWelcome from '@/components/calculator/CalculatorWelcome';
import CalculatorQuestionnaire from '@/components/calculator/CalculatorQuestionnaire';
import CalculatorResults from '@/components/calculator/CalculatorResults';
import ProgressIndicator from '@/components/calculator/ProgressIndicator';
import { CalculatorInput, RegistrationData, Phase } from '@/components/calculator/types';
import { CalculationEngine, CalculationResult } from '@/components/calculator/CalculationEngine';
import { useToast } from '@/hooks/use-toast';

const Calculator = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>('welcome');
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
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

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const updateCalculatorData = (data: Partial<CalculatorInput>) => {
    setCalculatorData(prev => ({ ...prev, ...data }));
  };

  const handleStartCalculation = () => {
    setCurrentPhase('questionnaire');
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results and skip to results phase
      const result = CalculationEngine.calculate(calculatorData);
      setCalculationResult(result);
      setCurrentPhase('results');
      
      toast({
        title: "Cálculo realizado com sucesso!",
        description: "Confira os resultados detalhados abaixo.",
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentPhase('welcome');
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.lgpdConsent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, aceite os termos para continuar.",
        variant: "destructive"
      });
      return;
    }
    setCurrentPhase('results');
  };

  const handleDownloadReport = () => {
    toast({
      title: "Preparando relatório...",
      description: "O download será iniciado em breve.",
    });
    
    // Here you would implement the actual PDF generation and download
    console.log('Downloading report with data:', calculationResult);
  };

  const handleStartOver = () => {
    setCurrentPhase('welcome');
    setCurrentStep(1);
    setCalculationResult(null);
    setCalculatorData({
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
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Progress Indicator */}
      <ProgressIndicator currentPhase={currentPhase} />

      {/* Welcome Phase */}
      {currentPhase === 'welcome' && (
        <CalculatorWelcome onStartCalculation={handleStartCalculation} />
      )}

      {/* Questionnaire Phase */}
      {currentPhase === 'questionnaire' && (
        <CalculatorQuestionnaire
          currentStep={currentStep}
          data={calculatorData}
          updateData={updateCalculatorData}
          onNext={handleNextStep}
          onBack={handlePreviousStep}
        />
      )}

      {/* Lead Capture Phase - Currently skipped */}
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
      {currentPhase === 'results' && calculationResult && (
        <CalculatorResults
          result={calculationResult}
          onStartOver={handleStartOver}
          onDownloadReport={handleDownloadReport}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Calculator;
