import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTAR RouterLink e RouterLinkActive
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header', // Esta é a tag que vamos usar
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // 2. ADICIONAR AOS IMPORTS
    RouterLinkActive
  ],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class HeaderComponent {

}
