import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  standalone:true,
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  compra: any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener el JSON desde los queryParams y parsearlo
    this.route.queryParams.subscribe(params => {
      if (params['compra']) {
        this.compra = JSON.parse(params['compra']);
      }
    });
  }

  // Método para mostrar si es un regalo
  esRegalo(): string {
    return this.compra.isGift ? `Sí, regalo para ${this.compra.isGift}` : 'No es un regalo';
  }

  printInvoice(): void {
    // Crear un iframe temporal para la impresión
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // Obtener el contenido de la factura
    const invoiceContent = document.querySelector('.invoice')?.outerHTML;

    // Escribir el contenido en el iframe
    const iframeDocument = iframe.contentWindow?.document;
    iframeDocument?.open();
    iframeDocument?.write(`
      <html>
        <head>
          <title>Factura de Compra</title>
          <style>
            /* Estilos de impresión */
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
            }
            .invoice {
              padding: 20px;
              border: 1px solid #000;
              max-width: 500px;
              margin: 0 auto;
              background-color: #f9f9f9;
            }
            h2 {
              text-align: center;
            }
            p {
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          ${invoiceContent}
        </body>
      </html>
    `);
    iframeDocument?.close();

    // Imprimir el contenido
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    // Eliminar el iframe temporal después de la impresión
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  }

  goToMenu(): void {
    // Navega al menú principal (ajusta la ruta según la navegación de tu aplicación)
    this.router.navigate(['menu']);
  }
}