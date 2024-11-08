import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de agregar CommonModule
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;  // Usamos el operador "!" para indicar que se inicializará más tarde

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario reactivo en el ngOnInit
    this.registerForm = this.fb.group({
      id_usuario: ['', Validators.required],  // Campo para la cédula
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Asegúrate de validar el correo
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required]]
    });
  }

  // Método para manejar el registro
  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    // Obtener los valores del formulario
    const user = this.registerForm.value;

    // Eliminar el campo confirmarContraseña, ya que no se envía al backend
    delete user.confirmarContraseña;

    // Verificar el contenido del objeto 'user' antes de enviarlo
    console.log('Datos enviados al backend:', user);

    this.http.post('https://pivotal-base-441001-e5.ue.r.appspot.com/usuario/registrar', user, { responseType: 'text' }).subscribe(
      (response) => {
        // Verifica que la respuesta sea exitosa y contiene el mensaje esperado
        console.log('Respuesta del backend:', response);  // Para ver lo que devuelve el backend

        // Si la respuesta contiene el mensaje esperado
        if (response === 'Usuario guardado con éxito') {
          alert('Registro exitoso');
          this.router.navigate(['login']);
        } else {
          alert('Error al registrar: Respuesta inesperada del servidor');
        }
      },
      (error) => {
        // Aquí solo manejamos los errores
        console.error('Error completo:', error);
        
        if (error.status === 500) {
          alert('Error al registrar: Hubo un problema en el servidor. Detalles: ' + (error.error ? error.error : error.message));
        } else if (error.status === 400 && error.error && error.error.includes("correo")) {
          // Si el error es relacionado con el correo (correo ya está en uso o inválido)
          alert('Error al registrar: El correo electrónico ya está en uso o no es válido.');
        } else {
          alert('Error al registrar: ' + (error.message || error.statusText));
        }
      }
    );
  }
}













