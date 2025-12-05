import { Component, inject } from '@angular/core'; // 1. Adicionei o inject aqui
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {

  // 2. Substituí o construtor pela função inject
  private location = inject(Location);

  /**
   * Esta função usa o serviço Location para
   * navegar para a página anterior no histórico do navegador.
   */
  goBack(): void {
    this.location.back();
  }
}
