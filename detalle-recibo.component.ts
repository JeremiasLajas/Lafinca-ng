import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadesService } from '../../servicios/propiedades.service';
import { RegistroService } from '../../servicios/registros.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { RecibosService } from '../../servicios/recibos.service';

@Component({
  selector: 'app-detalle-recibo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './detalle-recibo.component.html',
  styleUrl: './detalle-recibo.component.css'
})
export class DetalleReciboComponent {
   id: any;
    items: any;
    recibo: any;
    propiedades: any;
    usuarios: any;
    usuarioActual: any = [];
 
    constructor(
      private ruta: ActivatedRoute,
      private router: Router,
      private propiedadesService: PropiedadesService,
      private registrosService: RegistroService,
      private recibosService: RecibosService
    ) { }
  
    ngOnInit(): void {
      this.id = this.ruta.snapshot.paramMap.get('id');
      this.usuarioActual = sessionStorage.getItem('usuarioActual');

      this.propiedadesService.getPropiedades()
      .subscribe(
        (res: any) => { this.propiedades = res; },
        (error) => { console.log(error); }
      );

      this.registrosService.getRegistros()
      .subscribe(
        (res: any) => { this.usuarios = res; },
        (error) => { console.error(error); }
      );

      if (this.id > 0) {
        this.obtenerRecibo(this.id);
      } else {
        this.recibo = this.recibosService.recibo;
      }
  
    }
  
    obtenerRecibo(id: any): void {
      this.recibosService.getRecibo(id)
      .subscribe(
        (res: any) => {
          this.items = res;
          this.recibo = this.items[0];
          console.log(this.items);
          console.log(this.recibo);
        },
        (error) => { console.error (error); }
      );
    }
  
  
    guardarRecibo(id: any): void {    
      this.recibosService.guardarRecibo(id, this.recibo);
      alert('Recibo guardado!');
      this.router.navigate(['/lista-recibos']); // this.router.navigateByUrl('/');
    }
    
  
    eliminarRecibo(id: any): void {
      let respuesta = confirm(`¿Desea eliminar el recibo Nº ${this.recibo.id}?`);
      if (respuesta) {
        this.recibosService.eliminarRecibo(id);
        alert('Recibo Eliminado!');
        this.router.navigate(['/lista-recibos']);
      }
    }
}
