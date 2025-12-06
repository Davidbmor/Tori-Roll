import { Connection } from "mysql2/promise";

export interface Usuario {
  id?: number;
  nombre_usuario: string;
  contrasena: string | null;
  rol: 'cliente' | 'camarero' | 'administrador';
  created_at?: Date;
}

export class UsuarioModel {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async autenticar(nombreUsuario: string, contrasena: string | null): Promise<Usuario | null> {
    try {

      if (nombreUsuario === 'cliente') {
        const [rows]: any = await this.db.query(
          'SELECT id, nombre_usuario, rol FROM usuarios WHERE nombre_usuario = ?',
          [nombreUsuario]
        );
        
        if (rows.length > 0) {
          return rows[0];
        }
        return null;
      }

  
      const [rows]: any = await this.db.query(
        'SELECT id, nombre_usuario, rol FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?',
        [nombreUsuario, contrasena]
      );

      if (rows.length > 0) {
        return rows[0];
      }

      return null;
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      throw error;
    }
  }

  async obtenerPorNombre(nombreUsuario: string): Promise<Usuario | null> {
    try {
      const [rows]: any = await this.db.query(
        'SELECT id, nombre_usuario, rol FROM usuarios WHERE nombre_usuario = ?',
        [nombreUsuario]
      );

      if (rows.length > 0) {
        return rows[0];
      }

      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  async obtenerTodos(): Promise<Usuario[]> {
    try {
      const [rows]: any = await this.db.query(
        'SELECT id, nombre_usuario, rol, created_at FROM usuarios'
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }
}
