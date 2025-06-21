
export type Phase = 'welcome' | 'questionnaire' | 'lead-capture' | 'results' | 'report';

export interface CalculatorInput {
  numeroFuncionarios: number;
  frequenciaLimpezaManutencaoDiaria: string;
  frequenciaLimpezaProfundaPisos: string;
  frequenciaHigienizacaoBanheiros: string;
  frequenciaLimpezaAltoContato: string;
  nivelSujidadeGeral: string;
  ambientes: string[];
  possuiProgramaControlePragas: boolean;
  produtosAnvisaUtilizados: boolean;
  fispqDisponivel: boolean;
  episFornecidosUtilizados: boolean;
}

export interface QuestionnaireStep {
  title: string;
  description: string;
}
