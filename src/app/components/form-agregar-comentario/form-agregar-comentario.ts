import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComentariosService } from '../../services/ComprasComentariosService';
import { UsuariosService } from '../../services/UsuariosService';
import { VideojuegosService } from '../../services/VideojuegosService';
import { UsuarioDTO, VideojuegoDTO, ComentarioDTOCrear } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-form-agregar-comentario',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-agregar-comentario.html',
  styleUrl: './form-agregar-comentario.css'
})
export class FormAgregarComentario implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private comentariosService = inject(ComentariosService);
  private usuariosService = inject(UsuariosService);
  private videojuegosService = inject(VideojuegosService);

  usuarios: UsuarioDTO[] = [];
  videojuegos: VideojuegoDTO[] = [];

  form = this.formBuilder.group({
    usuarioId: [0, [Validators.required, Validators.min(1)]],
    videojuegoId: [0, [Validators.required, Validators.min(1)]],
    comentario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
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
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const comentario = this.form.value as ComentarioDTOCrear;
    this.comentariosService.postComentario(comentario).subscribe({
      next: (response) => {
        alert(response.mensaje || 'Comentario agregado exitosamente');
        this.router.navigate(['/comentarios']);
      },
      error: (error) => {
        console.error('Error al agregar comentario:', error);
        alert(error.error || 'Error al agregar el comentario');
      }
    });
  }
}
