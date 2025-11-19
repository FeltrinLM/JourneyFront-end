import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Isso torna o serviço disponível no app inteiro automaticamente
})
export class AuthService {

  // BehaviorSubject guarda o valor atual e avisa quem estiver ouvindo.
  // Inicializamos lendo do localStorage para caso o usuário dê F5 na página e continue logado.
  private nomeUsuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('nome_usuario'));

  // Esta é a variável pública que o Header vai "assistir" (Observable)
  nomeUsuario$ = this.nomeUsuarioSubject.asObservable();

  constructor() {}

  // Chamado pelo Login quando a autenticação for bem-sucedida
  loginSucesso(token: string, nome: string) {
    // 1. Salva no navegador para persistir se fechar a aba
    localStorage.setItem('token', token);
    localStorage.setItem('nome_usuario', nome);

    // 2. Avisa "ao vivo" a todos os componentes que o nome mudou
    this.nomeUsuarioSubject.next(nome);
  }

  // Método para deslogar (usaremos no futuro)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');

    // Avisa que agora o usuário é 'null'
    this.nomeUsuarioSubject.next(null);
  }
}
