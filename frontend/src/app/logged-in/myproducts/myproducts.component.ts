import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { ProductService } from "../../shared/product.service";
import { Product } from "../../shared/product.model";

@Component({
  selector: "app-myproducts",
  templateUrl: "./myproducts.component.html",
  styleUrls: ["./myproducts.component.css"]
})
export class MyproductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {
  }
  serverErrorMessages: string;
  p: number = 1;
  ngOnInit() {
    this.getMyProducts();
  }
  onSubmit(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.productService.putProduct(form.value).subscribe(res => {
        this.resetForm(form);
        this.getMyProducts();
        this.toastr.success("Product updated Succesfully", "Success");
      });
    } else {
      this.productService.registerProduct(form.value).subscribe(
        res => {
          this.getMyProducts();
          this.resetForm(form);
          this.toastr.success(
            "Product register Succesfully",
            "Success"
          );
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }
  editProduct(product: Product) {
    console.log("editProduct");
    console.log(product);
    this.productService.selectedProduct = product;
  }
  deleteProduct(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.productService.deleteProduct(_id).subscribe(res => {
        this.getMyProducts();
        this.toastr.success('Product deleted Succesfully', 'Success');
      });
    }
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
