import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuariosService } from '../../services/UsuariosService';
import { UsuarioDTOCrear } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-form-agregar-usuario',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-agregar-usuario.html',
  styleUrl: './form-agregar-usuario.css'
})
export class FormAgregarUsuario {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (!this.form.valid) {
      alert('complete todos los campos correctamente');
      return;
    }

    const usuario = this.form.value as UsuarioDTOCrear;
    this.usuariosService.postUsuario(usuario).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        alert('Error al crear el usuario');
      }
    });
  }
}