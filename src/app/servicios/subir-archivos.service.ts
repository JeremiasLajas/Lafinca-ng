import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  url = 'http://localhost/api/subirarchivo.php';

  constructor(private http: HttpClient) { }

  subirArchivos(datos: any):Observable<any> {
    return this.http.post(this.url, datos);
  }
}
