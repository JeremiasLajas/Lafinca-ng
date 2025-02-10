import { Component, OnInit } from '@angular/core';
import { PropiedadesService } from '../../servicios/propiedades.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    MatButtonModule,

  ],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent implements OnInit {
  propiedades: any;
  propiedad: any;
  id: any;
  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.propiedadesService.getPropiedades()
      .subscribe(
        (res: any) => { this.propiedades = res; },
        (error) => { console.log(error); }
      );
 
  }

  eliminarPropiedad(id: any, titulo: any): void {
    let respuesta = confirm(`¿Desea eliminar a ${titulo}?`);
    if (respuesta) {
      this.propiedadesService.eliminarPropiedad(id);
      alert('Propiedad eliminada!');
      this.router.navigate(['/']);
    }
  }
}
