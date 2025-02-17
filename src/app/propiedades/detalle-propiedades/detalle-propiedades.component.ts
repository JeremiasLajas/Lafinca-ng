import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadesService } from '../../servicios/propiedades.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { SubirArchivosService } from '../../servicios/subir-archivos.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Propiedad } from '../../interfaces/propiedad';
@Component({
  selector: 'app-detalle-propiedades',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './detalle-propiedades.component.html',
  styleUrl: './detalle-propiedades.component.css'
})
export class DetallePropiedadesComponent implements OnInit {
  id: any;
  items: any;
  propiedad: any ;
  archivos: any = [];
  usuarioActual: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: ''
  }
  datos: any = {
    resultado: null,
    mensaje: null
  }

  constructor(
    private usuario: UsuariosService,
    private ruta: ActivatedRoute,
    private router: Router,
    private propiedadesService: PropiedadesService,
    private subirArchivo: SubirArchivosService,
  ) { }

  ngOnInit(): void {
    this.usuarioActual =  JSON.parse(sessionStorage.getItem('usuarioActual') || '{}');
    console.log(this.usuarioActual)
    this.id = this.ruta.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.obtenerPropiedad(this.id);
    } else {
      this.propiedad = this.propiedadesService.propiedad;
    }

  }


  obtenerPropiedad(id: any): void {
    this.propiedadesService.getPropiedad(id)
    .subscribe(
      (res: any) => {
        this.items = res;
        this.propiedad = this.items[0];
        console.log(this.items);
        console.log(this.propiedad);
      },
      (error) => { console.error (error); }
    );
  }


  guardarPropiedad(id: any): void {
    this.propiedad.idUsuario = this.usuarioActual.id
    this.propiedadesService.guardarPropiedad(id, this.propiedad);
    console.log(this.propiedad)
    alert('Propiedad guardada!');
    this.router.navigate(['/']); // this.router.navigateByUrl('/');
  }
  

  eliminarPropiedad(id: any): void {
    let respuesta = confirm(`¿Desea eliminar a ${this.propiedad.titulo}?`);
    if (respuesta) {
      this.propiedadesService.eliminarPropiedad(id);
      alert('Propiedad eliminada!');
      this.router.navigate(['/']);
    }
  }

  upload() {
    console.log(this.archivo);
    this.subirArchivo.subirArchivos(this.archivo)
      .subscribe (
        res => {
          this.datos = res;
          if(this.datos['resultado'] == 'OK') {
            alert(this.datos['mensaje']);
          }
        }
      )
  }




  capturarImagen(event: any): any {
    let files = event.target.files;
    let file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.propiedad.imagen = this.archivo.nombreArchivo;

    if(files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }


  _handleReaderLoaded(readerEvent: any) {
    let binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

}
