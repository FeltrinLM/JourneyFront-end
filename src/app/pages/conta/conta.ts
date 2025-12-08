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

  // Edição de Nome
  editandoNome = false;
  novoNome = '';

  // Edição de Senha
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
        console.log('Usuário carregado:', user);
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
    if (this.carregando) return 'Carregando...';
    return this.usuario?.nome || 'Usuário';
  }

  getTipoUsuario(): string {
    if (this.carregando) return 'Carregando...';
    return this.usuario?.tipo || 'Usuário';
  }

  // --- LÓGICA DE EDIÇÃO DE NOME ---
  iniciarEdicaoNome() {
    this.editandoNome = true;
    this.editandoSenha = false; // Fecha a senha se estiver aberta
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
    console.log('Salvando novo nome:', this.novoNome);
    if (this.usuario) {
      this.usuario.nome = this.novoNome;
    }
    this.editandoNome = false;
    alert('Nome atualizado com sucesso (Simulação)!');
  }

  // --- LÓGICA DE EDIÇÃO DE SENHA ---
  iniciarEdicaoSenha() {
    this.editandoSenha = true;
    this.editandoNome = false; // Fecha o nome se estiver aberto
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
      alert('Por favor, preencha todos os campos de senha.');
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

    console.log('Salvando nova senha...');
    // AQUI CHAMARIA O BACKEND PARA VALIDAR A SENHA ATUAL E TROCAR PELA NOVA

    this.editandoSenha = false;
    this.limparCamposSenha();
    alert('Senha atualizada com sucesso (Simulação)!');
  }

  // --- LÓGICA DE SAIR ---
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
