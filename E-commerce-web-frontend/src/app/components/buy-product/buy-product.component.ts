import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/model/order-details.model';
import { OrderQuantity } from 'src/app/model/order-quantity.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  orderDetails: OrderDetails = new OrderDetails();
  productDetails: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach((product) => {
      const orderQuantity = new OrderQuantity();
      orderQuantity.productId = product.productId;
      orderQuantity.quantity = 1;

      this.orderDetails.orderProductQuantityList.push(orderQuantity);
    });

    console.log(this.orderDetails);
    console.log(this.productDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (response) => {
        console.log(response);
        orderForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
