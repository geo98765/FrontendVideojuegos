import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { VideojuegosService } from '../../services/VideojuegosService';

@Component({
  selector: 'app-detalle-videojuego',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    RouterLink, 
    CurrencyPipe, 
    DatePipe
  ],
  templateUrl: './detalle-videojuego.html',
  styleUrl: './detalle-videojuego.css'
})
export class DetalleVideojuego implements OnInit {
  private route = inject(ActivatedRoute);
  private videojuegosService = inject(VideojuegosService);
  
  videojuego: any = null;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    if (this.id) {
      this.videojuegosService.getVideojuegoDetalle(Number(this.id)).subscribe({
        next: (data) => {
          this.videojuego = data;
        },
        error: (error) => {
          console.error('Error al cargar el detalle:', error);
        }
      });
    }
  }
}