import { Component, Output, EventEmitter, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // Agora aceita number (ID) ou null (fechado)
  @Output() iconeClicado = new EventEmitter<number | null>();

  // Variável para controlar visualmente quem está ativo
  itemAtivo: number | null = null;

  @ViewChildren('sidebarBtn') botoes!: QueryList<ElementRef>;

  @HostListener('window:keydown', ['$event'])
  ouvirAtalhoGlobal(event: KeyboardEvent) {
    if (event.altKey && (event.key === 's' || event.key === 'S')) {
      event.preventDefault();
      this.focarBotao(0);
    }
  }

  onIconClick(itemId: number): void {
    // LÓGICA DE TOGGLE:
    if (this.itemAtivo === itemId) {
      // Se clicou no que já tá aberto, fecha ele.
      this.itemAtivo = null;
    } else {
      // Se clicou em um novo, abre o novo.
      this.itemAtivo = itemId;
    }

    // Emite o estado atual para o pai
    this.iconeClicado.emit(this.itemAtivo);
  }

  handleNavigation(event: KeyboardEvent, index: number) {
    const totalBotoes = this.botoes.length;
    let proximoIndex = index;

    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      event.preventDefault();
      proximoIndex = (index + 1) % totalBotoes;
      this.focarBotao(proximoIndex);
    }
    else if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      event.preventDefault();
      proximoIndex = (index - 1 + totalBotoes) % totalBotoes;
      this.focarBotao(proximoIndex);
    }
  }

  private focarBotao(index: number) {
    const arrayBotoes = this.botoes.toArray();
    if (arrayBotoes[index]) {
      arrayBotoes[index].nativeElement.focus();
    }
  }
}
