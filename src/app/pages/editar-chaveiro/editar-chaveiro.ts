import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA O BOTÃO DE VOLTAR
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  standalone: true,
  selector: 'app-editar-chaveiro',
  imports: [
    CommonModule,
    BackButtonComponent
  ],
  templateUrl: './editar-chaveiro.html',
  styleUrl: './editar-chaveiro.css'
})
export class EditarChaveiro {

}
