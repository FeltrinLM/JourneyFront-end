import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA O BOTÃO DE VOLTAR
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  standalone: true,
  selector: 'app-cadastrar-item',
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './cadastrar-item.html',
  styleUrl: './cadastrar-item.css'
})
export class CadastrarItem {

}
