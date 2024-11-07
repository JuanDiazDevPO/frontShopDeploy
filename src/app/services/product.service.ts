import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../components/models/Product'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8090/producto/productos-ordenados-por-categoria';

  constructor(private http: HttpClient) {}

  // Cambiar el tipo para que reciba un objeto simple
  getProducts(): Observable<Record<string, ProductoModel[]>> {
    // Aquí llamamos al backend 
    return this.http.get<Record<string, ProductoModel[]>>(this.baseUrl);
  }

  private productos: ProductoModel[] = [];
//guardar en el carrito 
  public saveCart(producto: ProductoModel) {
    this.productos.push(producto);
  }

  public getCart() {
    return this.productos;
  }
}
