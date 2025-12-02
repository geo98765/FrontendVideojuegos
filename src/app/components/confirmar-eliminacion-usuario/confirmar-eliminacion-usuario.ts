import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosService } from '../../services/UsuariosService';
import { UsuarioDTO } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-confirmar-eliminacion-usuario',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './confirmar-eliminacion-usuario.html',
  styleUrl: './confirmar-eliminacion-usuario.css'
})
export class ConfirmarEliminacionUsuario implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usuariosService = inject(UsuariosService);
  
  usuario!: UsuarioDTO;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    if (!this.id) {
      this.router.navigate(['/usuarios']);
      return;
    }

    this.usuariosService.getUsuario(Number(this.id)).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
        this.router.navigate(['/usuarios']);
      }
    });
  }

  eliminar(): void {
    this.usuariosService.deleteUsuario(Number(this.id)).subscribe({
      next: () => {
        alert('Usuario eliminado exitosamente');
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
        alert('Error al eliminar el usuario. Puede tener compras o comentarios asociados.');
      }
    });
  }
}