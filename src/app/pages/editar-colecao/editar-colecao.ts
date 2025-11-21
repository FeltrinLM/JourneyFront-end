import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { ColecaoService, ColecaoDTO, ColecaoEdicaoDTO } from '../visu-geral/item-list-accordion/services/colecao.service';

@Component({
  selector: 'app-editar-colecao',
  standalone: true,
  templateUrl: './editar-colecao.html',
  styleUrls: ['./editar-colecao.css'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ]
})
export class EditarColecao implements OnInit {

  colecao: ColecaoEdicaoDTO = {
    nome: '',
    dataInicio: '',
    dataFim: ''
  };

  id!: number;
  carregando: boolean = true;
  erroCarregamento: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private colecaoService: ColecaoService
  ) {}

  ngOnInit(): void {
    this.carregarIdERcolecao();
  }

  carregarIdERcolecao(): void {
    // Método 1: Tenta pegar o ID dos parâmetros da rota
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    // Método 2: Se não encontrar, tenta dos query parameters
    const idFromQuery = this.route.snapshot.queryParamMap.get('id');

    // Método 3: Tenta pegar do state da navegação
    const navigation = this.router.getCurrentNavigation();
    const idFromState = navigation?.extras.state?.['id'];

    console.log('ID da rota:', idFromRoute);
    console.log('ID da query:', idFromQuery);
    console.log('ID do state:', idFromState);

    // Prioridade: Rota > Query > State
    let idEncontrado = idFromRoute || idFromQuery || idFromState;

    if (!idEncontrado) {
      this.erroCarregamento = 'ID da coleção não encontrado na URL';
      this.carregando = false;
      return;
    }

    this.id = Number(idEncontrado);

    if (isNaN(this.id) || this.id <= 0) {
      this.erroCarregamento = 'ID da coleção inválido: ' + idEncontrado;
      this.carregando = false;
      return;
    }

    this.carregarColecao();
  }

  carregarColecao(): void {
    this.carregando = true;
    this.erroCarregamento = '';

    console.log('Carregando coleção com ID:', this.id);

    this.colecaoService.buscarPorId(this.id).subscribe({
      next: (data: ColecaoDTO) => {
        console.log('Dados recebidos da API:', data);

        this.colecao = {
          nome: data.nome || '',
          dataInicio: this.converterDataParaInput(data.dataInicio),
          dataFim: this.converterDataParaInput(data.dataFim)
        };

        console.log('Dados formatados para edição:', this.colecao);
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro completo ao carregar coleção:', err);

        if (err.status === 404 || err.status === 500) {
          this.erroCarregamento = `Coleção não encontrada com ID: ${this.id}. Verifique se a coleção existe.`;
        } else if (err.status === 0) {
          this.erroCarregamento = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else {
          this.erroCarregamento = `Erro ao carregar coleção: ${err.message || 'Erro desconhecido'}`;
        }

        this.carregando = false;
      }
    });
  }

  private converterDataParaInput(dataString: string): string {
    if (!dataString) return '';

    try {
      const data = new Date(dataString);

      if (isNaN(data.getTime())) {
        console.warn('Data inválida:', dataString);
        return '';
      }

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');

      return `${ano}-${mes}-${dia}`;
    } catch (error) {
      console.error('Erro ao converter data:', error);
      return '';
    }
  }

  salvarEdicao(): void {
    if (!this.validarFormulario()) {
      return;
    }

    console.log('Enviando dados para API:', this.colecao);

    this.colecaoService.atualizar(this.id, this.colecao).subscribe({
      next: () => {
        alert('Coleção atualizada com sucesso!');
        this.router.navigate(['/colecoes']);
      },
      error: (err) => {
        console.error('Erro ao salvar edição:', err);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.colecao.nome || this.colecao.nome.trim() === '') {
      alert('Por favor, informe o nome da coleção');
      return false;
    }

    if (!this.colecao.dataInicio) {
      alert('Por favor, informe a data de início');
      return false;
    }

    if (this.colecao.dataFim && this.colecao.dataInicio) {
      const inicio = new Date(this.colecao.dataInicio);
      const fim = new Date(this.colecao.dataFim);

      if (fim < inicio) {
        alert('A data fim não pode ser anterior à data início');
        return false;
      }
    }

    return true;
  }

  tentarNovamente(): void {
    this.carregarIdERcolecao();
  }

  voltar(): void {
    this.router.navigate(['/colecoes']);
  }
}
