import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. IMPORTE O ROUTERLINK

@Component({
  selector: 'app-floating-add-button',
  standalone: true,
  imports: [RouterLink], // 2. ADICIONE ELE NOS IMPORTS
  templateUrl: './floating-add-button.component.html',
  styleUrl: './floating-add-button.component.css'
})
export class FloatingAddButtonComponent {
  // Lógica futura (ex: @Output() onAddClick = new EventEmitter<void>();)
}
