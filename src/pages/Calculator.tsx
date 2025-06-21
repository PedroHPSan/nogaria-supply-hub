import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorWelcome from '@/components/calculator/CalculatorWelcome';
import CalculatorQuestionnaire from '@/components/calculator/CalculatorQuestionnaire';
import EnhancedLeadCaptureForm from '@/components/calculator/EnhancedLeadCaptureForm';
import CalculatorResults from '@/components/calculator/CalculatorResults';
import ReportScreen from '@/components/calculator/ReportScreen';
import ProgressIndicator from '@/components/calculator/ProgressIndicator';
import { CalculatorInput, Phase } from '@/components/calculator/types';
import { CalculationEngine, CalculationResult } from '@/components/calculator/CalculationEngine';
import { useCalculatorLeads } from '@/hooks/useCalculatorLeads';
import { useToast } from '@/hooks/use-toast';

const Calculator = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>('welcome');
  const [currentStep, setCurrentStep] = useState(1);
  const { trackCalculatorSession } = useCalculatorLeads();
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

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [reportData, setReportData] = useState<{
    reportHtml: string;
    leadId: string;
    email: string;
    emailSent: boolean;
  } | null>(null);

  const updateCalculatorData = (data: Partial<CalculatorInput>) => {
    const updatedData = { ...calculatorData, ...data };
    setCalculatorData(updatedData);
    
    // Track session data for analytics
    trackCalculatorSession(updatedData, false);
  };

  const handleStartCalculation = () => {
    setCurrentPhase('questionnaire');
    trackCalculatorSession({ phase: 'started' }, false);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results and move to lead capture
      const result = CalculationEngine.calculate(calculatorData);
      setCalculationResult(result);
      setCurrentPhase('lead-capture');
      
      // Track completion of questionnaire
      trackCalculatorSession({ ...calculatorData, phase: 'questionnaire_completed' }, false);
      
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

  const handleLeadCaptureSubmit = (submissionResult: any) => {
    // Mark session as completed
    trackCalculatorSession({ ...calculatorData, phase: 'lead_captured' }, true);
    
    // Store report data and navigate to report screen
    setReportData({
      reportHtml: submissionResult.reportHtml,
      leadId: submissionResult.leadId,
      email: submissionResult.email || '',
      emailSent: submissionResult.emailSent
    });
    
    setCurrentPhase('report');
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
    setReportData(null);
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

      {/* Enhanced Lead Capture Phase */}
      {currentPhase === 'lead-capture' && calculationResult && (
        <EnhancedLeadCaptureForm
          calculatorData={calculatorData}
          calculationResult={calculationResult}
          onSubmit={handleLeadCaptureSubmit}
          onBack={handleLeadCaptureBack}
        />
      )}

      {/* New Report Screen Phase */}
      {currentPhase === 'report' && reportData && (
        <ReportScreen
          reportHtml={reportData.reportHtml}
          leadId={reportData.leadId}
          email={reportData.email}
          emailSent={reportData.emailSent}
          onStartOver={handleStartOver}
        />
      )}

      {/* Original Results Phase - keeping for backward compatibility */}
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
