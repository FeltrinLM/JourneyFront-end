import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA A BARRA LATERAL
import { SidebarComponent } from './sidebar/sidebar.component';

// 2. IMPORTA O NOVO ACORDEÃO (ESTAVA FALTANDO)
import { ItemListAccordionComponent } from './item-list-accordion/item-list-accordion.component';


@Component({
  selector: 'app-visu-geral',

  standalone: true,

  // 3. ADICIONA O ACORDEÃO AOS IMPORTS (ESTAVA FALTANDO)
  imports: [
    CommonModule,
    SidebarComponent,
    ItemListAccordionComponent // <--- A LINHA QUE FALTAVA
  ],

  templateUrl: './visu-geral.html',
  styleUrl: './visu-geral.css'
})
export class VisuGeral {

}
