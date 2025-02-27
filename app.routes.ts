import { Routes } from '@angular/router';
import { ListaPropiedadesComponent } from './propiedades/lista-propiedades/lista-propiedades.component';
import { DetallePropiedadesComponent } from './propiedades/detalle-propiedades/detalle-propiedades.component';
import { LoginComponent } from './login/login.component';
import { usuarioActivoGuard } from './guards/usuario.guard';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
export const routes: Routes = [
    {
        path: '',
        
        loadComponent: () => import('./propiedades/lista-propiedades/lista-propiedades.component')
          .then(m => m.ListaPropiedadesComponent),
        pathMatch: 'full',
        
      },
      {
        path: 'propiedades/:id',
        loadComponent: () => import('./propiedades/detalle-propiedades/detalle-propiedades.component')
          .then(m => m.DetallePropiedadesComponent), canActivate: [usuarioActivoGuard]
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'lista-usuarios/registro/:id',
        loadComponent: () => import('./usuarios/registro-usuario/registro-usuario.component')
          .then(m => m.RegistroUsuarioComponent)
      },
      {
        path: 'lista-usuarios',
        loadComponent: () => import('./usuarios/lista-usuarios/lista-usuarios.component')
          .then(m => m.ListaUsuariosComponent)
      },
      {
        path: 'lista-recibos',
        loadComponent: () => import('./recibos/lista-recibos/lista-recibos.component')
          .then(m => m.ListaRecibosComponent)
      },
      {
        path: 'lista-recibos/detalle-recibo/:id',
        loadComponent: () => import('./recibos/detalle-recibo/detalle-recibo.component')
          .then(m => m.DetalleReciboComponent)
      },

];
