import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ListVideojuegos } from './components/list-videojuegos/list-videojuegos';
import { FormAgregarVideojuego } from './components/form-agregar-videojuego/form-agregar-videojuego';
import { FormActualizarVideojuego } from './components/form-actualizar-videojuego/form-actualizar-videojuego';
import { ConfirmarEliminacionVideojuego } from './components/confirmar-eliminacion-videojuego/confirmar-eliminacion-videojuego';
import { DetalleVideojuego } from './components/detalle-videojuego/detalle-videojuego';
import { ListUsuarios } from './components/list-usuarios/list-usuarios';
import { FormAgregarUsuario } from './components/form-agregar-usuario/form-agregar-usuario';
import { FormActualizarUsuario } from './components/form-actualizar-usuario/form-actualizar-usuario';
import { ConfirmarEliminacionUsuario } from './components/confirmar-eliminacion-usuario/confirmar-eliminacion-usuario';
import { ListCompras } from './components/list-compras/list-compras';
import { FormRealizarCompra } from './components/form-realizar-compra/form-realizar-compra';
import { ListComentarios } from './components/list-comentarios/list-comentarios';
import { FormAgregarComentario } from './components/form-agregar-comentario/form-agregar-comentario';

export const routes: Routes = [
  { path: '', component: Home },
  
  // Rutas de Videojuegos
  { path: 'videojuegos', component: ListVideojuegos },
  { path: 'videojuegos/crear', component: FormAgregarVideojuego },
  { path: 'videojuegos/actualizar/:id', component: FormActualizarVideojuego },
  { path: 'videojuegos/eliminar/:id', component: ConfirmarEliminacionVideojuego },
  { path: 'videojuegos/detalle/:id', component: DetalleVideojuego },
  
  // Rutas de Usuarios
  { path: 'usuarios', component: ListUsuarios },
  { path: 'usuarios/crear', component: FormAgregarUsuario },
  { path: 'usuarios/actualizar/:id', component: FormActualizarUsuario },
  { path: 'usuarios/eliminar/:id', component: ConfirmarEliminacionUsuario },
  
  // Rutas de Compras
  { path: 'compras', component: ListCompras },
  { path: 'compras/realizar', component: FormRealizarCompra },
  
  // Rutas de Comentarios
  { path: 'comentarios', component: ListComentarios },
  { path: 'comentarios/crear', component: FormAgregarComentario },
  
  { path: '**', redirectTo: '' }
];