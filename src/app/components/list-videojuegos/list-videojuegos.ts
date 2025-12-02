import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { VideojuegosService } from '../../services/VideojuegosService';
import { VideojuegoDTO } from '../../models/VideojuegoDTO';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-videojuegos',
  imports: [MatTableModule, RouterLink, MatButton, CurrencyPipe, DatePipe],
  templateUrl: './list-videojuegos.html',
  styleUrl: './list-videojuegos.css'
})
export class ListVideojuegos {
  videojuegosService = inject(VideojuegosService);
  displayedColumns: string[] = ['imagen', 'nombre', 'descripcion', 'tamanoGb', 'precio', 'descargas', 'acciones'];
  videojuegosDataSource: VideojuegoDTO[] = [];

  constructor() {
    this.actualizar();
  }

  actualizar() {
    this.videojuegosService.getVideojuegos().subscribe(juegos => {
      this.videojuegosDataSource = juegos;
    });
  }
}