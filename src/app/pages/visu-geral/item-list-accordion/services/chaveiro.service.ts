// NOME DO ARQUIVO: chaveiro.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface baseada no ChaveiroDTO.java
export interface ChaveiroDTO {
  chaveiroId: number;
  chaveiroModelo: string;
  colecaoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChaveiroService {
  private http = inject(HttpClient);

  // Endpoint da API de Chaveiros (verifique se é este)
  private apiUrl = 'http://localhost:8080/api/chaveiros';

  listarChaveiros(): Observable<ChaveiroDTO[]> {
    return this.http.get<ChaveiroDTO[]>(this.apiUrl);
  }
}
