import { Component, OnInit, inject } from '@angular/core'; // 1. inject adicionado
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // 2. Tipagem de erro
import { UsuarioService } from '../../core/services/api/usuario.service';
import { UsuarioDTO } from '../../core/models';

@Component({
  selector: 'app-conta',
  imports: [CommonModule, RouterModule],
  templateUrl: './conta.html',
  styleUrl: './conta.css'
})
export class Conta implements OnInit {
  usuario: UsuarioDTO | null = null;
  carregando = true;

  // 3. Substituição do construtor por inject
  private usuarioService = inject(UsuarioService);

  // Construtor removido!

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.usuarioService.obterMeuPerfil().subscribe({
      next: (user) => {
        this.usuario = user;
        this.carregando = false;
        console.log('Usuário carregado:', user);
      },
      error: (error: HttpErrorResponse) => { // 4. Tipagem correta do erro
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
      this.usuario = {
        usuarioId: 1,
        nome: 'Usuário',
        tipo: 'Administrador'
      };
    }
    this.carregando = false;
  }

  getNomeExibicao(): string {
    if (this.carregando) return 'Carregando...';
    return this.usuario?.nome || 'Usuário';
  }

  getTipoUsuario(): string {
    if (this.carregando) return 'Carregando...';
    return this.usuario?.tipo || 'Usuário';
  }

  sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');
    window.location.href = '/login';
  }
}
