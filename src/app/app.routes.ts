import { Routes } from '@angular/router';
import { CadastrarItem } from './pages/cadastrar-item/cadastrar-item';
import { EditarAdesivo} from './pages/editar-adesivo/editar-adesivo'
import { EditarPeca}  from './pages/editar-peca/editar-peca';
import {EditarEstampa} from './pages/editar-estampa/editar-estampa';
import {EditarColecao} from './pages/editar-colecao/editar-colecao';
import {EditarChaveiro} from './pages/editar-chaveiro/editar-chaveiro';
import {HistoricoDeAlteracoes} from './pages/historico-de-alteracoes/historico-de-alteracoes';
import {Conta} from './pages/conta/conta';
import {Login} from './pages/login/login';
import {VisuGeral} from './pages/visu-geral/visu-geral';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // 1. Redirecionamento padrão: Se a URL for vazia, vai para Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 2. Rota de Login (Pública - não usa o Guard)
  {
    path: 'login',
    component: Login
  },

  // 3. Rotas Protegidas (Todas usam canActivate: [authGuard])
  {
    path: 'cadastrar',
    component: CadastrarItem,
    canActivate: [authGuard]
  },
  {
    path: 'editar-adesivo/:id',
    component: EditarAdesivo,
    canActivate: [authGuard]
  },
  {
    path: 'editar-peca/:id',
    component: EditarPeca,
    canActivate: [authGuard]
  },
  {
    path: 'editar-estampa/:id',
    component: EditarEstampa,
    canActivate: [authGuard]
  },
  {
    path: 'editar-colecao/:id',
    component: EditarColecao,
    canActivate: [authGuard]
  },
  {
    path: 'editar-chaveiro/:id',
    component: EditarChaveiro,
    canActivate: [authGuard]
  },
  {
    path: 'historico-de-alteracoes',
    component: HistoricoDeAlteracoes,
    canActivate: [authGuard]
  },
  {
    path: 'conta',
    component: Conta,
    canActivate: [authGuard]
  },
  {
    path: 'visu-geral',
    component: VisuGeral,
    canActivate: [authGuard]
  }
];
