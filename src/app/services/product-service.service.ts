import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/interface';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  //METODOS:
  
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]> (
      environment.urlBase
    )
  }

  getProduct(id: number): Observable<Producto> {
    return this.http.get<Producto> (
      environment.urlBase+id
    )
  }

  addProduct(product: Producto): Observable<Producto>{
    return this.http.post<Producto> (
      environment.urlBase, product
    )
  }

  updateProduct(product: Producto): Observable<Producto> {
    return this.http.put<Producto> (
      environment.urlBase + product.id, product
    )
  }

  deleteProduct(id: number): Observable<Producto> {
    return this.http.delete<Producto> (
      environment.urlBase + id
    )
  }
}
