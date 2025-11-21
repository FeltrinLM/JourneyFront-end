// src/app/core/services/api/usuario.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { UsuarioDTO } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseApiService {

  listarUsuarios(): Observable<UsuarioDTO[]> {
    return this.get<UsuarioDTO[]>('usuarios');
  }
}
