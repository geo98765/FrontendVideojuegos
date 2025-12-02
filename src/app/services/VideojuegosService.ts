import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VideojuegoDTO, VideojuegoDTOCrear } from '../models/VideojuegoDTO';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5140/api/Videojuegos';

  getVideojuegos(): Observable<VideojuegoDTO[]> {
    return this.http.get<VideojuegoDTO[]>(this.apiUrl);
  }

  getVideojuego(id: number): Observable<VideojuegoDTO> {
    return this.http.get<VideojuegoDTO>(`${this.apiUrl}/${id}`);
  }

  getVideojuegoDetalle(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Detalle/${id}`);
  }

  postVideojuego(videojuego: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/crearConImagen`, videojuego);
}

putVideojuego(id: number, videojuego: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}/actualizarConImagen`, videojuego);
}
  deleteVideojuego(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}