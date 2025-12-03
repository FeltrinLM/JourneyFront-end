import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { UsuarioDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseApiService {

  listarUsuarios(): Observable<UsuarioDTO[]> {
    return this.get<UsuarioDTO[]>('usuarios');
  }

  // MÉTODO DE CADASTRO
  cadastrarUsuario(usuario: { nome: string, tipo: string, senha: string }): Observable<UsuarioDTO> {
    return this.post<UsuarioDTO, { nome: string, tipo: string, senha: string }>('usuarios', usuario);
  }

  obterUsuarioAtual(): UsuarioDTO | null {
    const nome = localStorage.getItem('nome_usuario');

    if (nome) {
      return {
        usuarioId: 1,
        nome: nome,
        tipo: 'Administrador'
      };
    }

    return null;
  }

  obterMeuPerfil(): Observable<UsuarioDTO> {
    const usuario = this.obterUsuarioAtual();
    if (usuario) {
      return of(usuario);
    } else {
      return of({
        usuarioId: 1,
        nome: 'Usuário',
        tipo: 'Administrador'
      });
    }
  }
}
