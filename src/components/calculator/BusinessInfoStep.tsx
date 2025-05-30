
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';
import { CalculatorInput } from './types';

interface BusinessInfoStepProps {
  data: CalculatorInput;
  updateData: (data: Partial<CalculatorInput>) => void;
}

const BusinessInfoStep = ({ data, updateData }: BusinessInfoStepProps) => {
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

  return (
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
            value={data.numeroFuncionarios || ''}
            onChange={(e) => updateData({
              numeroFuncionarios: parseInt(e.target.value) || 0
            })}
            placeholder="Ex: 25"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Frequência de limpeza de manutenção diária</Label>
            <Select
              value={data.frequenciaLimpezaManutencaoDiaria}
              onValueChange={(value) => updateData({
                frequenciaLimpezaManutencaoDiaria: value
              })}
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
              value={data.frequenciaLimpezaProfundaPisos}
              onValueChange={(value) => updateData({
                frequenciaLimpezaProfundaPisos: value
              })}
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
              value={data.frequenciaHigienizacaoBanheiros}
              onValueChange={(value) => updateData({
                frequenciaHigienizacaoBanheiros: value
              })}
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
              value={data.nivelSujidadeGeral}
              onValueChange={(value) => updateData({
                nivelSujidadeGeral: value
              })}
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
  );
};

export default BusinessInfoStep;
