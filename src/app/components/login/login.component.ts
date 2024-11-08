import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  passwordValue: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  navReg(): void {
    this.router.navigate(['register']);
  }

  navMenu(): void {
    this.router.navigate(['menu']);
  }

  onLogin(): void {
    const loginRequest = {
      email: this.email,
      contraseña: this.passwordValue,
    };

    // Ver lo que se va a enviar al backend
    console.log('Enviando al backend:', loginRequest);

    this.loginService.login(loginRequest).subscribe({
      next: (response) => {
        // Aquí la respuesta será un texto plano
        alert(response);  // Mostrar el mensaje de texto recibido del backend
        if (response === 'Inicio de sesión exitoso') {
          this.navMenu();
        }
      },
      error: (error) => {
        // Manejar cualquier error en la solicitud
        alert(error.error || 'Error al iniciar sesión');
      },
    });
  }
 
}
