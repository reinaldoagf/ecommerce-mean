import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: "root"
})
export class ProductService {
  selectedProduct: Product = {
    _id: "",
    model: "",
    brand: "",
    price: 0,
    stock: 0
  };
  myProducts: Product[];

  constructor(private http: HttpClient) {}

  registerProduct(productData) {
    return this.http.post(
      environment.apiBaseUrl + "/myproducts/register",
      productData
    );
  }
  getMyProducts() {
    return this.http.get(environment.apiBaseUrl + "/myproducts");
  }
}
