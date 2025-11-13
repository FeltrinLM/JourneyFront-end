import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header', // Esta é a tag que vamos usar
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class HeaderComponent {

}
