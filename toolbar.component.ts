import { Component, inject, OnInit  } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    NgIf,
    CommonModule 
 
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [UsuariosService] 
  
})

export class ToolbarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  logueado:boolean = false;
  administrador: boolean = false;
  usuarioActual: any 
  nivel : any
  constructor(private usuarioService: UsuariosService, private router: Router) {}
  
  ngOnInit(): void {
    this.usuarioActual = this.usuarioService.getUsuarioLogueado();
    
    if (typeof window !== 'undefined' && this.usuarioActual) {
      this.logueado = true;      
      this.nivel = this.usuarioActual[0].nivel;
      console.log(this.nivel);

    } else {
      this.logueado = false;
    }
    console.log(this.logueado);
    
}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.usuarioService.logout();
    this.logueado = false;
    this.router.navigateByUrl('/');
  }
}
