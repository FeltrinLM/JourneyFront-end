// NOME DO ARQUIVO: peca.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1. Criei uma interface TypeScript baseada no seu DTO Java
export interface PecaDTO {
  pecaId: number;
  tipo: string;
  tamanho: string;
  cor: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class PecaService {
  private http = inject(HttpClient);

  // 2. Coloquei a URL completa (provavelmente seu back roda na porta 8080)
  // Ajuste se o endereço ou a porta forem diferentes
  private apiUrl = 'http://localhost:8080/api/pecas';

  // 3. Este é o método que chama seu backend
  listarPecas(): Observable<PecaDTO[]> {
    return this.http.get<PecaDTO[]>(this.apiUrl);
  }
}
