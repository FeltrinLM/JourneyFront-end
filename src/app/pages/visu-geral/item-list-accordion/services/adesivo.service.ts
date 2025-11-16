// NOME DO ARQUIVO: adesivo.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface baseada no seu AdesivoDTO.java
export interface AdesivoDTO {
  adesivoId: number;
  adesivoModelo: string;
  cromatico: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdesivoService {
  private http = inject(HttpClient);

  // Endpoint da API de Adesivos (verifique se é este)
  private apiUrl = 'http://localhost:8080/api/adesivos';

  listarAdesivos(): Observable<AdesivoDTO[]> {
    return this.http.get<AdesivoDTO[]>(this.apiUrl);
  }
}
