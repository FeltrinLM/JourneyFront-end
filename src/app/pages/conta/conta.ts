import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ADICIONE ESTA LINHA
import { UsuarioService } from '../../core/services/api/usuario.service';
import { UsuarioDTO } from '../../core/models';

@Component({
  selector: 'app-conta',
  imports: [CommonModule, RouterModule], // ADICIONE RouterModule AQUI
  templateUrl: './conta.html',
  styleUrl: './conta.css'
})
export class Conta implements OnInit {
  // ... resto do código permanece igual
  usuario: UsuarioDTO | null = null;
  senhaVisivel = false;
  carregando = true;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.usuarioService.obterMeuPerfil().subscribe({
      next: (user) => {
        this.usuario = user;
        this.carregando = false;
        console.log('Usuário carregado:', user); // Para debug
      },
      error: (error) => {
        console.error('Erro ao carregar usuário:', error);
        this.carregarUsuarioLocal();
      }
    });
  }

  carregarUsuarioLocal() {
    const userLocal = this.usuarioService.obterUsuarioAtual();
    if (userLocal) {
      this.usuario = userLocal;
    } else {
      // Fallback final
      this.usuario = {
        usuarioId: 1,
        nome: 'Usuário',
        tipo: 'Administrador'
      };
    }
    this.carregando = false;
  }

  toggleSenha() {
    this.senhaVisivel = !this.senhaVisivel;
  }

  getSenhaMascarada(): string {
    return this.senhaVisivel ? 'sua_senha_real' : '********';
  }

  getNomeExibicao(): string {
    if (this.carregando) return 'Carregando...';
    return this.usuario?.nome || 'Usuário';
  }

  getTipoUsuario(): string {
    if (this.carregando) return 'Carregando...';
    return this.usuario?.tipo || 'Usuário';
  }

  // Método para sair (logout)
  sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');
    window.location.href = '/login';
  }
}
