import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CambiarPassword } from '../../services/cambiar-contraseña.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router'; // Importar Router para redirección

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarContrasenaComponent {
  cambiarContrasenaForm: FormGroup;
  mensaje: string | null = null;

  constructor(private fb: FormBuilder, private cambiarPassword: CambiarPassword, private router: Router) {
    // Definición del formulario
    this.cambiarContrasenaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required] // Cambié "nuevaContrasena" a "contraseña"
    });
  }

  cambiarContrasena() {
    if (this.cambiarContrasenaForm.valid) {
      const { email, contraseña } = this.cambiarContrasenaForm.value;

      // Llamada al servicio para cambiar la contraseña
      this.cambiarPassword.cambiarContrasenaPorEmail(email, contraseña).subscribe({
        next: (response) => {
          this.mensaje = response;  // Guardar mensaje de éxito
          alert(this.mensaje);  // Mostrar mensaje de éxito

          // Redirigir al login después de un pequeño retraso
          setTimeout(() => {
            this.router.navigate(['/login']);  // Redirigir al login
          }, 2000);  // Esperar 2 segundos para que el usuario vea el mensaje
        },
        error: (error) => {
          this.mensaje = error.error;  // Guardar mensaje de error
          alert(this.mensaje);  // Mostrar mensaje de error
        }
      });
    }
  }
}
