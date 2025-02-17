import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/api/login.php';

  constructor(private http: HttpClient) { }



  login(usuario: string, password: string): Observable<any> {
    return this.http.post(this.url, { usuario, password });
  }
}
