// src/app/core/services/api/historico-alteracao.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { HistoricoAlteracaoDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAlteracaoService extends BaseApiService {

  listarAlteracoes(): Observable<HistoricoAlteracaoDTO[]> {
    return this.get<HistoricoAlteracaoDTO[]>('historico');
  }

  // Método para debug (opcional)
  getApiUrl(): string {
    return `${this.baseUrl}/historico`;
  }
}
