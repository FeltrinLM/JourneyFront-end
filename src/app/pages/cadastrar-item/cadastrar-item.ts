import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-cadastrar-item',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent
  ],
  templateUrl: './cadastrar-item.html',
  styleUrls: ['./cadastrar-item.css']
})
export class CadastrarItem {

  tipoSelecionado: string | null = null;

  constructor(private router: Router) {}

  selecionarTipo(tipo: string) {
    console.log('Selecionou:', tipo);
    this.tipoSelecionado = tipo;
  }

  aoClicarVoltar(event: Event) {
    // Garante que só essa função roda
    event.preventDefault();
    event.stopPropagation();

    console.log('Clicou Voltar. Estado atual:', this.tipoSelecionado);

    if (this.tipoSelecionado) {
      // Se tem item selecionado, volta pro menu (null)
      console.log('Resetando para o menu...');
      this.tipoSelecionado = null;
    } else {
      // Se já está no menu, sai da página
      console.log('Saindo da página...');
      this.router.navigate(['/visu-geral']);
    }
  }
}
