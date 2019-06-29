import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ProductService } from "../../shared/product.service";
import { Product } from "../../shared/product.model";

@Component({
  selector: "app-myproducts",
  templateUrl: "./myproducts.component.html",
  styleUrls: ["./myproducts.component.css"]
})
export class MyproductsComponent implements OnInit {
  constructor(private productService: ProductService) {}
  serverErrorMessages: string;
  ngOnInit() {
    this.getMyProducts();
  }
  onSubmit(form?: NgForm) {
    console.log(form.value);
    this.productService.registerProduct(form.value).subscribe(
      res => {
        this.getMyProducts();
        this.resetForm(form);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  getMyProducts() {
    this.productService.getMyProducts().subscribe(
      res => {
        this.productService.myProducts = res as Product[];
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productService.selectedProduct = new Product();
    }
  }
}
