import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroUsuario } from '../interfaces/registro-usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  items = []

  usuario: RegistroUsuario = {
    id: 0,
    codigo: 0,
    nombreyapellido: "",
    dni: 0,
    fechadenacimiento: "",
    sexo: "",
    direccion: "",
    localidad: "",
    provincia: "",
    password: "",
    observaciones: "",
    telefono: "",
    usuario: "",
    nivel: 0,
    correo: ""
  }

  private url='http://localhost/api/datos.php?tabla=usuarios';


  constructor(private  http: HttpClient) { }

  getRegistros(): Observable<RegistroUsuario[]>{
    return this.http.get<RegistroUsuario[]>(`${this.url}&accion=seleccionar`);
  }

  getRegistro(id: any): Observable<RegistroUsuario[]>{
    return this.http.get<RegistroUsuario[]>(`${this.url}&accion=seleccionar&id=${id}`);
  }

  guardarRegistro(id: any, datos: RegistroUsuario) {
    if(id > 0) {
      this.http.post(`${this.url}&accion=actualizar&id=${id}`, datos)
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
    } else {
      this.http.post(`${this.url}&accion=insertar&id=${id}`, datos)
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
    }
  }

  eliminarRegistro(id: any) {
    this.http.post(`${this.url}&accion=eliminar&id=${id}`, {})
      .subscribe(
        res => { console.log(res) },
        err => { console.log('Ocurrió un error') }
      )
  }
}
