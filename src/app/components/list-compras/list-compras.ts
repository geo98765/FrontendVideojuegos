import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ComprasService } from '../../services/ComprasComentariosService';
import { CompraDTO } from '../../models/VideojuegoDTO';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-compras',
  imports: [MatTableModule, RouterLink, MatButton, DatePipe, CurrencyPipe],
  templateUrl: './list-compras.html',
  styleUrl: './list-compras.css'
})
export class ListCompras {
  comprasService = inject(ComprasService);
  displayedColumns: string[] = ['id', 'usuario', 'videojuego', 'precio', 'fechaCompra', 'acciones'];
  comprasDataSource: any[] = [];

  constructor() {
    this.actualizar();
  }

  actualizar() {
    this.comprasService.getCompras().subscribe(compras => {
      this.comprasDataSource = compras;
    });
  }
}