import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public estaLogueado: boolean = false;
  private usuarioLogueado: Usuario = {usuario: '', nivel: 0};

  constructor() { }



  setUsuarioLogueado(usuario: Usuario) {
    this.estaLogueado = true;
    this.usuarioLogueado = usuario;
    sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  getUsuarioLogueado() {
    return sessionStorage.getItem('usuarioActual');
  }

  logout() {
    this.estaLogueado = false;
    sessionStorage.removeItem('usuarioActual');
  }
}
