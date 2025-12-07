import { Component, inject } from '@angular/core'; // 1. inject adicionado
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Boa prática para o erro
import { UsuarioService } from '../../core/services/api/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-usuario.html',
  styleUrls: ['./cadastrar-usuario.css']
})
export class CadastrarUsuario {

  // 2. Substituindo construtor por inject
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuario = {
    nome: '',
    senha: '',
    tipo: '' as 'Administrador' | 'Funcionario'
  };

  // Construtor removido!

  cadastrar() {
    if (!this.usuario.nome || !this.usuario.senha || !this.usuario.tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe({
      // 3. Removi o argumento 'response', já que não estava sendo usado
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/conta']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/conta']);
  }
}
