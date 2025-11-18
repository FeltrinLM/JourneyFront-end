import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Essencial para o ngModel funcionar
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Importação corrigida para AuthCardComponent (sem o "App" na frente)
import { AuthCardComponent } from '../../shared/components/auth-card/auth-card.component';

@Component({
  selector: 'app-login', // Seletor simplificado
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        // Habilita [(ngModel)]
    AuthCardComponent   // Habilita <app-auth-card>
  ],
  templateUrl: './login.html', // Aponta para o arquivo HTML correto nesta pasta
  styleUrls: ['./login.css']   // Certifique-se de que seu CSS se chama login.css ou ajuste aqui
})
export class Login { // <--- Renomeado para 'Login' para satisfazer o app.routes.ts

  // Variáveis do formulário
  nome = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private router: Router
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
          localStorage.setItem('token', response.token);
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
