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

  // URL para teste de conexão
  private apiUrl = 'http://localhost:8080/api/usuarios/init';


  loginSucesso(token: string, nome: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('nome_usuario', nome);
    this.nomeUsuarioSubject.next(nome);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');
    this.nomeUsuarioSubject.next(null);
  }

  estaLogado(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
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
