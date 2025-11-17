// CORREÇÃO: "@angular/core" (com a barra)
import { Component, OnInit } from '@angular/core';

// Adicionado da etapa anterior (necessário para *ngFor, *ngIf, etc.)
import { CommonModule } from '@angular/common';
// REMOVIDO: HttpClientModule (não deve ficar aqui)

import { HistoricoAlteracaoService } from './services/historico-alteracao.service';
import { HistoricoAlteracaoDTO } from './services/models';

// Interface para os dados agrupados
interface DisplayHistorico {
  acao: 'Adicionado' | 'Editado' | 'Excluído';
  acaoClass: 'action-add' | 'action-edit' | 'action-delete';
  item: string;
  responsavel: number;
  dataHora: string;
  detalhes: string[];
}


@Component({
  selector: 'app-tabela-historico',
  standalone: true,
  imports: [
    CommonModule       // Apenas o CommonModule fica aqui
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
  // REMOVIDO: O array 'providers' não é mais necessário
})
export class TableComponent implements OnInit {

  public historicoAgrupado: DisplayHistorico[] = [];
  public isLoading = true;

  // O serviço será injetado globalmente (providedIn: 'root')
  constructor(private historicoService: HistoricoAlteracaoService) {}

  ngOnInit(): void {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.isLoading = true;

    // --- IMPORTANTE: Adicione este console.log ---
    console.log("Tentando buscar dados de:", this.historicoService.API_URL_PARA_DEBUG()); // Veja Passo 3

    this.historicoService.listarAlteracoes().subscribe({
      next: (data) => {
        // --- IMPORTANTE: Adicione este console.log ---
        console.log("DADOS BRUTOS RECEBIDOS:", data);

        const dadosOrdenados = data.sort((a, b) =>
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
        );
        this.historicoAgrupado = this.processarHistorico(dadosOrdenados);

        // --- IMPORTANTE: Adicione este console.log ---
        console.log("DADOS PROCESSADOS PARA TABELA:", this.historicoAgrupado);

        this.isLoading = false;
      },
      error: (err) => {
        // --- IMPORTANTE: Adicione este console.log ---
        console.error('ERRO AO BUSCAR HISTÓRICO:', err);
        this.isLoading = false;
      }
    });
  }

  // ... (função processarHistorico() está correta, mantenha)
  private processarHistorico(items: HistoricoAlteracaoDTO[]): DisplayHistorico[] {
    // ... (seu código de agrupamento)
    const eventosAgrupados = items.reduce((acc, item) => {
      const chave = `${item.dataHora}|${item.usuarioId}|${item.entidadeId}|${item.entidade}`;

      if (!acc[chave]) {
        acc[chave] = [];
      }
      acc[chave].push(item);
      return acc;
    }, {} as Record<string, HistoricoAlteracaoDTO[]>);

    return Object.values(eventosAgrupados).map((grupo: HistoricoAlteracaoDTO[]): DisplayHistorico => {
      const primeiroItem = grupo[0];
      let acao: 'Adicionado' | 'Editado' | 'Excluído';
      let acaoClass: 'action-add' | 'action-edit' | 'action-delete';

      const foiCriado = primeiroItem.valorAntigo == null && primeiroItem.valorNovo != null;
      const foiExcluido = primeiroItem.valorAntigo != null && primeiroItem.valorNovo == null;

      if (foiCriado) {
        acao = 'Adicionado';
        acaoClass = 'action-add';
      } else if (foiExcluido) {
        acao = 'Excluído';
        acaoClass = 'action-delete';
      } else {
        acao = 'Editado';
        acaoClass = 'action-edit';
      }

      const detalhesFormatados = grupo.map(item => {
        if (acao === 'Adicionado') {
          return `${item.campoAlterado}: ${item.valorNovo}`;
        }
        if (acao === 'Excluído') {
          return `${item.campoAlterado}: ${item.valorAntigo}`;
        }
        return `${item.campoAlterado}: ${item.valorAntigo} → ${item.valorNovo}`;
      });

      return {
        acao: acao,
        acaoClass: acaoClass,
        item: primeiroItem.entidade,
        responsavel: primeiroItem.usuarioId,
        dataHora: primeiroItem.dataHora,
        detalhes: detalhesFormatados
      };
    });
  }
}
