
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportScreenProps {
  reportHtml: string;
  leadId: string;
  email: string;
  emailSent: boolean;
  onStartOver: () => void;
}

const ReportScreen = ({ 
  reportHtml, 
  leadId, 
  email, 
  emailSent, 
  onStartOver 
}: ReportScreenProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      // For now, we'll create a simple download of the HTML as PDF
      // In a real implementation, you'd call a PDF generation service
      const blob = new Blob([reportHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-limpeza-${leadId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download iniciado",
        description: "O relatório está sendo baixado.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o relatório. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with status */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-navy mb-4">
              Seu Relatório Está Pronto!
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              {emailSent ? (
                <div className="flex items-center gap-2 text-grass-green">
                  <CheckCircle className="w-5 h-5" />
                  <span>Relatório enviado para 📧 {email}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Não foi possível enviar o e-mail. Verifique o relatório abaixo.</span>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-grass-green hover:bg-grass-green/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Preparando...' : 'Baixar Relatório'}
              </Button>
              
              <Button
                onClick={onStartOver}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nova Análise
              </Button>
            </div>
          </div>

          {/* Report Display */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-dark-navy to-sky-blue text-white">
              <CardTitle className="text-center">
                Relatório de Suprimentos de Limpeza
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="report-container"
                style={{ 
                  height: '800px', 
                  overflow: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0 0 8px 8px'
                }}
                dangerouslySetInnerHTML={{ __html: reportHtml }}
              />
            </CardContent>
          </Card>

          {/* Action buttons at bottom */}
          <div className="text-center mt-8">
            <div className="bg-grass-green/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-dark-navy mb-3">
                Pronto para implementar estas recomendações?
              </h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe está disponível para ajudar você a implementar estas soluções
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-grass-green hover:bg-grass-green/90 text-white"
                  onClick={() => window.open('https://wa.me/5591993717808', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Falar com Especialista
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/catalog'}
                >
                  Ver Catálogo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportScreen;
