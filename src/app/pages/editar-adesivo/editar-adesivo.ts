import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importando o componente de botão de voltar (ajuste o caminho se necessário)
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-editar-adesivo',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent // Adicionando aos imports
  ],
  templateUrl: './editar-adesivo.html',
  styleUrl: './editar-adesivo.css'
})
export class EditarAdesivo {
  // Classe vazia por enquanto, igual ao seu padrão
}
