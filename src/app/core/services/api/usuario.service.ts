// src/app/core/services/api/usuario.service.ts
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

  // Método para obter usuário do localStorage ou dados básicos
  obterUsuarioAtual(): UsuarioDTO | null {
    // Tenta pegar do localStorage primeiro
    const nome = localStorage.getItem('nome_usuario');

    if (nome) {
      // Se tem o nome no localStorage, cria um objeto UsuarioDTO básico
      return {
        usuarioId: 1, // Você pode precisar ajustar isso
        nome: nome,
        tipo: 'Administrador' // Defina um padrão ou ajuste conforme sua lógica
      };
    }

    return null;
  }

  // Método observável para compatibilidade
  obterMeuPerfil(): Observable<UsuarioDTO> {
    const usuario = this.obterUsuarioAtual();
    if (usuario) {
      return of(usuario);
    } else {
      // Fallback caso não encontre
      return of({
        usuarioId: 1,
        nome: 'Usuário',
        tipo: 'Administrador'
      });
    }
  }
}
