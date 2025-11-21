// src/app/core/services/api/peca.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { PecaDTO, PecaEdicaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PecaService extends BaseApiService {

  listarPecas(): Observable<PecaDTO[]> {
    return this.get<PecaDTO[]>('pecas');
  }

  buscarPorId(id: number): Observable<PecaDTO> {
    return this.get<PecaDTO>(`pecas/${id}`);
  }

  atualizar(id: number, dto: PecaEdicaoDTO): Observable<void> {
    return this.put<void>(`pecas/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.delete<void>(`pecas/${id}`);
  }

  criar(dto: PecaEdicaoDTO): Observable<PecaDTO> {
    return this.post<PecaDTO>('pecas', dto);
  }
}
