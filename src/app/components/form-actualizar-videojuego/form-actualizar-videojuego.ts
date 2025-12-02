import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VideojuegosService } from '../../services/VideojuegosService';
import { VideojuegoDTO } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-form-actualizar-videojuego',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './form-actualizar-videojuego.html',
  styleUrl: './form-actualizar-videojuego.css'
})
export class FormActualizarVideojuego implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videojuegosService = inject(VideojuegosService);

  videojuego!: VideojuegoDTO;
  id!: string;
  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;
  imagenActual: string | null = null;

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(200)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    tamanoGb: [0, [Validators.required, Validators.min(0.1)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    imagen: ['']
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    if (!this.id) {
      console.error('El ID del videojuego no se ha proporcionado.');
      this.router.navigate(['/videojuegos']);
      return;
    }

    this.videojuegosService.getVideojuego(Number(this.id)).subscribe({
      next: (videojuego) => {
        this.videojuego = videojuego;
        this.imagenActual = videojuego.urlImg;
        this.form.patchValue({
          nombre: videojuego.nombre,
          descripcion: videojuego.descripcion,
          tamanoGb: videojuego.tamanoGb,
          precio: videojuego.precio
        });
      },
      error: (error) => {
        console.error('Error al cargar el videojuego:', error);
        this.router.navigate(['/videojuegos']);
      }
    });
  }

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
      alert('Por favor complete todos los campos requeridos');
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

    this.videojuegosService.putVideojuego(Number(this.id), formData).subscribe({
      next: () => {
        this.router.navigate(['/videojuegos']);
      },
      error: (error) => {
        console.error('Error al actualizar videojuego:', error);
        alert('Error al actualizar el videojuego');
      }
    });
  }
}