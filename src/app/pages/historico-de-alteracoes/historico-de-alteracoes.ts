import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-historico-de-alteracoes',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './historico-de-alteracoes.html',
  styleUrl: './historico-de-alteracoes.css'
})
export class HistoricoDeAlteracoes {

}
