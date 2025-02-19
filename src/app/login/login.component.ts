import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService] 

})
export class LoginComponent implements OnInit {

  u: any;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }


  ngOnInit(): void {

  }

  login(usuario: string, password: string, event: Event) {
    event.preventDefault(); // Prevenimos el evento por defecto
    this.loginService.login(usuario, password)
      .subscribe(
        res => {
          this.u = res;
          this.usuarioService.setUsuarioLogueado(this.u);
          this.usuarioService.estaLogueado = true;
        },
        error => {
          console.error(error);
        },
        () => this.navegar()
      );
  }

  navegar() {
    this.router.navigateByUrl('/');
  }

}
