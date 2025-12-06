import { Component, OnInit, inject } from '@angular/core'; // 1. Adicionei inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // 2. Import para tipar o erro corretamente
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import { PecaService } from '../../../app/core/services/api/peca.service';
import { PecaDTO, PecaEdicaoDTO } from '../../../app/core/models';

@Component({
  standalone: true,
  selector: 'app-editar-peca',
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './editar-peca.html',
  styleUrl: './editar-peca.css'
})
export class EditarPeca implements OnInit {

  // 3. Substituí o construtor por inject()
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pecaService = inject(PecaService);

  peca: PecaEdicaoDTO = {
    tipo: '',
    tamanho: '',
    cor: '',
    quantidade: 0
  };

  id!: number;

  // 4. Removi as tipagens redundantes (: boolean e : string)
  carregando = true;
  erroCarregamento = '';

  // Opções para os dropdowns
  tipos: string[] = ['Camiseta', 'Calça', 'Jaqueta', 'Vestido', 'Short', 'Blusa'];
  tamanhos: string[] = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
  cores: string[] = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Rosa', 'Cinza'];

  // Construtor removido!

  ngOnInit(): void {
    this.carregarIdEPeca();
  }

  carregarIdEPeca(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (!idFromRoute) {
      this.erroCarregamento = 'ID da peça não encontrado na URL';
      this.carregando = false;
      return;
    }

    this.id = Number(idFromRoute);

    if (isNaN(this.id) || this.id <= 0) {
      this.erroCarregamento = 'ID da peça inválido: ' + idFromRoute;
      this.carregando = false;
      return;
    }

    this.carregarPeca();
  }

  carregarPeca(): void {
    this.carregando = true;
    this.erroCarregamento = '';

    this.pecaService.buscarPorId(this.id).subscribe({
      next: (data: PecaDTO) => {
        console.log('Dados recebidos da API:', data);

        this.peca = {
          tipo: data.tipo || '',
          tamanho: data.tamanho || '',
          cor: data.cor || '',
          quantidade: data.quantidade || 0
        };

        console.log('Dados formatados para edição:', this.peca);
        this.carregando = false;
      },
      // 5. Substituí 'any' por 'HttpErrorResponse'
      error: (err: HttpErrorResponse) => {
        console.error('Erro completo ao carregar peça:', err);

        if (err.status === 404 || err.status === 500) {
          this.erroCarregamento = `Peça não encontrada com ID: ${this.id}. Verifique se a peça existe.`;
        } else if (err.status === 0) {
          this.erroCarregamento = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else {
          this.erroCarregamento = `Erro ao carregar peça: ${err.message || 'Erro desconhecido'}`;
        }

        this.carregando = false;
      }
    });
  }

  salvarEdicao(): void {
    if (!this.validarFormulario()) {
      return;
    }

    console.log('Enviando dados para API:', this.peca);

    this.pecaService.atualizar(this.id, this.peca).subscribe({
      next: () => {
        alert('Peça atualizada com sucesso!');
        this.router.navigate(['/visu-geral']);
      },
      // 6. Substituí 'any' por 'HttpErrorResponse' aqui também
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao salvar edição:', err);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.peca.tipo || this.peca.tipo.trim() === '') {
      alert('Por favor, selecione o tipo da peça');
      return false;
    }

    if (!this.peca.tamanho || this.peca.tamanho.trim() === '') {
      alert('Por favor, selecione o tamanho da peça');
      return false;
    }

    if (!this.peca.cor || this.peca.cor.trim() === '') {
      alert('Por favor, selecione a cor da peça');
      return false;
    }

    if (this.peca.quantidade < 0) {
      alert('A quantidade não pode ser negativa');
      return false;
    }

    if (!this.peca.quantidade && this.peca.quantidade !== 0) {
      alert('Por favor, informe a quantidade');
      return false;
    }

    return true;
  }

  tentarNovamente(): void {
    this.carregarIdEPeca();
  }

  voltar(): void {
    this.router.navigate(['/visu-geral']);
  }
}
