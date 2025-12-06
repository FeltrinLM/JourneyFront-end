import { Component, OnInit, inject } from '@angular/core'; // 1. inject adicionado
import { CommonModule, Location } from '@angular/common'; // Location movido pra cá
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // 2. Tipagem de erro
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { ChaveiroService } from '../../../app/core/services/api/chaveiro.service';
import { ColecaoService } from '../../../app/core/services/api/colecao.service';
import { ChaveiroDTO, ChaveiroEdicaoDTO, ColecaoDTO } from '../../../app/core/models';

@Component({
  standalone: true,
  selector: 'app-editar-chaveiro',
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './editar-chaveiro.html',
  styleUrl: './editar-chaveiro.css'
})
export class EditarChaveiro implements OnInit {

  // 3. Injeções convertidas
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private chaveiroService = inject(ChaveiroService);
  private colecaoService = inject(ColecaoService);

  // Variáveis para o formulário
  modelo = '';      // 4. Removido : string
  colecaoId = 0;    // 4. Removido : number

  // Dados auxiliares
  colecoes: ColecaoDTO[] = [];

  // Estados
  chaveiroId: number | null = null;
  carregando = false;        // 4. Removido : boolean
  salvando = false;          // 4. Removido : boolean
  erroCarregamento = '';     // 4. Removido : string

  // Construtor removido!

  ngOnInit(): void {
    this.carregarColecoes();
    this.carregarDadosChaveiro();
  }

  carregarDadosChaveiro(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.chaveiroId = +id;
      this.carregando = true;

      this.chaveiroService.buscarPorId(this.chaveiroId).subscribe({
        next: (chaveiro: ChaveiroDTO) => {
          this.modelo = chaveiro.chaveiroModelo;
          this.colecaoId = chaveiro.colecaoId;
          this.carregando = false;
          console.log('Dados do chaveiro carregados:', chaveiro);
        },
        error: (error: HttpErrorResponse) => { // Tipagem correta
          console.error('Erro ao carregar chaveiro:', error);
          this.erroCarregamento = 'Erro ao carregar dados do chaveiro';
          this.carregando = false;
        }
      });
    } else {
      // Modo criação - valores padrão
      this.modelo = 'Modelo_prototipo';
      this.carregando = false;
    }
  }

  carregarColecoes(): void {
    this.colecaoService.listarColecoes().subscribe({
      next: (data: ColecaoDTO[]) => {
        this.colecoes = data;
        console.log('Coleções carregadas:', this.colecoes);

        // Se for modo criação e não tem coleção selecionada, seleciona a primeira
        if (!this.chaveiroId && this.colecoes.length > 0 && this.colecaoId === 0) {
          this.colecaoId = this.colecoes[0].colecaoId;
        }
      },
      error: (err: HttpErrorResponse) => { // Tipagem correta
        console.error('Erro ao carregar coleções:', err);
        this.erroCarregamento = 'Erro ao carregar lista de coleções';
      }
    });
  }

  onSubmit(): void {
    if (this.salvando || !this.validarFormulario()) return;

    this.salvando = true;

    const chaveiroData: ChaveiroEdicaoDTO = {
      chaveiroModelo: this.modelo,
      colecaoId: this.colecaoId
    };

    console.log('Enviando dados:', chaveiroData);

    if (this.chaveiroId) {
      // Modo edição
      this.chaveiroService.atualizar(this.chaveiroId, chaveiroData).subscribe({
        next: () => {
          console.log('Chaveiro atualizado com sucesso');
          this.salvando = false;
          alert('Chaveiro atualizado com sucesso!');
          this.router.navigate(['/visu-geral']);
        },
        error: (error: HttpErrorResponse) => { // Tipagem correta
          console.error('Erro ao atualizar chaveiro:', error);
          this.salvando = false;
          alert('Erro ao salvar alterações. Tente novamente.');
        }
      });
    } else {
      // Modo criação
      this.chaveiroService.criar(chaveiroData).subscribe({
        next: (novoChaveiro: ChaveiroDTO) => {
          console.log('Chaveiro criado com sucesso:', novoChaveiro);
          this.salvando = false;
          alert('Chaveiro criado com sucesso!');
          this.router.navigate(['/visu-geral']);
        },
        error: (error: HttpErrorResponse) => { // Tipagem correta
          console.error('Erro ao criar chaveiro:', error);
          this.salvando = false;
          alert('Erro ao criar chaveiro. Tente novamente.');
        }
      });
    }
  }

  private validarFormulario(): boolean {
    if (!this.modelo || this.modelo.trim() === '') {
      alert('Por favor, informe o modelo do chaveiro');
      return false;
    }

    if (this.modelo.trim().length < 2) {
      alert('O modelo deve ter pelo menos 2 caracteres');
      return false;
    }

    if (!this.colecaoId || this.colecaoId <= 0) {
      alert('Por favor, selecione uma coleção');
      return false;
    }

    return true;
  }

  voltar(): void {
    this.location.back();
  }

  tentarNovamente(): void {
    this.erroCarregamento = '';
    this.carregarDadosChaveiro();
    this.carregarColecoes();
  }

  // Método para obter o nome da coleção atual (para debug)
  getNomeColecaoAtual(): string {
    const colecao = this.colecoes.find(c => c.colecaoId === this.colecaoId);
    return colecao ? colecao.nome : 'Não selecionada';
  }
}
