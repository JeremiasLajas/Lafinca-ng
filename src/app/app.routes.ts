import { Routes } from '@angular/router';
import { ListaPropiedadesComponent } from './propiedades/lista-propiedades/lista-propiedades.component';
import { DetallePropiedadesComponent } from './propiedades/detalle-propiedades/detalle-propiedades.component';
import { LoginComponent } from './login/login.component';
import { usuarioActivoGuard } from './guards/usuario.guard';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./propiedades/lista-propiedades/lista-propiedades.component')
          .then(m => m.ListaPropiedadesComponent),
        pathMatch: 'full'
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
      }
];
