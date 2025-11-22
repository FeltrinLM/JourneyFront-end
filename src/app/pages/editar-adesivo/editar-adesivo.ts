import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-editar-adesivo',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent
  ],
  templateUrl: './editar-adesivo.html',
  styleUrl: './editar-adesivo.css'
})
export class EditarAdesivo {
  // Classe vazia por enquanto, igual ao seu padrão
}
