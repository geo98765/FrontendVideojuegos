import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ComentariosService } from '../../services/ComprasComentariosService';
import { ComentarioDTO } from '../../models/VideojuegoDTO';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-comentarios',
  imports: [MatTableModule, RouterLink, MatButton, DatePipe],
  templateUrl: './list-comentarios.html',
  styleUrl: './list-comentarios.css'
})
export class ListComentarios {
  comentariosService = inject(ComentariosService);
  displayedColumns: string[] = ['usuario', 'videojuego', 'comentario', 'fecha', 'acciones'];
  comentariosDataSource: any[] = [];

  constructor() {
    this.actualizar();
  }

  actualizar() {
    this.comentariosService.getComentarios().subscribe(comentarios => {
      this.comentariosDataSource = comentarios;
    });
  }
}
