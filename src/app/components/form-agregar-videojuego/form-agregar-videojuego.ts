import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VideojuegosService } from '../../services/VideojuegosService';

@Component({
  selector: 'app-form-agregar-videojuego',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-agregar-videojuego.html',
  styleUrl: './form-agregar-videojuego.css'
})
export class FormAgregarVideojuego {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private videojuegosService = inject(VideojuegosService);

  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(200)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    tamanoGb: [0, [Validators.required, Validators.min(0.1)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    imagen: ['']
  });

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
  if (!this.form.valid) {
    alert('complete todos los campos requeridos');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', this.form.value.nombre!);
  formData.append('descripcion', this.form.value.descripcion!);
  formData.append('tamanoGb', this.form.value.tamanoGb!.toString());
  formData.append('precio', this.form.value.precio!.toString());
  
  if (this.archivoSeleccionado) {
    formData.append('UrlImg', this.archivoSeleccionado);
  }

  this.videojuegosService.postVideojuego(formData).subscribe({
    next: () => {
      this.router.navigate(['/videojuegos']);
    },
    error: (error) => {
      console.error('Error al crear videojuego:', error);
      alert('Error al crear el videojuego');
    }
  });
}
}