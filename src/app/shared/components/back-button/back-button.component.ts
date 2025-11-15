import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {

  // Injetamos o 'Location' do Angular para podermos navegar
  constructor(private location: Location) { }

  /**
   * Esta função usa o serviço Location para
   * navegar para a página anterior no histórico do navegador.
   */
  goBack(): void {
    this.location.back();
  }
}
