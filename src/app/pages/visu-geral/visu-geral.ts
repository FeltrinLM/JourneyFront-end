import { Component, signal } from '@angular/core';
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

  // O Signal já aceita null, isso está certo
  selectedItemId = signal<number | null>(null);

  // --- O ERRO ESTAVA AQUI ---
  // Antes: onIconClicked(id: number): void
  // Agora: deve aceitar "number | null"
  onIconClicked(id: number | null): void {
    this.selectedItemId.set(id);
  }

}
