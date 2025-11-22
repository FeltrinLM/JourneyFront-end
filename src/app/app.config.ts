import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importe as rotas
import { routes } from './app.routes';

// Importa o provideHttpClient e withInterceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Importa o interceptor
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // CONFIGURAÇÃO DO CLIENTE HTTP COM O INTERCEPTOR
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
