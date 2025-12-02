import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuariosService } from '../../services/UsuariosService';
import { UsuarioDTO, UsuarioDTOCrear } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-form-actualizar-usuario',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-actualizar-usuario.html',
  styleUrl: './form-actualizar-usuario.css'
})
export class FormActualizarUsuario implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usuariosService = inject(UsuariosService);
  
  usuario!: UsuarioDTO;
  id!: string;

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    contrasena: ['', [Validators.minLength(6)]] // No requerido en actualización
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    if (!this.id) {
      console.error('El ID del usuario no se ha proporcionado.');
      this.router.navigate(['/usuarios']);
      return;
    }

    this.usuariosService.getUsuario(Number(this.id)).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.form.patchValue({
          nombre: usuario.nombre,
          correo: usuario.correo
        });
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
        this.router.navigate(['/usuarios']);
      }
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const usuario: UsuarioDTOCrear = {
      nombre: this.form.value.nombre!,
      correo: this.form.value.correo!,
      contrasena: this.form.value.contrasena || '' // Si está vacío, la API debe mantener la contraseña actual
    };

    this.usuariosService.putUsuario(Number(this.id), usuario).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
        alert('Error al actualizar el usuario');
      }
    });
  }
}