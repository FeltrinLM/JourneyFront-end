import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Ajuste o caminho se necessário

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o usuário está logado usando a lógica do Service
  if (authService.estaLogado()) {
    return true; // Permite o acesso
  } else {
    // Se não estiver logado, redireciona para o login
    return router.createUrlTree(['/login']);
  }
};
