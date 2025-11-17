import { Component, signal } from '@angular/core'; // 1. IMPORTAR 'signal'
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemListAccordionComponent } from './item-list-accordion/item-list-accordion.component';
import { FloatingAddButtonComponent } from './floating-add-button/floating-add-button.component';

@Component({
  selector: 'app-visu-geral',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ItemListAccordionComponent,
    FloatingAddButtonComponent
  ],
  templateUrl: './visu-geral.html',
  styleUrl: './visu-geral.css'
})
export class VisuGeral {

  // 2. CRIAR UM SIGNAL PARA GUARDAR O ID SELECIONADO
  selectedItemId = signal<number | null>(null);

  // 3. MÉTODO PARA ATUALIZAR O SIGNAL QUANDO O EVENTO DA SIDEBAR CHEGAR
  onIconClicked(id: number): void {
    this.selectedItemId.set(id);
  }

}
