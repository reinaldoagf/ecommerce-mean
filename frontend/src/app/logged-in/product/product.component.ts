import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ProductService } from "../../shared/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) {}
  serverErrorMessages: string;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.productService.registerProduct(form.value).subscribe(
      res => {
        console.log(res)
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
