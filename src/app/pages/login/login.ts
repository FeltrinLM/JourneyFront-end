import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Sem AuthCardComponent
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  nome = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  fazerLogin() {
    if (!this.nome || !this.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const loginRequest = { nome: this.nome, senha: this.senha };
    const url = 'http://localhost:8080/api/usuarios/login';

    this.http.post<any>(url, loginRequest).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.loginSucesso(response.token, this.nome);
          this.router.navigate(['/visu-geral']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
