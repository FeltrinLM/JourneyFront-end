// Define o tipo do DTO principal que vem do seu endpoint
export interface HistoricoAlteracaoDTO {
  id: number;
  entidade: string;
  entidadeId: number;
  campoAlterado: string;
  valorAntigo: string | null;
  valorNovo: string | null;
  dataHora: string; // O Angular irá receber o LocalDateTime como string
  usuarioId: number;
}

// Interfaces dos outros DTOs (para referência futura, se necessário)
export interface AdesivoDTO {
  adesivoId: number;
  adesivoModelo: string;
  cromatico: boolean;
}

export interface ChaveiroDTO {
  chaveiroId: number;
  chaveiroModelo: string;
  colecaoId: number;
}

export interface ColecaoDTO {
  colecaoId: number;
  nome: string;
  dataInicio: string; // LocalDate também virá como string
  dataFim: string; // LocalDate também virá como string
}

export interface EstampaDTO {
  estampaId: number;
  nome: string;
  quantidade: number;
  colecaoId: number;
}

export interface PecaDTO {
  pecaId: number;
  tipo: string;
  tamanho: string;
  cor: string;
  quantidade: number;
}

export interface UsuarioDTO {
  usuarioId: number;
  nome: string;
  senha?: string; // Senha é opcional no DTO de resposta
  tipo: string;
}
