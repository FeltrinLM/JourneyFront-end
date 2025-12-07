import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private nomeUsuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('nome_usuario'));
  nomeUsuario$ = this.nomeUsuarioSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/usuarios/init';

  // ALTERAÇÃO 1: Adicionei o argumento 'tipo' aqui
  loginSucesso(token: string, nome: string, tipo: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('nome_usuario', nome);

    // ALTERAÇÃO 2: Salvando o tipo no localStorage!
    localStorage.setItem('tipo_usuario', tipo);

    this.nomeUsuarioSubject.next(nome);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');

    // ALTERAÇÃO 3: Limpando o tipo ao sair
    localStorage.removeItem('tipo_usuario');

    this.nomeUsuarioSubject.next(null);
  }

  estaLogado(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ehAdministrador(): boolean {
    const tipo = localStorage.getItem('tipo_usuario');

    // --- DEBUG ---
    console.log('=== DEBUG AUTH SERVICE ===');
    console.log('Tipo salvo no LocalStorage:', tipo);
    console.log('Comparando com: "Administrador"');
    console.log('Resultado da comparação:', tipo === 'Administrador');
    // -------------

    // Correção de segurança: normalizar para minúsculas para evitar erro de digitação
    // Ex: aceita "Administrador", "administrador", "ADMINISTRADOR"
    return tipo?.toLowerCase() === 'administrador';
  }

  verificarEstadoBackend() {
    return this.http.get(this.apiUrl).pipe(
      map(() => true),
      catchError((error) => {
        console.log('Validação falhou ou Back End offline. Deslogando...', error);
        this.logout();
        return of(false);
      })
    );
  }
}
