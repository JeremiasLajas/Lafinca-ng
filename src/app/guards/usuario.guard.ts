import { CanActivateFn } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';
import { inject } from '@angular/core';
export const usuarioActivoGuard: CanActivateFn = (route, state) => {
  return inject(UsuariosService).estaLogueado;
};
