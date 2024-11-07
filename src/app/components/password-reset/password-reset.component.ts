import { Component } from '@angular/core';
import { ResetPasswordService } from '../../services/resetpassword.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule  // Asegúrate de que RouterModule esté importado
  ]
})
export class PasswordResetComponent {
  resetForm: FormGroup;
  mensaje: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private fb: FormBuilder,
    private router: Router // Inyectamos Router para redirección
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.resetForm.value.email;

    // Verifica si el formulario es válido antes de hacer la solicitud
    if (this.resetForm.invalid) {
      this.mensaje = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    // Llamamos al servicio para solicitar el código de cambio de contraseña
    this.resetPasswordService.solicitarCodigo(email).subscribe(
      (response) => {
        this.mensaje = response; // Mensaje recibido desde el backend
        alert("Código enviado con éxito. Redirigiendo...");
        this.router.navigate(['/validar-codigo']); // Redirección a la nueva página, ajusta la ruta según sea necesario
      },
      (error) => {
        // Manejo de error con mensajes específicos si es posible
        if (error.status === 404) {
          this.mensaje = 'Usuario no encontrado con ese correo electrónico.';
        } else {
          this.mensaje = 'Hubo un error al enviar el código. Intenta nuevamente.';
        }
        console.error(error);
      }
    );
  }
}