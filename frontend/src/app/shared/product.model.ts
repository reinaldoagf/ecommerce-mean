export class Product {
         constructor(
           _id = "",
           model = "",
           brand = "",
           price = 0,
           stock=0
         ) {
           this._id = _id;
           this.model = model;
           this.brand = brand;
           this.price = price;
           this.stock = stock;
         }
  _id: string;
         model: string;
         brand: string;
         price: number;
         stock: number;
       }
