// NOME DO ARQUIVO: estampa.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1. Interface baseada no seu EstampaDTO.java
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

  // 2. Endpoint da API de Estampas
  private apiUrl = 'http://localhost:8080/api/estampas'; // (Verifique se é este o endpoint)

  listarEstampas(): Observable<EstampaDTO[]> {
    return this.http.get<EstampaDTO[]>(this.apiUrl);
  }
}
