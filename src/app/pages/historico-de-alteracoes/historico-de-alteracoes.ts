import { Component } from '@angular/core';

// CORREÇÃO: O caminho da importação precisa ser relativo ao arquivo atual.
// Se a pasta 'table' está DENTRO de 'historico-de-alteracoes', use este caminho:
import { TableComponent } from './table/table.component';
// (Se 'table' for uma pasta irmã, seria '../table/table.component')

@Component({
  selector: 'app-historico-de-alteracoes',
  standalone: true, // A página também precisa ser standalone
  imports: [
    TableComponent // Agora ele deve ser reconhecido
  ],
  templateUrl: './historico-de-alteracoes.html',
  styleUrl: './historico-de-alteracoes.css'
})
export class HistoricoDeAlteracoes {

}
