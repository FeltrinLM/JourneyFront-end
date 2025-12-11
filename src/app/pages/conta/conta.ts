import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../core/services/api/usuario.service';
import { UsuarioDTO } from '../../core/models';

@Component({
  selector: 'app-conta',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './conta.html',
  styleUrl: './conta.css'
})
export class Conta implements OnInit {
  usuario: UsuarioDTO | null = null;
  carregando = true;
  mostrarModalSair = false;

  // Edição
  editandoNome = false;
  novoNome = '';
  editandoSenha = false;
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.usuarioService.obterMeuPerfil().subscribe({
      next: (user) => {
        this.usuario = user;
        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => {
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
    return this.usuario?.nome || 'Usuário';
  }

  getTipoUsuario(): string {
    return this.usuario?.tipo || 'Usuário';
  }

  // --- SALVAR NOME (PATCH) ---
  iniciarEdicaoNome() {
    this.editandoNome = true;
    this.editandoSenha = false;
    this.novoNome = this.usuario?.nome || '';
  }

  cancelarEdicaoNome() {
    this.editandoNome = false;
    this.novoNome = '';
  }

  salvarNome() {
    if (!this.novoNome.trim()) {
      alert('O nome não pode estar vazio.');
      return;
    }

    if (!this.usuario?.usuarioId) {
      alert('Erro: ID do usuário não encontrado.');
      return;
    }

    this.usuarioService.atualizarNome(this.usuario.usuarioId, this.novoNome).subscribe({
      next: () => {
        alert('Nome atualizado com sucesso!');
        if (this.usuario) this.usuario.nome = this.novoNome;
        localStorage.setItem('nome_usuario', this.novoNome);
        this.editandoNome = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao salvar nome:', err);
        alert('Erro ao atualizar nome. Tente novamente.');
      }
    });
  }

  // --- SALVAR SENHA (PUT) ---
  iniciarEdicaoSenha() {
    this.editandoSenha = true;
    this.editandoNome = false;
    this.limparCamposSenha();
  }

  cancelarEdicaoSenha() {
    this.editandoSenha = false;
    this.limparCamposSenha();
  }

  limparCamposSenha() {
    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }

  salvarSenha() {
    if (!this.senhaAtual || !this.novaSenha || !this.confirmarSenha) {
      alert('Preencha todos os campos.');
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }
    if (this.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (!this.usuario?.usuarioId) {
      alert('Erro: Usuário não identificado.');
      return;
    }

    const payload = {
      senhaAtual: this.senhaAtual,
      novaSenha: this.novaSenha
    };

    // Chamada direta para o endpoint que valida e troca
    this.usuarioService.alterarSenha(this.usuario.usuarioId, payload).subscribe({
      next: () => {
        alert('Senha alterada com sucesso!');
        this.editandoSenha = false;
        this.limparCamposSenha();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao alterar senha:', err);
        // O Backend retorna 401 se a senha antiga estiver errada
        if (err.status === 401 || err.status === 400) {
          alert('A senha atual está incorreta.');
        } else {
          alert('Erro ao alterar senha. Tente novamente.');
        }
      }
    });
  }

  // --- SAIR ---
  solicitarSair() {
    this.mostrarModalSair = true;
  }

  cancelarSair() {
    this.mostrarModalSair = false;
  }

  confirmarSair() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('tipo_usuario');
    window.location.href = '/login';
  }
}
