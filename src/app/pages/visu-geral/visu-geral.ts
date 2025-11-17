import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA A BARRA LATERAL
import { SidebarComponent } from './sidebar/sidebar.component';

// 2. IMPORTA O NOVO ACORDEÃO (ESTAVA FALTANDO)
import { ItemListAccordionComponent } from './item-list-accordion/item-list-accordion.component';

// 3. IMPORTA O NOVO BOTÃO FLUTUANTE (NOVA LINHA)
import { FloatingAddButtonComponent } from './floating-add-button/floating-add-button.component';

@Component({
  selector: 'app-visu-geral',

  standalone: true,

  // 3. ADICIONA O ACORDEÃO AOS IMPORTS (ESTAVA FALTANDO)
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

}
