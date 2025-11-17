import { Component, Output, EventEmitter } from '@angular/core'; // 1. Output/EventEmitter vêm do core
import { CommonModule } from '@angular/common'; // 2. CommonModule vem do common (ESTA FOI A CORREÇÃO)

@Component({
  selector: 'app-page-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // 3. CRIAR O "EMISSOR" DE EVENTOS
  // Ele vai emitir um número (o ID do item)
  @Output() iconeClicado = new EventEmitter<number>();

  // 4. MÉTODO QUE SERÁ CHAMADO PELO HTML
  onIconClick(itemId: number): void {
    // 5. "EMITIR" O ID PARA O PAI (visu-geral)
    this.iconeClicado.emit(itemId);
  }
}
