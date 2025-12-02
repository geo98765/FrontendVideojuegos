import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { UsuariosService } from '../../services/UsuariosService';
import { UsuarioDTO } from '../../models/VideojuegoDTO';

@Component({
  selector: 'app-list-usuarios',
  imports: [MatTableModule, RouterLink, MatButton],
  templateUrl: './list-usuarios.html',
  styleUrl: './list-usuarios.css'
})
export class ListUsuarios {
  usuariosService = inject(UsuariosService);
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'acciones'];
  usuariosDataSource: UsuarioDTO[] = [];

  constructor() {
    this.actualizar();
  }

  actualizar() {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuariosDataSource = usuarios;
    });
  }
}