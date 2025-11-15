import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA O BOTÃO DE VOLTAR
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  standalone: true,
  selector: 'app-editar-colecao',
    imports: [
      CommonModule,
      BackButtonComponent
    ],
  templateUrl: './editar-colecao.html',
  styleUrl: './editar-colecao.css'
})
export class EditarColecao {

}
