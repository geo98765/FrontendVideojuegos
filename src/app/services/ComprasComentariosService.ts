import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraDTO, CompraDTOCrear, ComentarioDTO, ComentarioDTOCrear } from '../models/VideojuegoDTO';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5140/api/Compras';

  getCompras(): Observable<CompraDTO[]> {
    return this.http.get<CompraDTO[]>(this.apiUrl);
  }

  getComprasUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Usuario/${idUsuario}`);
  }

  getComprasVideojuego(idVideojuego: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Videojuego/${idVideojuego}`);
  }

  realizarCompra(compra: CompraDTOCrear): Observable<any> {
    return this.http.post<any>(this.apiUrl, compra);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5140/api/Comentarios';

  getComentarios(): Observable<ComentarioDTO[]> {
    return this.http.get<ComentarioDTO[]>(this.apiUrl);
  }

  getComentario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getComentariosVideojuego(idJuego: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Videojuego/${idJuego}`);
  }

  postComentario(comentario: ComentarioDTOCrear): Observable<any> {
    return this.http.post<any>(this.apiUrl, comentario);
  }

  putComentario(id: number, comentario: ComentarioDTOCrear): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comentario);
  }

  deleteComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}