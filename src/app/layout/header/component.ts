import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class HeaderComponent {

  // Esta propriedade 'calculada' verifica o localStorage automaticamente
  get textoCabecalho(): string {
    const nome = localStorage.getItem('nome_usuario');

    if (nome) {
      // Se tiver nome salvo, retorna a mensagem personalizada
      return `Bem vindo ${nome}`;
    }

    // Se não tiver (não logado), retorna o padrão
    return 'Sistema de gerenciamento de estoque Journey Brasil';
  }

}
