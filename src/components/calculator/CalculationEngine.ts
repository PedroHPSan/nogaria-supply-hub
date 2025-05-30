
import { CalculatorInput, AmbienteConfig } from './types';

export interface CalculationResult {
  totalAreaM2: number;
  numeroFuncionarios: number;
  horasLimpezaDiaria: number;
  horasLimpezaSemanal: number;
  horasLimpezaMensal: number;
  custoProdutosMensal: number;
  custoMaoObraMensal: number;
  custoTotalMensal: number;
  equipamentosNecessarios: string[];
  produtosRecomendados: ProductRecommendation[];
  conformidadeNR24: {
    percentualConformidade: number;
    itensNaoConformes: string[];
    recomendacoes: string[];
  };
  relatorioDetalhado: {
    ambientes: AmbienteResult[];
    resumoGeral: string;
  };
}

export interface ProductRecommendation {
  categoria: string;
  produto: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
  custoTotal: number;
}

export interface AmbienteResult {
  id: string;
  tipo: string;
  area: number;
  horasDiarias: number;
  produtosEspecificos: ProductRecommendation[];
}

export class CalculationEngine {
  private static readonly HORAS_BASE_POR_M2: { [key: string]: number } = {
    'escritorio': 0.05,
    'banheiro': 0.8,
    'cozinha': 0.6,
    'almoxarifado': 0.03,
    'auditorio': 0.04,
    'laboratorio': 0.15,
    'outro': 0.05
  };

  private static readonly CUSTO_PRODUTOS_POR_M2: { [key: string]: number } = {
    'escritorio': 2.50,
    'banheiro': 15.00,
    'cozinha': 12.00,
    'almoxarifado': 1.80,
    'auditorio': 2.00,
    'laboratorio': 8.50,
    'outro': 3.00
  };

  static calculate(data: CalculatorInput): CalculationResult {
    const totalAreaM2 = this.calculateTotalArea(data.ambientes);
    const horasLimpezaDiaria = this.calculateHorasDiarias(data);
    const horasLimpezaSemanal = horasLimpezaDiaria * 5;
    const horasLimpezaMensal = horasLimpezaSemanal * 4.33;

    const custoProdutosMensal = this.calculateCustoProdutos(data);
    const custoMaoObraMensal = this.calculateCustoMaoObra(horasLimpezaMensal);
    const custoTotalMensal = custoProdutosMensal + custoMaoObraMensal;

    const equipamentosNecessarios = this.getEquipamentosNecessarios(data.ambientes);
    const produtosRecomendados = this.getProdutosRecomendados(data);
    const conformidadeNR24 = this.calculateConformidadeNR24(data);
    const relatorioDetalhado = this.generateRelatorioDetalhado(data);

    return {
      totalAreaM2,
      numeroFuncionarios: data.numeroFuncionarios,
      horasLimpezaDiaria,
      horasLimpezaSemanal,
      horasLimpezaMensal,
      custoProdutosMensal,
      custoMaoObraMensal,
      custoTotalMensal,
      equipamentosNecessarios,
      produtosRecomendados,
      conformidadeNR24,
      relatorioDetalhado
    };
  }

  private static calculateTotalArea(ambientes: AmbienteConfig[]): number {
    return ambientes.reduce((total, ambiente) => total + ambiente.areaM2, 0);
  }

  private static calculateHorasDiarias(data: CalculatorInput): number {
    let horasBase = 0;
    
    data.ambientes.forEach(ambiente => {
      const horasPorM2 = this.HORAS_BASE_POR_M2[ambiente.tipo] || 0.05;
      horasBase += ambiente.areaM2 * horasPorM2;
    });

    // Ajustes baseados na frequência
    const multiplicadorFrequencia = this.getMultiplicadorFrequencia(data.frequenciaLimpezaManutencaoDiaria);
    horasBase *= multiplicadorFrequencia;

    // Ajustes baseados no nível de sujidade
    const multiplicadorSujidade = this.getMultiplicadorSujidade(data.nivelSujidadeGeral);
    horasBase *= multiplicadorSujidade;

    return Math.round(horasBase * 100) / 100;
  }

  private static getMultiplicadorFrequencia(frequencia: string): number {
    const multiplicadores: { [key: string]: number } = {
      '1x': 1.0,
      '2x': 0.8,
      '3x': 0.7,
      'mais-3x': 0.6
    };
    return multiplicadores[frequencia] || 1.0;
  }

  private static getMultiplicadorSujidade(nivel: string): number {
    const multiplicadores: { [key: string]: number } = {
      'baixo': 0.8,
      'medio': 1.0,
      'alto': 1.3,
      'muito-alto': 1.6
    };
    return multiplicadores[nivel] || 1.0;
  }

  private static calculateCustoProdutos(data: CalculatorInput): number {
    let custoTotal = 0;
    
    data.ambientes.forEach(ambiente => {
      const custoPorM2 = this.CUSTO_PRODUTOS_POR_M2[ambiente.tipo] || 3.00;
      custoTotal += ambiente.areaM2 * custoPorM2;
    });

    return Math.round(custoTotal * 100) / 100;
  }

  private static calculateCustoMaoObra(horasMensais: number): number {
    const custoHora = 25.00; // R$ 25,00 por hora
    return Math.round(horasMensais * custoHora * 100) / 100;
  }

  private static getEquipamentosNecessarios(ambientes: AmbienteConfig[]): string[] {
    const equipamentos = new Set<string>();
    
    ambientes.forEach(ambiente => {
      switch (ambiente.tipo) {
        case 'banheiro':
          equipamentos.add('Carrinho de limpeza para banheiros');
          equipamentos.add('MOP com sistema duplo balde');
          equipamentos.add('Panos de microfibra específicos');
          break;
        case 'cozinha':
          equipamentos.add('Equipamentos para cozinha industrial');
          equipamentos.add('Panos descartáveis para superfícies alimentares');
          break;
        case 'escritorio':
          equipamentos.add('Aspirador de pó profissional');
          equipamentos.add('Panos de microfibra para móveis');
          break;
        default:
          equipamentos.add('Kit básico de limpeza');
      }
    });

    return Array.from(equipamentos);
  }

  private static getProdutosRecomendados(data: CalculatorInput): ProductRecommendation[] {
    const produtos: ProductRecommendation[] = [];
    
    data.ambientes.forEach(ambiente => {
      switch (ambiente.tipo) {
        case 'banheiro':
          produtos.push({
            categoria: 'Desinfetantes',
            produto: 'Desinfetante sanitário ANVISA',
            quantidade: Math.ceil(ambiente.areaM2 / 50),
            unidade: 'litros',
            custoUnitario: 45.00,
            custoTotal: Math.ceil(ambiente.areaM2 / 50) * 45.00
          });
          break;
        case 'cozinha':
          produtos.push({
            categoria: 'Sanitizantes',
            produto: 'Sanitizante para superfícies alimentares',
            quantidade: Math.ceil(ambiente.areaM2 / 30),
            unidade: 'litros',
            custoUnitario: 52.00,
            custoTotal: Math.ceil(ambiente.areaM2 / 30) * 52.00
          });
          break;
        default:
          produtos.push({
            categoria: 'Multiuso',
            produto: 'Limpador multiuso neutro',
            quantidade: Math.ceil(ambiente.areaM2 / 100),
            unidade: 'litros',
            custoUnitario: 28.00,
            custoTotal: Math.ceil(ambiente.areaM2 / 100) * 28.00
          });
      }
    });

    return produtos;
  }

  private static calculateConformidadeNR24(data: CalculatorInput): any {
    const itensVerificados = [];
    const itensNaoConformes = [];
    const recomendacoes = [];

    data.ambientes.forEach(ambiente => {
      if (ambiente.tipo === 'banheiro' || ambiente.tipo === 'cozinha') {
        itensVerificados.push('pisosConservados', 'paredesLavaveisImpermeaveis', 'lixeirasComTampaBanheiroCozinha');
        
        if (!ambiente.nr24_pisosConservados) {
          itensNaoConformes.push('Pisos não estão adequadamente conservados');
          recomendacoes.push('Realizar manutenção preventiva dos pisos');
        }
        
        if (!ambiente.nr24_paredesLavaveisImpermeaveis) {
          itensNaoConformes.push('Paredes não são laváveis e impermeáveis');
          recomendacoes.push('Adequar paredes conforme NR-24');
        }
      }
    });

    const percentualConformidade = itensVerificados.length > 0 
      ? Math.round(((itensVerificados.length - itensNaoConformes.length) / itensVerificados.length) * 100)
      : 100;

    return {
      percentualConformidade,
      itensNaoConformes,
      recomendacoes
    };
  }

  private static generateRelatorioDetalhado(data: CalculatorInput): any {
    const ambientes = data.ambientes.map(ambiente => ({
      id: ambiente.id,
      tipo: ambiente.tipo,
      area: ambiente.areaM2,
      horasDiarias: ambiente.areaM2 * (this.HORAS_BASE_POR_M2[ambiente.tipo] || 0.05),
      produtosEspecificos: this.getProdutosRecomendados({ ...data, ambientes: [ambiente] })
    }));

    const resumoGeral = `
      Relatório baseado em ${data.numeroFuncionarios} funcionários e ${data.ambientes.length} ambientes.
      Frequência de limpeza: ${data.frequenciaLimpezaManutencaoDiaria}.
      Nível de sujidade: ${data.nivelSujidadeGeral}.
    `;

    return { ambientes, resumoGeral };
  }
}
