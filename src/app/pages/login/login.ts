import { Component, inject } from '@angular/core'; // 1. Adicionado inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

// 2. Interface para tipar a resposta (Adeus 'any')
interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  // 3. Substituindo o construtor por inject()
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  nome = '';
  senha = '';

  fazerLogin() {
    if (!this.nome || !this.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const loginRequest = { nome: this.nome, senha: this.senha };
    const url = 'http://localhost:8080/api/usuarios/login';

    // 4. Usando a interface <LoginResponse> no lugar de <any>
    this.http.post<LoginResponse>(url, loginRequest).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.loginSucesso(response.token, this.nome);
          this.router.navigate(['/visu-geral']);
        }
      },
      error: (err) => {
        console.error(err); // Aqui mantemos 'err' sem underline pois estamos usando ele no console
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
