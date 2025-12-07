import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

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

    this.http.post<LoginResponse>(url, loginRequest).subscribe({
      next: (response) => {
        if (response.token) {
          try {
            const payloadBase64 = response.token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const dadosToken = JSON.parse(payloadJson);

            // CORREÇÃO: Mudei de 'let' para 'const' aqui
            const tipoBruto = dadosToken.role || dadosToken.tipo || 'Funcionario';

            let tipoFormatado = 'Funcionario';

            if (tipoBruto === 'ROLE_ADMINISTRADOR' || tipoBruto === 'Administrador') {
              tipoFormatado = 'Administrador';
            } else if (tipoBruto === 'ROLE_FUNCIONARIO' || tipoBruto === 'Funcionario') {
              tipoFormatado = 'Funcionario';
            }

            this.authService.loginSucesso(response.token, this.nome, tipoFormatado);
            this.router.navigate(['/visu-geral']);

          } catch (e) {
            console.error('Erro ao processar token:', e);
            alert('Erro de autenticação. Tente novamente.');
          }
        }
      },
      error: (err) => {
        console.error(err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
