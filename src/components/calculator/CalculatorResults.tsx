
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, ArrowRight, Phone } from 'lucide-react';
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

  const handleRequestQuote = () => {
    const message = `*SOLICITAÇÃO DE ORÇAMENTO - NOGÁRIA*\n\n` +
      `Olá! Gostaria de solicitar um orçamento personalizado baseado no cálculo que realizei:\n\n` +
      `📊 *Resumo:*\n` +
      `• Área total: ${result.totalAreaM2}m²\n` +
      `• Funcionários: ${result.numeroFuncionarios}\n` +
      `• Custo mensal estimado: ${formatCurrency(result.custoMensalTotal)}\n` +
      `• Com desconto assinatura: ${formatCurrency(result.custoComDesconto)} (${result.percentualDesconto}% OFF)\n\n` +
      `Gostaria de receber uma proposta personalizada com os produtos calculados.\n\n` +
      `Aguardo retorno!`;
    
    const whatsappUrl = `https://wa.me/5591993717808?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-navy mb-4">
              Sua Análise de Necessidades
            </h2>
            <p className="text-lg text-gray-600">
              Plano mensal personalizado baseado nas suas informações
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
                <CardTitle className="text-sm font-medium text-gray-600">Funcionários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-navy">
                  {result.numeroFuncionarios}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Custo Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-grass-green">
                  {formatCurrency(result.custoMensalTotal)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-grass-green bg-grass-green/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-grass-green">Com Assinatura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-grass-green">
                  {formatCurrency(result.custoComDesconto)}
                </div>
                <div className="text-sm text-grass-green font-medium">
                  {result.percentualDesconto}% OFF
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Higiene */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sky-blue">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Higiene
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.productsByCategory.higiene.map((produto, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{produto.nome}</h4>
                      <p className="text-xs text-gray-500">{produto.formula}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{produto.quantidade} {produto.unidade}</div>
                      <div className="text-sm text-grass-green">{formatCurrency(produto.custoTotal)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Limpeza de Superfícies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-grass-green">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Limpeza de Superfícies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.productsByCategory.limpezaSuperficies.map((produto, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{produto.nome}</h4>
                      <p className="text-xs text-gray-500">{produto.formula}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{produto.quantidade} {produto.unidade}</div>
                      <div className="text-sm text-grass-green">{formatCurrency(produto.custoTotal)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Coleta de Resíduos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Coleta de Resíduos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.productsByCategory.coletaResiduos.map((produto, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{produto.nome}</h4>
                      <p className="text-xs text-gray-500">{produto.formula}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{produto.quantidade} {produto.unidade}</div>
                      <div className="text-sm text-grass-green">{formatCurrency(produto.custoTotal)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Acessórios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Acessórios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.productsByCategory.acessorios.map((produto, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{produto.nome}</h4>
                      <p className="text-xs text-gray-500">{produto.formula}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{produto.quantidade} {produto.unidade}</div>
                      <div className="text-sm text-grass-green">{formatCurrency(produto.custoTotal)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary */}
          <Card className="mb-8 border-grass-green">
            <CardHeader>
              <CardTitle className="text-xl text-grass-green">Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Custo mensal sem desconto:</span>
                  <span className="font-semibold">{formatCurrency(result.custoMensalTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-lg text-grass-green border-t pt-4">
                  <span className="font-medium">Com plano de assinatura ({result.percentualDesconto}% OFF):</span>
                  <span className="font-bold text-2xl">{formatCurrency(result.custoComDesconto)}</span>
                </div>
                <div className="bg-grass-green/10 p-4 rounded-lg">
                  <p className="text-sm text-grass-green font-medium">
                    💰 Economia anual de {formatCurrency((result.custoMensalTotal - result.custoComDesconto) * 12)} com o plano de assinatura!
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{result.estimativaMensal}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-grass-green to-sky-blue text-white p-8 rounded-xl text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Pronto para economizar?</h3>
            <p className="text-lg mb-6 opacity-90">
              Solicite uma proposta personalizada e comece a economizar ainda hoje!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRequestQuote}
                size="lg"
                className="bg-white text-grass-green hover:bg-gray-100 font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Solicitar Orçamento via WhatsApp
              </Button>
              <Button
                onClick={onDownloadReport}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-grass-green"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar Relatório PDF
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
