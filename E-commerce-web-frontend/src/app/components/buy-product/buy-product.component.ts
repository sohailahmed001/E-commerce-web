import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach((product) => {
      const orderQuantity = new OrderQuantity();
      orderQuantity.productId = product.productId;
      orderQuantity.quantity = 3;

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
        this.router.navigate(['/order-confirm']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrderQuantityObject(productId: number): OrderQuantity {
    return this.orderDetails.orderProductQuantityList.find(
      (orderQuantity) => orderQuantity.productId === productId
    );
  }

  getQtyForProduct(productId: number): number {
    const orderQuantity = this.getOrderQuantityObject(productId);

    return orderQuantity?.quantity ? orderQuantity.quantity : 1;
  }

  onQuantityChange(productId: number, quantity: number) {
    const orderQuantity = this.getOrderQuantityObject(productId);

    orderQuantity.quantity = quantity;
  }

  getCalculatedTotal(productId: number, price: number): number {
    const orderQuantity = this.getOrderQuantityObject(productId);

    return orderQuantity.quantity * price;
  }

  getCalculatedGrandTotalCost(): number {
    return this.orderDetails.orderProductQuantityList
      .map((orderQuantity) => {
        const product = this.productDetails.find(
          (product) => product.productId === orderQuantity.productId
        );

        return product.productDiscountedPrice * orderQuantity.quantity;
      })
      .reduce((totalCost, price) => (totalCost += price), 0);
  }
}
