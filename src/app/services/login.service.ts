import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UsuarioLoginRequest {
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:8090/usuario/iniciarSesion';

  constructor(private http: HttpClient) {}

  private user : UsuarioLoginRequest | undefined; 
  
  login(usuario: UsuarioLoginRequest): Observable<string> {
     this.user=usuario;  // Usamos responseType: 'text' para recibir la respuesta como texto plano
    return this.http.post<string>(this.loginUrl, usuario, { responseType: 'text' as 'json' });
  }



public  getUserEmail(){
  return this.user?.email;
}

}

