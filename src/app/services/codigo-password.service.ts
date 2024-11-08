import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = 'https://pivotal-base-441001-e5.ue.r.appspot.com/usuario/validar-codigo'; // Reemplaza esta URL con la correcta de tu backend

  constructor(private http: HttpClient) { }

  validarCodigo(codigoRequest: { idUsuario: number, codigo: string }): Observable<string> {
    return this.http.post<string>(this.apiUrl, codigoRequest);
  }
}