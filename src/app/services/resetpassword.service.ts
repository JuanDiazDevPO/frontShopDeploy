import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private resetPasswordUrl = 'http://localhost:8090/usuario/solicitar-codigo'; // Actualiza con tu URL

  constructor(private http: HttpClient) {}

  solicitarCodigo(email: string): Observable<string> {
    return this.http.post<string>(this.resetPasswordUrl, email, { responseType: 'text' as 'json' });
  }
}