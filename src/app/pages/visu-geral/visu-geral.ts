import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. IMPORTA O NOVO COMPONENTE DESTA PÁGINA
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-visu-geral',

  // 2. ADICIONA 'standalone: true'
  standalone: true,

  // 3. ADICIONA O SidebarComponent (e CommonModule) AOS IMPORTS
  imports: [CommonModule, SidebarComponent],

  templateUrl: './visu-geral.html',
  styleUrl: './visu-geral.css'
})
export class VisuGeral {

}
