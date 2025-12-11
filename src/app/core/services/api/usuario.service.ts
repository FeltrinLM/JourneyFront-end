import { Injectable } from '@angular/core'; // <--- ESTAVA FALTANDO
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { UsuarioDTO } from '../../models';

@Injectable({ // <--- ESTAVA FALTANDO
  providedIn: 'root'
})
export class UsuarioService extends BaseApiService {

  listarUsuarios(): Observable<UsuarioDTO[]> {
    return this.get<UsuarioDTO[]>('usuarios');
  }

  cadastrarUsuario(usuario: { nome: string, tipo: string, senha: string }): Observable<UsuarioDTO> {
    return this.post<UsuarioDTO, { nome: string, tipo: string, senha: string }>('usuarios', usuario);
  }

  // --- NOVOS MÉTODOS ESPECÍFICOS ---

  // 1. Atualizar Nome (PATCH)
  atualizarNome(id: number, novoNome: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/usuarios/${id}/nome`, { nome: novoNome });
  }

  // 2. Alterar Senha (PUT)
  alterarSenha(id: number, dados: { senhaAtual: string, novaSenha: string }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/usuarios/${id}/senha`, dados);
  }

  // --- LÓGICA DE PERFIL ---
  obterMeuPerfil(): Observable<UsuarioDTO> {
    const nomeSalvo = localStorage.getItem('nome_usuario');
    if (!nomeSalvo) return throwError(() => new Error('Usuário não logado'));

    return this.listarUsuarios().pipe(
      switchMap(usuarios => {
        const usuarioEncontrado = usuarios.find(u => u.nome === nomeSalvo);
        if (usuarioEncontrado) return [usuarioEncontrado];
        else throw new Error('Usuário não encontrado na base de dados');
      })
    );
  }

  obterUsuarioAtual(): UsuarioDTO | null {
    const nome = localStorage.getItem('nome_usuario');
    if (nome) {
      return {
        usuarioId: 0,
        nome: nome,
        tipo: localStorage.getItem('tipo_usuario') || 'Funcionario'
      };
    }
    return null;
  }
}
