// src/app/core/services/api/colecao.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { ColecaoDTO, ColecaoEdicaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ColecaoService extends BaseApiService {

  listarColecoes(): Observable<ColecaoDTO[]> {
    return this.get<ColecaoDTO[]>('colecoes');
  }

  buscarPorId(id: number): Observable<ColecaoDTO> {
    return this.get<ColecaoDTO>(`colecoes/${id}`);
  }

  atualizar(id: number, dto: ColecaoEdicaoDTO): Observable<void> {
    return this.put<void>(`colecoes/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.delete<void>(`colecoes/${id}`);
  }

  criar(dto: ColecaoEdicaoDTO): Observable<ColecaoDTO> {
    return this.post<ColecaoDTO>('colecoes', dto);
  }
}
