import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComprasService } from '../../services/ComprasComentariosService';
import { UsuariosService } from '../../services/UsuariosService';
import { VideojuegosService } from '../../services/VideojuegosService';
import { UsuarioDTO, VideojuegoDTO, CompraDTOCrear } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-form-realizar-compra',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-realizar-compra.html',
  styleUrl: './form-realizar-compra.css'
})
export class FormRealizarCompra implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private comprasService = inject(ComprasService);
  private usuariosService = inject(UsuariosService);
  private videojuegosService = inject(VideojuegosService);

  usuarios: UsuarioDTO[] = [];
  videojuegos: VideojuegoDTO[] = [];

  form = this.formBuilder.group({
    usuarioId: [0, [Validators.required, Validators.min(1)]],
    videojuegoId: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.videojuegosService.getVideojuegos().subscribe(juegos => {
      this.videojuegos = juegos;
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      alert('Por favor seleccione un usuario y un videojuego');
      return;
    }

    const compra = this.form.value as CompraDTOCrear;
    this.comprasService.realizarCompra(compra).subscribe({
      next: (response) => {
        alert(response.mensaje || 'Compra realizada exitosamente');
        this.router.navigate(['/compras']);
      },
      error: (error) => {
        console.error('Error al realizar compra:', error);
        alert(error.error || 'Error al realizar la compra');
      }
    });
  }
}