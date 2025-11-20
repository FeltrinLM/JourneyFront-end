import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import necessário para validar com o back
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nomeUsuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('nome_usuario'));
  nomeUsuario$ = this.nomeUsuarioSubject.asObservable();

  // URL para teste de conexão (use qualquer rota GET protegida ou pública do seu back)
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {} // Injetamos o HttpClient

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

  // NOVO: Tenta fazer uma requisição leve ao backend para ver se ele está vivo/token é válido
  verificarEstadoBackend() {
    // Tenta acessar uma rota qualquer. Se der erro (back desligado ou 403), desloga.
    // Nota: Se sua API precisar do token no header, certifique-se que ele está sendo enviado
    // (usando um interceptor ou passando nos headers aqui)
    return this.http.get(this.apiUrl).pipe(
      map(() => true), // Sucesso: Back end está on e token (se enviado) é válido
      catchError((error) => {
        // Erro: Back end off, erro de conexão, ou token expirado
        console.log('Validação falhou ou Back End offline. Deslogando...', error);
        this.logout();
        return of(false);
      })
    );
  }
}
