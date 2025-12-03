import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { EstampaDTO, EstampaEdicaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EstampaService extends BaseApiService {

  listarEstampas(): Observable<EstampaDTO[]> {
    return this.get<EstampaDTO[]>('estampas');
  }

  buscarPorId(id: number): Observable<EstampaDTO> {
    return this.get<EstampaDTO>(`estampas/${id}`);
  }

  atualizar(id: number, dto: EstampaEdicaoDTO): Observable<void> {
    return this.put<void, EstampaEdicaoDTO>(`estampas/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.delete<void>(`estampas/${id}`);
  }

  criar(dto: EstampaEdicaoDTO): Observable<EstampaDTO> {
    return this.post<EstampaDTO, EstampaEdicaoDTO>('estampas', dto);
  }
}
