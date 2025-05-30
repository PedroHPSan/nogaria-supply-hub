
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CalculatorInput, AmbienteConfig } from './types';
import BusinessInfoStep from './BusinessInfoStep';
import EnvironmentStep from './EnvironmentStep';
import ComplianceStep from './ComplianceStep';

interface CalculatorQuestionnaireProps {
  currentStep: number;
  data: CalculatorInput;
  updateData: (data: Partial<CalculatorInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CalculatorQuestionnaire = ({ 
  currentStep, 
  data, 
  updateData, 
  onNext, 
  onBack 
}: CalculatorQuestionnaireProps) => {
  const addAmbiente = () => {
    const novoAmbiente: AmbienteConfig = {
      id: Date.now().toString(),
      tipo: '',
      areaM2: 0,
    };
    updateData({
      ambientes: [...data.ambientes, novoAmbiente]
    });
  };

  const removeAmbiente = (id: string) => {
    updateData({
      ambientes: data.ambientes.filter(ambiente => ambiente.id !== id)
    });
  };

  const updateAmbiente = (id: string, dados: Partial<AmbienteConfig>) => {
    updateData({
      ambientes: data.ambientes.map(ambiente =>
        ambiente.id === id ? { ...ambiente, ...dados } : ambiente
      )
    });
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return data.numeroFuncionarios > 0 && data.frequenciaLimpezaManutencaoDiaria;
    }
    if (currentStep === 2) {
      return data.ambientes.length > 0;
    }
    return true;
  };

  return (
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

          {currentStep === 1 && (
            <BusinessInfoStep data={data} updateData={updateData} />
          )}

          {currentStep === 2 && (
            <EnvironmentStep
              ambientes={data.ambientes}
              onAddAmbiente={addAmbiente}
              onRemoveAmbiente={removeAmbiente}
              onUpdateAmbiente={updateAmbiente}
            />
          )}

          {currentStep === 3 && (
            <ComplianceStep data={data} updateData={updateData} />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Voltar
            </Button>
            
            <Button
              onClick={onNext}
              className="bg-grass-green hover:bg-grass-green/90 text-white"
              disabled={!isStepValid()}
            >
              {currentStep === 3 ? 'Finalizar Questionário' : 'Próximo Passo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorQuestionnaire;
