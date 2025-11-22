import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Pega o token salvo no login
  const token = localStorage.getItem('token');

  // 2. Se o token existir, clonamos a requisição original e adicionamos o cabeçalho
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Padrão JWT
      }
    });
    // Passa a requisição modificada para frente
    return next(authReq);
  }

  // 3. Se não tiver token (login), passa a requisição normal sem mexer
  return next(req);
};
