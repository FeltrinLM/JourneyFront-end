import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports relativos à pasta 'table'
import { HistoricoAlteracaoService } from '../../../core/services/api/historico-alteracao.service';
import { UsuarioService } from '../../../core/services/api/usuario.service';
import { HistoricoAlteracaoDTO, UsuarioDTO } from '../../../core/services/api/base-api.service';

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
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  public historicoAgrupado: DisplayHistorico[] = [];
  public isLoading = true; // Use como indicador de que TUDO está carregando

  // Signal para armazenar usuários
  public usuarios = signal<UsuarioDTO[]>([]);

  // statusUsuarios é útil para o obterNomeUsuario
  public statusUsuarios: 'carregando' | 'sucesso' | 'erro' = 'carregando';

  private historicoService = inject(HistoricoAlteracaoService);
  private usuarioService = inject(UsuarioService);

  ngOnInit(): void {
    // 1. Inicia o carregamento de usuários
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.statusUsuarios = 'carregando';

    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        console.log('Usuários carregados com sucesso:', data);
        this.usuarios.set(data);
        this.statusUsuarios = 'sucesso';

        // 🚨 CHAVE DA CORREÇÃO:
        // Assim que os usuários carregam, chamamos o histórico
        this.carregarHistorico();

      },
      error: (err) => {
        console.error('ERRO CRÍTICO ao carregar usuários:', err);
        this.statusUsuarios = 'erro';
        // Se der erro nos usuários, ainda tentamos carregar o histórico
        this.carregarHistorico();
      }
    });
  }

  carregarHistorico(): void {
    this.isLoading = true;

    this.historicoService.listarAlteracoes().subscribe({
      next: (data) => {
        const dadosOrdenados = data.sort((a, b) =>
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
        );
        // O processarHistorico agora é garantido a rodar após o usuários.set()
        this.historicoAgrupado = this.processarHistorico(dadosOrdenados);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar histórico:', err);
        this.isLoading = false;
      }
    });
  }

  // A função obterNomeUsuario() está perfeita, não precisa de alteração.
  // Ela será chamada pelo template, e agora o statusUsuarios será 'sucesso' (ou 'erro')
  // antes de o histórico ser renderizado.
  obterNomeUsuario(id: number): string {
    if (this.statusUsuarios === 'carregando') {
      return 'Carregando...';
    }

    if (this.statusUsuarios === 'erro') {
      return 'Erro ao carregar usuários';
    }

    const lista = this.usuarios();

    // CORREÇÃO AQUI: mudamos de u.id para u.usuarioId
    const usuario = lista.find(u => u.usuarioId === id);

    return usuario?.nome ?? `Desconhecido (ID: ${id})`;
  }

  private processarHistorico(items: HistoricoAlteracaoDTO[]): DisplayHistorico[] {
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
