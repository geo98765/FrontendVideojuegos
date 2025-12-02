import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { VideojuegosService } from '../../services/VideojuegosService';
import { VideojuegoDTO } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-confirmar-eliminacion-videojuego',
  imports: [MatButtonModule, MatCardModule, RouterLink, CurrencyPipe],
  templateUrl: './confirmar-eliminacion-videojuego.html',
  styleUrl: './confirmar-eliminacion-videojuego.css'
})
export class ConfirmarEliminacionVideojuego implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videojuegosService = inject(VideojuegosService);
  
  videojuego!: VideojuegoDTO;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    if (!this.id) {
      this.router.navigate(['/videojuegos']);
      return;
    }

    this.videojuegosService.getVideojuego(Number(this.id)).subscribe({
      next: (videojuego) => {
        this.videojuego = videojuego;
      },
      error: (error) => {
        console.error('Error al cargar el videojuego:', error);
        this.router.navigate(['/videojuegos']);
      }
    });
  }

  eliminar(): void {
    this.videojuegosService.deleteVideojuego(Number(this.id)).subscribe({
      next: () => {
        alert('Videojuego eliminado exitosamente');
        this.router.navigate(['/videojuegos']);
      },
      error: (error) => {
        console.error('Error al eliminar el videojuego:', error);
        alert('Error al eliminar el videojuego');
      }
    });
  }
}