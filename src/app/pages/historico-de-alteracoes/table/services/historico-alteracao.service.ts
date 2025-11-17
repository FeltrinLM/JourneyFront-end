import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoAlteracaoDTO } from './models';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAlteracaoService {

  private readonly API_URL = 'http://localhost:8080/api/historico'; // <-- CONFIRA ESTA URL

  constructor(private http: HttpClient) { }

  public listarAlteracoes(): Observable<HistoricoAlteracaoDTO[]> {
    return this.http.get<HistoricoAlteracaoDTO[]>(this.API_URL);
  }

  // --- ADICIONE ESTE MÉTODO PARA DEBUG ---
  public API_URL_PARA_DEBUG(): string {
    return this.API_URL;
  }
}
