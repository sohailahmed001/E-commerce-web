import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  addProduct(product: FormData): Observable<any> {
    return this.httpClient.post<Product>(
      `${environment.baseUrl}/addNewProduct`,
      product
    );
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get<Product[]>(
      `${environment.baseUrl}/getAllProducts`
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/deleteProduct/${productId}`
    );
  }

  getProductById(productId: number): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/getProductById/${productId}`
    );
  }

  getProductDetails(
    isSingleProductCheckout: boolean,
    productId: number
  ): Observable<any> {
    return this.httpClient.get<Product[]>(
      `${environment.baseUrl}/getProductDetails/${isSingleProductCheckout}/${productId}`
    );
  }
}
