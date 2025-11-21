import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { EstampaService, EstampaDTO } from '../visu-geral/item-list-accordion/services/estampa.service';
import { ColecaoService, ColecaoDTO } from '../visu-geral/item-list-accordion/services/colecao.service';

interface EstampaEdicaoDTO {
  nome: string;
  quantidade: number;
  colecaoId: number;
}

@Component({
  standalone: true,
  selector: 'app-editar-estampa',
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './editar-estampa.html',
  styleUrl: './editar-estampa.css'
})
export class EditarEstampa implements OnInit {

  estampa: EstampaEdicaoDTO = {
    nome: '',
    quantidade: 0,
    colecaoId: 0
  };

  colecoes: ColecaoDTO[] = [];
  id!: number;
  carregando: boolean = true;
  erroCarregamento: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estampaService: EstampaService,
    private colecaoService: ColecaoService
  ) {}

  ngOnInit(): void {
    this.carregarIdEEstampa();
    this.carregarColecoes();
  }

  carregarIdEEstampa(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (!idFromRoute) {
      this.erroCarregamento = 'ID da estampa não encontrado na URL';
      this.carregando = false;
      return;
    }

    this.id = Number(idFromRoute);

    if (isNaN(this.id) || this.id <= 0) {
      this.erroCarregamento = 'ID da estampa inválido: ' + idFromRoute;
      this.carregando = false;
      return;
    }

    this.carregarEstampa();
  }

  carregarColecoes(): void {
    this.colecaoService.listarColecoes().subscribe({
      next: (data) => {
        this.colecoes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar coleções:', err);
      }
    });
  }

  carregarEstampa(): void {
    this.carregando = true;
    this.erroCarregamento = '';

    this.estampaService.buscarPorId(this.id).subscribe({
      next: (data: EstampaDTO) => {
        console.log('Dados recebidos da API:', data);

        this.estampa = {
          nome: data.nome || '',
          quantidade: data.quantidade || 0,
          colecaoId: data.colecaoId || 0
        };

        console.log('Dados formatados para edição:', this.estampa);
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro completo ao carregar estampa:', err);

        if (err.status === 404 || err.status === 500) {
          this.erroCarregamento = `Estampa não encontrada com ID: ${this.id}. Verifique se a estampa existe.`;
        } else if (err.status === 0) {
          this.erroCarregamento = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else {
          this.erroCarregamento = `Erro ao carregar estampa: ${err.message || 'Erro desconhecido'}`;
        }

        this.carregando = false;
      }
    });
  }

  obterNomeColecao(colecaoId: number): string {
    const colecao = this.colecoes.find(c => c.colecaoId === colecaoId);
    return colecao ? colecao.nome : 'Carregando...';
  }

  salvarEdicao(): void {
    if (!this.validarFormulario()) {
      return;
    }

    console.log('Enviando dados para API:', this.estampa);

    this.estampaService.atualizar(this.id, this.estampa).subscribe({
      next: () => {
        alert('Estampa atualizada com sucesso!');
        this.router.navigate(['/visu-geral']);
      },
      error: (err) => {
        console.error('Erro ao salvar edição:', err);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.estampa.nome || this.estampa.nome.trim() === '') {
      alert('Por favor, informe o nome da estampa');
      return false;
    }

    if (this.estampa.quantidade < 0) {
      alert('A quantidade não pode ser negativa');
      return false;
    }

    if (!this.estampa.colecaoId || this.estampa.colecaoId <= 0) {
      alert('Por favor, selecione uma coleção');
      return false;
    }

    return true;
  }

  tentarNovamente(): void {
    this.carregarIdEEstampa();
  }

  voltar(): void {
    this.router.navigate(['/visu-geral']);
  }
}
