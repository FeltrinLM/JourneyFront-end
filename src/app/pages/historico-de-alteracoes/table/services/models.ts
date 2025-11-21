export interface UsuarioDTO {
  usuarioId: number; // <--- Mude de 'id' para 'usuarioId' para bater com o Java
  nome: string;
  tipo: string;
  senha?: string; // Opcional
}

// (As outras interfaces continuam iguais)
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
