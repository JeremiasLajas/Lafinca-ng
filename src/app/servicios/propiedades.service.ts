import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propiedad } from '../interfaces/propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  items = []

  propiedad: Propiedad = {
    id: 0,
    titulo: "",
    codigo: 0,
    propietario: "",
    operacion: "",
    precio: 0,
    mt2: 0,
    ambientes: 0,
    direccion: "",
    descripcion: "",
    imagen: "",
    idUsuario: 0
  }

  private url='http://localhost/api/datos.php?tabla=propiedades';


  constructor(private  http: HttpClient) { }

  getPropiedades(): Observable<Propiedad[]>{
    return this.http.get<Propiedad[]>(`${this.url}&accion=seleccionar`);
  }

  getPropiedad(id: any): Observable<Propiedad[]>{
    return this.http.get<Propiedad[]>(`${this.url}&accion=seleccionar&id=${id}`);
  }

  guardarPropiedad(id: any, datos: Propiedad) {
    if(id > 0) {
      this.http.post(`${this.url}&accion=actualizar&id=${id}`, datos)
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
    } else {
      console.log(datos)
      this.http.post(`${this.url}&accion=insertar&id=${id}`, datos)
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
    }
  }

  eliminarPropiedad(id: any) {
    this.http.post(`${this.url}&accion=eliminar&id=${id}`, {})
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
  }
}
