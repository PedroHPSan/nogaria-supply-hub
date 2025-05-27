
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Calendar } from 'lucide-react';

const Sobre = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Simplificar a gestão de suprimentos corporativos através de soluções inteligentes e personalizadas, garantindo que nossos clientes tenham exatamente o que precisam, quando precisam."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser a principal referência em suprimentos corporativos no Brasil, reconhecida pela excelência no atendimento e inovação tecnológica na gestão de estoque."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Agilidade, compromisso, transparência e sustentabilidade guiam nossas decisões e relacionamentos com clientes, fornecedores e colaboradores."
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Fundação da Nogária",
      description: "Início das operações com foco em suprimentos corporativos de alta qualidade"
    },
    {
      year: "2025",
      title: "Lançamento da Loja Digital",
      description: "Plataforma e-commerce com sistema inteligente de reposição automática"
    },
    {
      year: "Futuro",
      title: "Expansão Regional",
      description: "Crescimento para atender todo o território nacional com centros de distribuição estratégicos"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-dark-navy to-sky-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-gotham">
              A Nogária transforma a{' '}
              <span className="bg-gradient-to-r from-neon-green to-grass-green bg-clip-text text-transparent">
                gestão de suprimentos corporativos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-sky-blue font-light">
              Inovação, agilidade e excelência em cada entrega
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-dark-navy font-gotham">
              Nossos Pilares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-r from-sky-blue to-grass-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-dark-navy font-gotham">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-dark-navy font-gotham">
              Nossa Jornada
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-sky-blue to-grass-green rounded-full hidden md:block"></div>
              
              <div className="space-y-12">
                {timeline.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:pr-8">
                      <Card className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} border-none shadow-lg`}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4 justify-center md:justify-start">
                            <Calendar className="w-6 h-6 text-grass-green mr-2" />
                            <span className="text-2xl font-bold text-grass-green font-gotham">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-dark-navy font-gotham">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:block w-4 h-4 bg-neon-green rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="flex-1 md:pl-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
