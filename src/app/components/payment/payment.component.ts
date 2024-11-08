import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ProductService } from '../../services/product.service';
import { ProductoModel } from '../models/Product';
import { PaymentConfirmationDialogComponent } from '../payment-confirmation-dialog/payment-confirmation-dialog.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatInputModule, MatCardModule, MatButtonModule, MatListModule, 
    MatSelectModule, MatCheckboxModule, ReactiveFormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  productos: ProductoModel[] = []; // Productos del carrito
  precioFinal = 0; // Precio total de la compra
  paymentForm: FormGroup; // Formulario de pago

  constructor(
    private productService: ProductService,
    private loginService : LoginService, // Servicio para obtener el carrito
    private fb: FormBuilder, // FormBuilder para crear el formulario reactivo
    private dialog: MatDialog,
    private router: Router// Diálogo para confirmar el pago
  ) {
    this.paymentForm = this.fb.group({
      paymentType: [''], // Tipo de pago (tarjeta, transferencia, etc.)
      paymentNumber: [''], // Número de pago (tarjeta, etc.)
      isGift: ['no'], // Si es un regalo o no
      priorityShipping: [false], // Si requiere envío prioritario
    });
  }

  ngOnInit(): void {
    // Obtener productos del carrito almacenados en el servicio
    this.productos = this.productService.getCart();
    this.calcularTotal(); // Calcular el total de la compra
  }

  calcularTotal(): void {
    // Sumar los precios de los productos para calcular el total
    this.precioFinal = this.productos.reduce((sum, producto) => sum + producto.precio, 0);
  }

  submitPayment(): void {
    
    if (this.paymentForm.valid) {

      const comprafactura = {
        emailCliente: this.loginService.getUserEmail(),
        paymentType: this.paymentForm.get('paymentType')?.value,
        paymentNumber: this.paymentForm.get('paymentNumber')?.value,
        isGift: this.paymentForm.get('isGift')?.value === 'yes' ? this.loginService.getUserEmail() : null, // Si es un regalo, mostrar el correo
        precioFinal: this.precioFinal // Incluir el precio final
    
      };


      const compra = {
        emailCliente: this.loginService.getUserEmail(),
        productosComprados: this.productos.map(producto => ({
          nombre: producto.nombre,
          precio: producto.precio.toFixed(2),
          cantidad: producto.stock
        })),
        precioFinal: this.precioFinal // Incluir el precio final
      };

      console.log(compra);

      // Abrir el diálogo de confirmación de inmediato
      this.dialog.open(PaymentConfirmationDialogComponent, {
        data: { message: 'Pago realizado con éxito' },
        width: '300px',
      });

      this.router.navigate(['invoice'], { queryParams: { compra: JSON.stringify(comprafactura) } });


      // Llamar a sendShop para enviar el JSON al backend
      this.productService.sendShop(compra).subscribe({
        next: () => {
          // Redirigir a la página de la factura con los datos de la compra
      
        },
        error: err => {
          console.error("Error al enviar la compra:", err);
        }
      });
    } else {
      alert("Por favor complete todos los campos requeridos.");
    }
  }
 
  eliminarProducto(producto: ProductoModel): void {
   
    const index = this.productos.findIndex(p => p.nombre === producto.nombre);
    

    if (index > -1) {
      this.productos.splice(index, 1); 
      this.calcularTotal(); 
    }
  }
  goToMenu(): void {
    // Navega al menú principal (ajusta la ruta según la navegación de tu aplicación)
    this.router.navigate(['/menu']);
  }


}