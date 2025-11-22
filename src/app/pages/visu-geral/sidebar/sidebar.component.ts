import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // Ele vai emitir um número (o ID do item)
  @Output() iconeClicado = new EventEmitter<number>();

  //MÉTODO QUE SERÁ CHAMADO PELO HTML
  onIconClick(itemId: number): void {
    // "EMITIR" O ID PARA O PAI (visu-geral)
    this.iconeClicado.emit(itemId);
  }
}
