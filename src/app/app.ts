import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './layout/header/component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('JourneyFront-end');

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // Assim que o app carrega (F5 ou abrir aba), verificamos o backend
    if (this.authService.estaLogado()) {
      this.authService.verificarEstadoBackend().subscribe(isOnline => {
        if (!isOnline) {
          // Se o back estiver offline ou rejeitar o token, redireciona para login
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
