
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import { CalculatorInput } from './types';

interface ComplianceStepProps {
  data: CalculatorInput;
  updateData: (data: Partial<CalculatorInput>) => void;
}

const ComplianceStep = ({ data, updateData }: ComplianceStepProps) => {
  return (
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
              checked={data.possuiProgramaControlePragas}
              onCheckedChange={(checked) => updateData({
                possuiProgramaControlePragas: !!checked
              })}
            />
            <label htmlFor="programa-pragas" className="text-sm font-medium">
              Possui programa de controle de pragas implementado
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="produtos-anvisa"
              checked={data.produtosAnvisaUtilizados}
              onCheckedChange={(checked) => updateData({
                produtosAnvisaUtilizados: !!checked
              })}
            />
            <label htmlFor="produtos-anvisa" className="text-sm font-medium">
              Utiliza produtos registrados na ANVISA
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="fispq"
              checked={data.fispqDisponivel}
              onCheckedChange={(checked) => updateData({
                fispqDisponivel: !!checked
              })}
            />
            <label htmlFor="fispq" className="text-sm font-medium">
              FISPQ (Ficha de Informações de Segurança) disponível para consulta
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="epis"
              checked={data.episFornecidosUtilizados}
              onCheckedChange={(checked) => updateData({
                episFornecidosUtilizados: !!checked
              })}
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
  );
};

export default ComplianceStep;
