import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recibo, VtaRecibo } from '../interfaces/recibo';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  items = []

  recibo: Recibo = {
    id: "",
    fecha: "",
    idPropiedad: "",
    monto: "",
    idUsuario: "",
    detalle: ""
  }

  private url='http://localhost/api/datos.php?tabla=recibos';


  constructor(private  http: HttpClient) { }

  getRecibos(): Observable<Recibo[]>{
    return this.http.get<Recibo[]>(`${this.url}&accion=seleccionar`);
  }

  getVtaRecibos(): Observable<Recibo[]>{
    return this.http.get<VtaRecibo[]>(`http://localhost/api/datos.php?tabla=vtarecibos&accion=seleccionar`);
  }

  getRecibo(id: any): Observable<Recibo[]>{
    return this.http.get<Recibo[]>(`${this.url}&accion=seleccionar&id=${id}`);
  }

  guardarRecibo(id: any, datos: Recibo) {
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

  eliminarRecibo(id: any) {
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }
}
