import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public estaLogueado: boolean = false;
  private usuarioLogueado: Usuario = {id: 0,
    codigo: '',
    nombreyapellido:  '',
    dni:  '',
    correo:  '',
    usuario:  '',
    nivel:  0};

  constructor() { }

  //Si utilizamos la variable usuarioLogueado solo en setUsuarioLogueado como aun no es existente en sessionStorage typscrip detecta como que no esta siendo leida en ningun lado. Por ello debemos utilizarla en getUsuario logueado para que no haya
  
  setUsuarioLogueado(usuario: Usuario) {
    this.estaLogueado = true;
    this.usuarioLogueado = usuario;
    sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));

  }

  
  getUsuarioLogueado(): Usuario | null {
    if (this.usuarioLogueado) { // Verifica si ya hay un usuario en memoria antes de acceder nuevamente al sessionStorage lo que lo optimiza
      return this.usuarioLogueado;
    }
    //Si no lo retorna de memoria si accede a sessionStorage para buscarlo 
    const usuarioString = sessionStorage.getItem('usuarioActual');
    return usuarioString ? JSON.parse(usuarioString) : null;

    
  }

  

  logout() {
    this.estaLogueado = false;
    sessionStorage.removeItem('usuarioActual');
  }
}
