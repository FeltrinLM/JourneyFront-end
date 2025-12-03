import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { ChaveiroDTO, ChaveiroEdicaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ChaveiroService extends BaseApiService {

  listarChaveiros(): Observable<ChaveiroDTO[]> {
    return this.get<ChaveiroDTO[]>('chaveiros');
  }

  buscarPorId(id: number): Observable<ChaveiroDTO> {
    return this.get<ChaveiroDTO>(`chaveiros/${id}`);
  }

  atualizar(id: number, dto: ChaveiroEdicaoDTO): Observable<void> {
    return this.put<void, ChaveiroEdicaoDTO>(`chaveiros/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.delete<void>(`chaveiros/${id}`);
  }

  criar(dto: ChaveiroEdicaoDTO): Observable<ChaveiroDTO> {
    return this.post<ChaveiroDTO, ChaveiroEdicaoDTO>('chaveiros', dto);
  }
}
