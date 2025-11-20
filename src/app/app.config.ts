import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importe as rotas
import { routes } from './app.routes';

// IMPORTANTE: Importar o provideHttpClient e withInterceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Importe o interceptor que acabamos de criar
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // CONFIGURAÇÃO DO CLIENTE HTTP COM O INTERCEPTOR
    // Isso substitui o antigo "HttpClientModule"
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
