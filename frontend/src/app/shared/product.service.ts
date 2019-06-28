import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: "root"
})
export class ProductService {
    selectedProduct: Product = {
    model: "",
    brand: "",
    price: 0
  };


  constructor(private http: HttpClient) {}

    registerProduct(productData) {
    return this.http.post(
        environment.apiBaseUrl + "/product/register",
      productData
    );
  }
}
