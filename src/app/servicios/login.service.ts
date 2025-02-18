import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/api/login.php';

  // Datos del usuario
  private u: Usuario = { usuario:'', nivel: 0, id: 0 };
  constructor(private http: HttpClient
  ) { }


  login(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, { usuario, password }).pipe(
      tap((response: any) => {  
        console.log("Respuesta del servidor:", response); // Verifica la estructura en la consola
        
        if (response.resultado === "OK") {
          this.u = {
            usuario: response.usuario, // Extraer solo los datos correctos
            id: response.id,
            nivel: response.nivel
          };
        } else {
          console.error("Error de login:", response.mensaje);
        }

      })
    );
  }

getUsuario(): Usuario {
  return this.u; // Retorna los datos almacenados del usuario
}

}


