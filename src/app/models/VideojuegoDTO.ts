// DTOs para Videojuegos
export interface VideojuegoDTO {
  id: number;
  nombre: string;
  descripcion: string;
  tamanoGb: number;
  descargas: number;
  urlImg: string;
  precio: number;
  creadoEn: Date;
}

export interface VideojuegoDTOCrear {
  nombre: string;
  descripcion: string;
  tamanoGb: number;
  precio: number;
  imagen?: File;
}

// DTOs para Usuarios (SIN ROL)
export interface UsuarioDTO {
  id: number;
  nombre: string;
  correo: string;
}

export interface UsuarioDTOCrear {
  nombre: string;
  correo: string;
  contrasena: string;
}

// DTOs para Compras
export interface CompraDTO {
  id: number;
  usuarioId: number;
  usuario: string;
  videojuegoId: number;
  videojuego: string;
  precio: number;
  fechaCompra: Date;
}

export interface CompraDTOCrear {
  usuarioId: number;
  videojuegoId: number;
}

// DTOs para Comentarios
export interface ComentarioDTO {
  id: number;
  usuario: string;
  usuarioId: number;
  videojuego: string;
  videojuegoId: number;
  comentario: string;
  fecha: Date;
}

export interface ComentarioDTOCrear {
  usuarioId: number;
  videojuegoId: number;
  comentario: string;
}