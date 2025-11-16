import { Routes } from '@angular/router';
// 1. IMPORTE O SEU COMPONENTE DE PÁGINA
import { CadastrarItem } from './pages/cadastrar-item/cadastrar-item';
import { EditarPeca}  from './pages/editar-peca/editar-peca';
import {EditarEstampa} from './pages/editar-estampa/editar-estampa';
import {EditarColecao} from './pages/editar-colecao/editar-colecao';
import {EditarChaveiro} from './pages/editar-chaveiro/editar-chaveiro';
import {HistoricoDeAlteracoes} from './pages/historico-de-alteracoes/historico-de-alteracoes';
import {Conta} from './pages/conta/conta';
import {Login} from './pages/login/login';
import {VisuGeral} from './pages/visu-geral/visu-geral';


export const routes: Routes = [
  {
    path: 'cadastrar', // O caminho da URL (ex: localhost:4200/cadastrar)
    component: CadastrarItem // O componente que deve ser carregado
  },
  {
    path: 'editar-peca',
    component: EditarPeca
  },
  {
    path: 'editar-estampa',
    component: EditarEstampa
  },
  {
    path: 'editar-colecao',
    component: EditarColecao
  },
  {
    path: 'editar-chaveiro',
    component: EditarChaveiro
  },
  {
    path: 'historico-de-alteracoes',
    component: HistoricoDeAlteracoes
  },
  {
    path: 'conta',
    component: Conta
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'visu-geral',
    component: VisuGeral
  }

];
