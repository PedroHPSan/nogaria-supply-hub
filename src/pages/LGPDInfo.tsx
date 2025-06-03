
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LGPDInfo = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-dark-navy mb-8">
              Lei Geral de Proteção de Dados (LGPD)
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                Nosso Compromisso com a LGPD
              </h2>
              <p className="mb-6">
                A Nogária Suprimentos Corporativos está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), garantindo a proteção e privacidade dos dados pessoais de nossos clientes.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                Seus Direitos
              </h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Confirmação da existência de tratamento de dados pessoais</li>
                <li>Acesso aos dados pessoais</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados</li>
                <li>Portabilidade dos dados</li>
                <li>Eliminação dos dados tratados com consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                Como Exercer Seus Direitos
              </h2>
              <p className="mb-6">
                Para exercer qualquer um dos direitos acima, entre em contato conosco através do e-mail: lgpd@nogaria.com.br ou pelo telefone (91) 99371-7808.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                Base Legal
              </h2>
              <p className="mb-6">
                O tratamento de dados pessoais pela Nogária é realizado com base no consentimento do titular, execução de contrato, cumprimento de obrigação legal e interesse legítimo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LGPDInfo;
