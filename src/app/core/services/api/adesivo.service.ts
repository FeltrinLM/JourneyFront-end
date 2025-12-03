import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { AdesivoDTO, AdesivoEdicaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AdesivoService extends BaseApiService {

  listarAdesivos(): Observable<AdesivoDTO[]> {
    return this.get<AdesivoDTO[]>('adesivos');
  }

  buscarPorId(id: number): Observable<AdesivoDTO> {
    return this.get<AdesivoDTO>(`adesivos/${id}`);
  }

  atualizar(id: number, dto: AdesivoEdicaoDTO): Observable<void> {
    return this.put<void, AdesivoEdicaoDTO>(`adesivos/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.delete<void>(`adesivos/${id}`);
  }

  criar(dto: AdesivoEdicaoDTO): Observable<AdesivoDTO> {
    return this.post<AdesivoDTO, AdesivoEdicaoDTO>('adesivos', dto);
  }
}
