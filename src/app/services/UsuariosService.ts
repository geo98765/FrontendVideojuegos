import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO, UsuarioDTOCrear } from '../models/VideojuegoDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5140/api/Usuarios';

  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/${id}`);
  }

  getUsuarioDetalle(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Detalle/${id}`);
  }

  postUsuario(usuario: UsuarioDTOCrear): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.apiUrl, usuario);
  }

  putUsuario(id: number, usuario: UsuarioDTOCrear): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}