
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-dark-navy mb-8">
              Termos de Uso
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="mb-6">
                Ao acessar e usar este site, você aceita e concorda em ficar vinculado aos termos e condições desta política.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                2. Uso do Site
              </h2>
              <p className="mb-6">
                Este site é destinado ao uso comercial para aquisição de suprimentos corporativos. O uso inadequado do site é proibido.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                3. Produtos e Serviços
              </h2>
              <p className="mb-6">
                Todos os produtos e serviços estão sujeitos à disponibilidade. Reservamo-nos o direito de descontinuar qualquer produto a qualquer momento.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                4. Preços
              </h2>
              <p className="mb-6">
                Os preços estão sujeitos a alterações sem aviso prévio. Todos os preços são válidos no momento da compra.
              </p>
              
              <h2 className="text-2xl font-semibold text-dark-navy mb-4">
                5. Limitação de Responsabilidade
              </h2>
              <p className="mb-6">
                A Nogária não será responsável por danos diretos, indiretos, incidentais ou consequentes resultantes do uso deste site.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;
