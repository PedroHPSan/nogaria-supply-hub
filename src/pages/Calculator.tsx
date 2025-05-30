
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorWelcome from '@/components/calculator/CalculatorWelcome';
import CalculatorQuestionnaire from '@/components/calculator/CalculatorQuestionnaire';
import ProgressIndicator from '@/components/calculator/ProgressIndicator';
import { CalculatorInput, RegistrationData, Phase } from '@/components/calculator/types';

const Calculator = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>('welcome');
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
      setCurrentPhase('lead-capture');
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
      alert('Por favor, aceite os termos para continuar.');
      return;
    }
    setCurrentPhase('results');
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
