import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA O BOTÃO DE VOLTAR
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  standalone: true,
  selector: 'app-editar-peca',
    imports: [
      CommonModule,
      BackButtonComponent
    ],
  templateUrl: './editar-peca.html',
  styleUrl: './editar-peca.css'
})
export class EditarPeca {

}
