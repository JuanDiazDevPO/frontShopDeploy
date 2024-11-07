import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductosComponent } from './components/product-list/product-list.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ValidarCodigoComponent } from './components/validar-codigo/validar-codigo.component';
import { CambiarPassword } from './services/cambiar-contraseña.service';
import { CambiarContrasenaComponent } from './components/cambiar-password/cambiar-password.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'menu',
    component: ProductosComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
{
  path: 'password-reset',
  component: PasswordResetComponent
},
{
  path: 'validar-codigo',
  component: ValidarCodigoComponent
},
{
  path: 'cambiar-password',
  component: CambiarContrasenaComponent
}
 
 
];
