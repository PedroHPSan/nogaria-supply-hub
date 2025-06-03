
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-dark-navy mb-8">
              Política de Privacidade
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                1. Informações Gerais
              </h2>
              <p className="mb-6">
                A Nogária Suprimentos Corporativos respeita a privacidade de seus usuários e está comprometida em proteger as informações pessoais coletadas através de nosso site.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                2. Coleta de Informações
              </h2>
              <p className="mb-6">
                Coletamos informações quando você se registra em nosso site, faz um pedido, assina nossa newsletter ou preenche um formulário. As informações coletadas incluem nome, e-mail, telefone e endereço.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                3. Uso das Informações
              </h2>
              <p className="mb-6">
                As informações que coletamos podem ser usadas para: personalizar sua experiência, melhorar nosso site, processar transações e enviar e-mails periódicos.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                4. Proteção das Informações
              </h2>
              <p className="mb-6">
                Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso, alteração, divulgação ou destruição não autorizados.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                5. Contato
              </h2>
              <p className="mb-6">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail: vendas@nogaria.com.br
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
