
import { CalculatorInput, AmbienteConfig } from './types';

export interface CalculationResult {
  totalAreaM2: number;
  numeroFuncionarios: number;
  productsByCategory: {
    higiene: ProductRecommendation[];
    limpezaSuperficies: ProductRecommendation[];
    coletaResiduos: ProductRecommendation[];
    acessorios: ProductRecommendation[];
  };
  custoMensalTotal: number;
  custoComDesconto: number;
  percentualDesconto: number;
  estimativaMensal: string;
  relatorioDetalhado: {
    ambientes: AmbienteResult[];
    resumoGeral: string;
  };
}

export interface ProductRecommendation {
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
  custoTotal: number;
  formula: string;
}

export interface AmbienteResult {
  id: string;
  tipo: string;
  area: number;
  usuarios: number;
  produtos: ProductRecommendation[];
}

export class CalculationEngine {
  // Multipliers based on dirtiness level
  private static readonly DIRTINESS_MULTIPLIERS: { [key: string]: number } = {
    'baixo': 0.8,
    'medio': 1.0,
    'alto': 1.3
  };

  // Base pricing (R$)
  private static readonly PRODUCT_PRICES: { [key: string]: number } = {
    'desinfetante': 15.50,
    'papel_toalha': 45.00,
    'papel_higienico': 28.00,
    'sabonete_liquido': 22.00,
    'saco_lixo': 35.00,
    'alcool_70': 18.00,
    'pano_microfibra': 12.00,
    'detergente': 8.50,
    'limpa_vidros': 14.00
  };

  static calculate(data: CalculatorInput): CalculationResult {
    const totalAreaM2 = this.calculateTotalArea(data.ambientes);
    const totalUsuarios = data.numeroFuncionarios;
    const dirtinessMultiplier = this.DIRTINESS_MULTIPLIERS[data.nivelSujidadeGeral] || 1.0;
    const frequencyMultiplier = this.getFrequencyMultiplier(data.frequenciaLimpezaManutencaoDiaria);

    const productsByCategory = this.calculateProductsByCategory(
      data.ambientes,
      totalUsuarios,
      dirtinessMultiplier,
      frequencyMultiplier
    );

    const custoMensalTotal = this.calculateTotalCost(productsByCategory);
    const percentualDesconto = 15; // 15% subscription discount
    const custoComDesconto = custoMensalTotal * (1 - percentualDesconto / 100);

    const relatorioDetalhado = this.generateDetailedReport(data, productsByCategory);

    return {
      totalAreaM2,
      numeroFuncionarios: totalUsuarios,
      productsByCategory,
      custoMensalTotal,
      custoComDesconto,
      percentualDesconto,
      estimativaMensal: this.generateMonthlyEstimate(data),
      relatorioDetalhado
    };
  }

  private static calculateTotalArea(ambientes: AmbienteConfig[]): number {
    return ambientes.reduce((total, ambiente) => total + ambiente.areaM2, 0);
  }

  private static getFrequencyMultiplier(frequency: string): number {
    const multipliers: { [key: string]: number } = {
      'diaria': 1.0,
      'semanal': 0.3,
      'quinzenal': 0.15,
      'mensal': 0.05
    };
    return multipliers[frequency] || 1.0;
  }

  private static calculateProductsByCategory(
    ambientes: AmbienteConfig[],
    usuarios: number,
    dirtinessMultiplier: number,
    frequencyMultiplier: number
  ): CalculationResult['productsByCategory'] {
    const totalArea = this.calculateTotalArea(ambientes);
    const banheiros = ambientes.filter(a => a.tipo === 'banheiro').length;

    // HIGIENE PRODUCTS
    const higiene: ProductRecommendation[] = [
      {
        nome: 'Papel Toalha (Fardos)',
        categoria: 'higiene',
        quantidade: Math.ceil(usuarios * 5 * 1.5 * 22 / 2000),
        unidade: 'fardos',
        custoUnitario: this.PRODUCT_PRICES.papel_toalha,
        custoTotal: 0,
        formula: 'usuários × 5 lavagens/dia × 1.5 folhas × 22 dias ÷ 2000'
      },
      {
        nome: 'Papel Higiênico (Fardos)',
        categoria: 'higiene', 
        quantidade: Math.ceil(usuarios * 3 / 4),
        unidade: 'fardos',
        custoUnitario: this.PRODUCT_PRICES.papel_higienico,
        custoTotal: 0,
        formula: 'usuários × 3 rolos/semana ÷ 4 semanas'
      },
      {
        nome: 'Sabonete Líquido (Refil 800ml)',
        categoria: 'higiene',
        quantidade: Math.ceil(usuarios * 5 * 1.5 * 22 / 800),
        unidade: 'refis',
        custoUnitario: this.PRODUCT_PRICES.sabonete_liquido,
        custoTotal: 0,
        formula: 'usuários × 5 lavagens/dia × 1.5ml × 22 dias ÷ 800ml'
      }
    ];

    // SURFACE CLEANING
    const limpezaSuperficies: ProductRecommendation[] = [
      {
        nome: 'Desinfetante (Litros)',
        categoria: 'limpeza_superficies',
        quantidade: Math.ceil(totalArea * frequencyMultiplier * 0.05 * dirtinessMultiplier),
        unidade: 'litros',
        custoUnitario: this.PRODUCT_PRICES.desinfetante,
        custoTotal: 0,
        formula: 'área × frequência × 0.05 × multiplicador_sujidade'
      },
      {
        nome: 'Álcool 70% (Litros)',
        categoria: 'limpeza_superficies',
        quantidade: Math.max(2, Math.ceil(totalArea / 100)),
        unidade: 'litros',
        custoUnitario: this.PRODUCT_PRICES.alcool_70,
        custoTotal: 0,
        formula: 'área ÷ 100 (mínimo 2L)'
      },
      {
        nome: 'Detergente Neutro (Litros)',
        categoria: 'limpeza_superficies',
        quantidade: Math.ceil(totalArea / 50 * dirtinessMultiplier),
        unidade: 'litros',
        custoUnitario: this.PRODUCT_PRICES.detergente,
        custoTotal: 0,
        formula: 'área ÷ 50 × multiplicador_sujidade'
      },
      {
        nome: 'Limpa Vidros (Litros)',
        categoria: 'limpeza_superficies',
        quantidade: Math.max(1, Math.ceil(totalArea / 200)),
        unidade: 'litros',
        custoUnitario: this.PRODUCT_PRICES.limpa_vidros,
        custoTotal: 0,
        formula: 'área ÷ 200 (mínimo 1L)'
      }
    ];

    // WASTE COLLECTION
    const coletaResiduos: ProductRecommendation[] = [
      {
        nome: 'Sacos de Lixo (Pacotes)',
        categoria: 'coleta_residuos',
        quantidade: Math.ceil(banheiros * 2 * 22 / 100),
        unidade: 'pacotes',
        custoUnitario: this.PRODUCT_PRICES.saco_lixo,
        custoTotal: 0,
        formula: 'banheiros × 2 trocas/dia × 22 dias ÷ 100 sacos/pacote'
      }
    ];

    // ACCESSORIES
    const acessorios: ProductRecommendation[] = [
      {
        nome: 'Panos de Microfibra',
        categoria: 'acessorios',
        quantidade: Math.max(5, Math.ceil(totalArea / 50)),
        unidade: 'unidades',
        custoUnitario: this.PRODUCT_PRICES.pano_microfibra,
        custoTotal: 0,
        formula: 'área ÷ 50 (mínimo 5 unidades)'
      }
    ];

    // Calculate total costs
    [...higiene, ...limpezaSuperficies, ...coletaResiduos, ...acessorios].forEach(product => {
      product.custoTotal = product.quantidade * product.custoUnitario;
    });

    return {
      higiene,
      limpezaSuperficies,
      coletaResiduos,
      acessorios
    };
  }

  private static calculateTotalCost(productsByCategory: CalculationResult['productsByCategory']): number {
    const allProducts = [
      ...productsByCategory.higiene,
      ...productsByCategory.limpezaSuperficies,
      ...productsByCategory.coletaResiduos,
      ...productsByCategory.acessorios
    ];
    
    return allProducts.reduce((total, product) => total + product.custoTotal, 0);
  }

  private static generateMonthlyEstimate(data: CalculatorInput): string {
    const totalArea = this.calculateTotalArea(data.ambientes);
    return `Estimativa baseada em ${data.numeroFuncionarios} funcionários, ${totalArea}m² de área total, ` +
           `com limpeza ${data.frequenciaLimpezaManutencaoDiaria} e nível de sujidade ${data.nivelSujidadeGeral}.`;
  }

  private static generateDetailedReport(
    data: CalculatorInput, 
    productsByCategory: CalculationResult['productsByCategory']
  ): CalculationResult['relatorioDetalhado'] {
    const ambientes = data.ambientes.map(ambiente => ({
      id: ambiente.id,
      tipo: ambiente.tipo,
      area: ambiente.areaM2,
      usuarios: Math.ceil(data.numeroFuncionarios * (ambiente.areaM2 / this.calculateTotalArea(data.ambientes))),
      produtos: [...productsByCategory.higiene, ...productsByCategory.limpezaSuperficies]
        .filter(p => p.quantidade > 0)
        .slice(0, 3)
    }));

    const resumoGeral = `Análise completa para empresa com ${data.numeroFuncionarios} funcionários em ${data.ambientes.length} ambientes. ` +
                       `Frequência de limpeza ${data.frequenciaLimpezaManutencaoDiaria} com nível de sujidade ${data.nivelSujidadeGeral}.`;

    return { ambientes, resumoGeral };
  }
}
