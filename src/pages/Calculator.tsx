
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorWelcome from '@/components/calculator/CalculatorWelcome';
import CalculatorQuestionnaire from '@/components/calculator/CalculatorQuestionnaire';
import LeadCaptureForm from '@/components/calculator/LeadCaptureForm';
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

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const handleStartCalculation = () => {
    setCurrentPhase('questionnaire');
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results and move to lead capture
      const result = CalculationEngine.calculate(calculatorData);
      setCalculationResult(result);
      setCurrentPhase('lead-capture');
      
      toast({
        title: "Cálculo realizado com sucesso!",
        description: "Agora precisamos de suas informações para gerar o orçamento personalizado.",
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

  const handleLeadCaptureSubmit = () => {
    // Here you would normally save the lead data to database/CRM
    
    setCurrentPhase('results');
    
    toast({
      title: "Orçamento gerado com sucesso!",
      description: "Confira sua análise personalizada de necessidades.",
    });
  };

  const handleLeadCaptureBack = () => {
    setCurrentPhase('questionnaire');
    setCurrentStep(3); // Return to last step of questionnaire
  };

  const handleDownloadReport = () => {
    toast({
      title: "Preparando relatório...",
      description: "O download será iniciado em breve.",
    });
    
    // Here you would implement the actual PDF generation and download
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
    setRegistrationData({
      fullName: '',
      companyName: '',
      businessEmail: '',
      phone: '',
      cnpj: '',
      companySegment: '',
      jobTitle: '',
      lgpdConsent: false,
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

      {/* Lead Capture Phase */}
      {currentPhase === 'lead-capture' && (
        <LeadCaptureForm
          data={registrationData}
          updateData={updateRegistrationData}
          onSubmit={handleLeadCaptureSubmit}
          onBack={handleLeadCaptureBack}
        />
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
