import { Component, OnInit, inject } from '@angular/core'; // 1. Adicionado inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // 2. Adicionado para tipar o erro
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { EstampaService } from '../../../app/core/services/api/estampa.service';
import { ColecaoService } from '../../../app/core/services/api/colecao.service';
import { EstampaDTO, ColecaoDTO } from '../../../app/core/models';

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

  // 3. Injeções convertidas
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private estampaService = inject(EstampaService);
  private colecaoService = inject(ColecaoService);

  estampa: EstampaEdicaoDTO = {
    nome: '',
    quantidade: 0,
    colecaoId: 0
  };

  colecoes: ColecaoDTO[] = [];
  id!: number;

  // 4. Removidas anotações de tipo redundantes
  carregando = true;
  erroCarregamento = '';

  // Construtor removido!

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
      error: (err: HttpErrorResponse) => { // Tipado corretamente
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
      error: (err: HttpErrorResponse) => { // Tipado corretamente
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
      error: (err: HttpErrorResponse) => { // Tipado corretamente
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
