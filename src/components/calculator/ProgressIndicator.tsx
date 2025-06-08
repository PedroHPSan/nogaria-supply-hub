
import { ArrowRight } from 'lucide-react';
import { Phase } from './types';

interface ProgressIndicatorProps {
  currentPhase: Phase;
}

const ProgressIndicator = ({ currentPhase }: ProgressIndicatorProps) => {
  const phases = [
    { id: 'welcome', title: 'Início', completed: currentPhase !== 'welcome' },
    { id: 'questionnaire', title: 'Análise', completed: currentPhase !== 'welcome' && currentPhase !== 'questionnaire' },
    { id: 'lead-capture', title: 'Seus Dados', completed: currentPhase === 'results' },
    { id: 'results', title: 'Orçamento', completed: false },
  ];

  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentPhase === phase.id 
                    ? 'bg-grass-green text-white' 
                    : phase.completed 
                      ? 'bg-sky-blue text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentPhase === phase.id ? 'text-grass-green' : 'text-gray-600'
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
  );
};

export default ProgressIndicator;
