import { Component, inject, OnInit } from '@angular/core';
import { CodigoService } from '../../services/codigo-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validar-codigo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent {
  codigoForm: FormGroup;
  mensaje: string = ''; // Mensaje de la respuesta del servidor

  private fb = inject(FormBuilder);
  private codigoService = inject(CodigoService);
  private router = inject(Router);

  constructor() {
    this.codigoForm = this.fb.group({
      idUsuario: ['', [Validators.required, Validators.min(1)]],  // Asegúrate de que idUsuario sea un número válido
      codigo: ['', [Validators.required, Validators.minLength(6)]]  // Ajusta el mínimo a 6 si el código tiene esa longitud
    });
  }

  onSubmit(): void {
    if (this.codigoForm.invalid) {
      return;
    }

    const codigoRequest = {
      idUsuario: this.codigoForm.value.idUsuario, 
      codigo: this.codigoForm.value.codigo,       
    };

    this.codigoService.validarCodigo(codigoRequest).subscribe(
      (response: string) => {
        // Aquí se maneja la respuesta exitosa (200 OK)
        alert(response);  // Muestra el mensaje que devuelve el backend
        
        // Luego redirige a la página de cambio de contraseña
        this.router.navigate(['/cambio-contrasena']);  // Ajusta la ruta según tu configuración
      },
      (error) => {
        // Si el backend responde con 401, muestra un mensaje de error
        if (error.status === 401 || error.status === 500) {
          this.mensaje = 'Código inválido. Por favor, intenta de nuevo.';
        } else {
          // Si el error no es 401, muestra el mensaje de éxito y redirige
          this.mensaje = 'Código válido. Puedes proceder a cambiar tu contraseña.';
          alert('Código válido. Puedes proceder a cambiar tu contraseña.');  // Opcional: puedes mostrar un mensaje también
          this.router.navigate(['/cambio-contrasena']);  // Redirige a la página de cambio de contraseña
        }
      }
    );
  }
}
