import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambiarPassword {
  private apiUrl = 'http://localhost:8090/usuario/cambiar-contrasena-por-email';

  constructor(private http: HttpClient) {}

  cambiarContrasenaPorEmail(email: string, nuevaContrasena: string): Observable<any> {
    const body = { contraseña: nuevaContrasena, email: email };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}