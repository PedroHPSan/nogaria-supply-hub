
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { CalculationResult } from './CalculationEngine';

interface CalculatorResultsProps {
  result: CalculationResult;
  onStartOver: () => void;
  onDownloadReport: () => void;
}

const CalculatorResults = ({ result, onStartOver, onDownloadReport }: CalculatorResultsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-navy mb-4">
              Resultados da Análise
            </h2>
            <p className="text-lg text-gray-600">
              Relatório completo baseado nas informações fornecidas
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Área Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-navy">
                  {result.totalAreaM2.toLocaleString('pt-BR')} m²
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Horas/Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-navy">
                  {result.horasLimpezaMensal.toLocaleString('pt-BR')}h
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Custo Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-grass-green">
                  {formatCurrency(result.custoTotalMensal)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Conformidade NR-24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sky-blue">
                  {result.conformidadeNR24.percentualConformidade}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-sky-blue" />
                  Detalhamento de Custos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Produtos químicos</span>
                  <span className="font-semibold">{formatCurrency(result.custoProdutosMensal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mão de obra</span>
                  <span className="font-semibold">{formatCurrency(result.custoMaoObraMensal)}</span>
                </div>
                <hr />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-dark-navy">Total Mensal</span>
                  <span className="font-bold text-grass-green">{formatCurrency(result.custoTotalMensal)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Economia anual estimada: {formatCurrency(result.custoTotalMensal * 12 * 0.15)}
                </div>
              </CardContent>
            </Card>

            {/* NR-24 Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {result.conformidadeNR24.percentualConformidade >= 80 ? (
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  )}
                  Conformidade NR-24
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Índice de Conformidade</span>
                    <span className="font-semibold">{result.conformidadeNR24.percentualConformidade}%</span>
                  </div>
                  <Progress value={result.conformidadeNR24.percentualConformidade} className="h-2" />
                </div>
                
                {result.conformidadeNR24.itensNaoConformes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Itens Não Conformes:</h4>
                    <ul className="text-sm space-y-1">
                      {result.conformidadeNR24.itensNaoConformes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.conformidadeNR24.recomendacoes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-grass-green mb-2">Recomendações:</h4>
                    <ul className="text-sm space-y-1">
                      {result.conformidadeNR24.recomendacoes.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-grass-green mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Products Recommendations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Produtos Recomendados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Categoria</th>
                      <th className="text-left py-2">Produto</th>
                      <th className="text-center py-2">Quantidade</th>
                      <th className="text-right py-2">Custo Unit.</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.produtosRecomendados.map((produto, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{produto.categoria}</td>
                        <td className="py-2">{produto.produto}</td>
                        <td className="text-center py-2">{produto.quantidade} {produto.unidade}</td>
                        <td className="text-right py-2">{formatCurrency(produto.custoUnitario)}</td>
                        <td className="text-right py-2 font-semibold">{formatCurrency(produto.custoTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Equipment List */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Equipamentos Necessários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.equipamentosNecessarios.map((equipamento, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-grass-green mr-3" />
                    <span>{equipamento}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onDownloadReport}
              className="bg-sky-blue hover:bg-sky-blue/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Relatório Completo
            </Button>
            
            <Button
              onClick={onStartOver}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Nova Análise
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorResults;
