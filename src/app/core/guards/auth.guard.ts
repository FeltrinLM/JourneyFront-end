import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// CORREÇÃO: Removi o ', state' que estava sobrando ali
export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Verifica se está logado (Básico)
  if (!authService.estaLogado()) {
    return router.createUrlTree(['/login']);
  }

  // 2. Verifica se a rota exige um cargo específico
  const cargoEsperado = route.data['role'];

  if (cargoEsperado && cargoEsperado === 'Administrador') {
    if (!authService.ehAdministrador()) {
      alert('Acesso negado: Apenas administradores podem acessar esta página.');
      return false;
    }
  }

  return true;
};
