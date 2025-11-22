// Adesivo
export interface AdesivoDTO {
  adesivoId: number;
  adesivoModelo: string;
  cromatico: boolean;
}

export interface AdesivoEdicaoDTO {
  adesivoModelo: string;
  cromatico: boolean;
}

// Chaveiro
export interface ChaveiroDTO {
  chaveiroId: number;
  chaveiroModelo: string;
  colecaoId: number;
}

export interface ChaveiroEdicaoDTO {
  chaveiroModelo: string;
  colecaoId: number;
}

// Estampa
export interface EstampaDTO {
  estampaId: number;
  nome: string;
  quantidade: number;
  colecaoId: number;
}

export interface EstampaEdicaoDTO {
  nome: string;
  quantidade: number;
  colecaoId: number;
}

// Peça
export interface PecaDTO {
  pecaId: number;
  tipo: string;
  tamanho: string;
  cor: string;
  quantidade: number;
}

export interface PecaEdicaoDTO {
  tipo: string;
  tamanho: string;
  cor: string;
  quantidade: number;
}

// Coleção
export interface ColecaoDTO {
  colecaoId: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
}

export interface ColecaoEdicaoDTO {
  nome: string;
  dataInicio: string;
  dataFim: string;
}

// Histórico
export interface HistoricoAlteracaoDTO {
  id: number;
  entidade: string;
  entidadeId: number;
  campoAlterado: string;
  valorAntigo: string | null;
  valorNovo: string | null;
  dataHora: string;
  usuarioId: number;
}

// Usuário
export interface UsuarioDTO {
  usuarioId: number;
  nome: string;
  tipo: string;
  senha?: string;
}
