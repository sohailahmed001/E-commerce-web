import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Edit Button',
    'Delete Button',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response) => {
        console.log(response);
        this.productDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        console.log(response);
        this.getAllProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
