import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstampaDTO {
  estampaId: number;
  nome: string;
  quantidade: number;
  colecaoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstampaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/estampas'; // Ajuste a URL conforme sua API

  listarEstampas(): Observable<EstampaDTO[]> {
    return this.http.get<EstampaDTO[]>(this.apiUrl);
  }

  // ADICIONE ESTES MÉTODOS:
  buscarPorId(id: number): Observable<EstampaDTO> {
    return this.http.get<EstampaDTO>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, dto: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
