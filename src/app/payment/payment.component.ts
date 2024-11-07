import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { PaymentConfirmationDialogComponent } from '../payment-confirmation-dialog/payment-confirmation-dialog.component';
import { ProductoModel } from '../Product';
import { ProductService } from '../product.service';

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
    private productService: ProductService, // Servicio para obtener el carrito
    private fb: FormBuilder, // FormBuilder para crear el formulario reactivo
    private dialog: MatDialog // Diálogo para confirmar el pago
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
      console.log("Datos de pago:", this.paymentForm.value);

      // Abre el diálogo de confirmación del pago
      this.dialog.open(PaymentConfirmationDialogComponent, {
        data: { message: 'Pago realizado con éxito' },
        width: '300px',
      });
    } else {
      console.log("Por favor complete todos los campos requeridos.");
    }
  }
}