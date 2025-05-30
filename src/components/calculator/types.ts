
export interface AmbienteConfig {
  id: string;
  tipo: string;
  areaM2: number;
  descricaoOutro?: string;
  // Dados específicos para banheiros
  numeroCabines?: number;
  numeroMictorio?: number;
  numeroLavatório?: number;
  // Dados específicos para cozinha
  numeroFogoes?: number;
  numeroGeladeiras?: number;
  numeroMesas?: number;
  // Questões NR-24
  nr24_pisosConservados?: boolean;
  nr24_paredesLavaveisImpermeaveis?: boolean;
  nr24_lixeirasComTampaBanheiroCozinha?: boolean;
  nr24_fornecimentoHigienicosContinuo?: boolean;
  nr24_coletorAbsorventesFeminino?: boolean;
  nr24_higienizacaoSuperficiesAlimentosCozinha?: boolean;
}

export interface CalculatorInput {
  numeroFuncionarios: number;
  frequenciaLimpezaManutencaoDiaria: string;
  frequenciaLimpezaProfundaPisos: string;
  frequenciaHigienizacaoBanheiros: string;
  frequenciaLimpezaAltoContato: string;
  nivelSujidadeGeral: string;
  ambientes: AmbienteConfig[];
  possuiProgramaControlePragas: boolean;
  produtosAnvisaUtilizados: boolean;
  fispqDisponivel: boolean;
  episFornecidosUtilizados: boolean;
}

export interface RegistrationData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  cnpj: string;
  companySegment: string;
  jobTitle: string;
  lgpdConsent: boolean;
}

export type Phase = 'welcome' | 'questionnaire' | 'lead-capture' | 'results';
