import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadesService } from '../../servicios/propiedades.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { RegistroService } from '../../servicios/registros.service';
@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent {
  id: any;
  items: any;
  usuario: any;


    constructor(
      private ruta: ActivatedRoute,
      private router: Router,
      private registroService: RegistroService
    ) { }


    ngOnInit(): void {
      this.id = this.ruta.snapshot.paramMap.get('id');
      if (this.id > 0) {
        this.obtenerRegistro(this.id);
      } else {
        this.usuario = this.registroService.usuario;
      }
  
    }

    obtenerRegistro(id: any): void {
      this.registroService.getRegistro(id)
      .subscribe(
        (res: any) => {
          this.items = res;
          this.usuario = this.items[0];
          console.log(this.items);
          console.log(this.usuario);
        },
        (error) => { console.error (error); }
      );
    }
  
  
    guardarRegistro(id: any): void {    
      this.registroService.guardarRegistro(id, this.usuario);
      alert('Cliente guardado!');
      this.router.navigate(['/lista-usuarios']); // this.router.navigateByUrl('/');
    }
    
  
    eliminarRegistro(id: any): void {
      let respuesta = confirm(`¿Desea eliminar a ${this.usuario.nombreyapellido}?`);
      if (respuesta) {
        this.registroService.eliminarRegistro(id);
        alert('Usuario eliminado!');
        this.router.navigate(['/lista-usuarios']);
      }
    }
}
