import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCardComponent } from '../../shared/components/auth-card/auth-card.component';

// 1. IMPORTAR O SERVICE
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthCardComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  nome = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // 2. INJETAR O SERVICE
  ) {}

  fazerLogin() {
    if (!this.nome || !this.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const loginRequest = {
      nome: this.nome,
      senha: this.senha
    };

    const url = 'http://localhost:8080/api/usuarios/login';

    this.http.post<any>(url, loginRequest).subscribe({
      next: (response) => {
        console.log('Login sucesso:', response);
        if (response.token) {

          // 3. USAR O SERVICE PARA SALVAR E AVISAR O HEADER
          // (Não usamos mais localStorage.setItem aqui direto)
          this.authService.loginSucesso(response.token, this.nome);

          this.router.navigate(['/visu-geral']);
        }
      },
      error: (err) => {
        console.error('Erro login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
