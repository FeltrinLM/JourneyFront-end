// NOME DO ARQUIVO: colecao.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface baseada no ColecaoDTO.java
// LocalDate do Java vira 'string' no JSON
export interface ColecaoDTO {
  colecaoId: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {
  private http = inject(HttpClient);

  // Endpoint da API de Coleções (verifique se é este)
  private apiUrl = 'http://localhost:8080/api/colecoes';

  listarColecoes(): Observable<ColecaoDTO[]> {
    return this.http.get<ColecaoDTO[]>(this.apiUrl);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
