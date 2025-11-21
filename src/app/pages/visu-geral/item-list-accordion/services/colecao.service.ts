import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ColecaoDTO {
  colecaoId: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
}

export interface ColecaoEdicaoDTO {
  nome: string;
  dataInicio: string;
  dataFim: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/colecoes';

  listarColecoes(): Observable<ColecaoDTO[]> {
    return this.http.get<ColecaoDTO[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<ColecaoDTO> {
    return this.http.get<ColecaoDTO>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, dto: ColecaoEdicaoDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
