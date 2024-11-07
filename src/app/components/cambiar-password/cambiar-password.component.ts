import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CambiarPassword } from '../../services/cambiar-contraseña.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

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

  constructor(private fb: FormBuilder, private cambiarPassword : CambiarPassword) {
    // Definir el formulario reactivo
    this.cambiarContrasenaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nuevaContrasena: ['', Validators.required]
    });
  }

  cambiarContrasena() {
    if (this.cambiarContrasenaForm.valid) {
      const { email, nuevaContrasena } = this.cambiarContrasenaForm.value;
      this.cambiarPassword.cambiarContrasenaPorEmail(email, nuevaContrasena).subscribe({
        next: (response) => {
          this.mensaje = response;
        },
        error: (error) => {
          this.mensaje = error.error;
        }
      });
    }
  }
}
