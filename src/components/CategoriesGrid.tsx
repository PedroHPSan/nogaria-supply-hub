
import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplet, 
  Sparkles, 
  HardHat, 
  Utensils, 
  Package, 
  FileText, 
  Briefcase, 
  Monitor 
} from 'lucide-react';

const CategoriesGrid = () => {
  const categories = [
    {
      name: 'Limpeza',
      icon: Droplet,
      gradient: 'from-azure to-sky-blue',
      products: '200+ produtos'
    },
    {
      name: 'Higiene',
      icon: Sparkles,
      gradient: 'from-sky-blue to-grass-green',
      products: '150+ produtos'
    },
    {
      name: 'EPI',
      icon: HardHat,
      gradient: 'from-deep-blue to-azure',
      products: '80+ produtos'
    },
    {
      name: 'Descartáveis',
      icon: Utensils,
      gradient: 'from-grass-green to-neon-green',
      products: '120+ produtos'
    },
    {
      name: 'Plásticos',
      icon: Package,
      gradient: 'from-azure to-deep-blue',
      products: '90+ produtos'
    },
    {
      name: 'Papelaria',
      icon: FileText,
      gradient: 'from-neon-green to-grass-green',
      products: '300+ produtos'
    },
    {
      name: 'Material de Escritório',
      icon: Briefcase,
      gradient: 'from-deep-blue to-sky-blue',
      products: '180+ produtos'
    },
    {
      name: 'Suprimentos de Informática',
      icon: Monitor,
      gradient: 'from-sky-blue to-azure',
      products: '100+ produtos'
    }
  ];

  return (
    <section id="categorias" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-navy mb-4">
            Encontre tudo em um só lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todas as categorias que sua empresa precisa em uma plataforma integrada
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.name}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-br ${category.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-lg text-dark-navy mb-2 group-hover:text-azure transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {category.products}
                  </p>
                  
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-grass-green hover:bg-neon-green text-dark-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg">
            Ver todas as categorias
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
