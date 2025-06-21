export type Phase = 'welcome' | 'questionnaire' | 'lead-capture' | 'results' | 'report';

export interface AmbienteConfig {
  id: string;
  tipo: string;
  areaM2: number;
  // Banheiro/Vestiário specific fields
  numeroCabines?: number;
  numeroMictorio?: number;
  numeroLavatório?: number;
  // Cozinha/Refeitório specific fields
  numeroFogoes?: number;
  numeroGeladeiras?: number;
  numeroMesas?: number;
  // Other type description
  descricaoOutro?: string;
  // NR-24 compliance fields
  nr24_pisosConservados?: boolean;
  nr24_paredesLavaveisImpermeaveis?: boolean;
  nr24_lixeirasComTampaBanheiroCozinha?: boolean;
  nr24_fornecimentoHigienicosContinuo?: boolean;
  nr24_coletorAbsorventesFeminino?: boolean;
  nr24_higienizacaoSuperficiesAlimentosCozinha?: boolean;
}

export interface RegistrationData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  cnpj: string;
  jobTitle: string;
  companySegment: string;
  lgpdConsent: boolean;
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

export interface QuestionnaireStep {
  title: string;
  description: string;
}
