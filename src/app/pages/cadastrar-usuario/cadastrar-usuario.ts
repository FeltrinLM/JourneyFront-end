import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/api/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-usuario.html',
  styleUrls: ['./cadastrar-usuario.css']
})
export class CadastrarUsuario {
  usuario = {
    nome: '',
    senha: '',
    tipo: '' as 'Administrador' | 'Funcionario'
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  cadastrar() {
    if (!this.usuario.nome || !this.usuario.senha || !this.usuario.tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe({
      next: (response) => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/conta']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/conta']);
  }
}
