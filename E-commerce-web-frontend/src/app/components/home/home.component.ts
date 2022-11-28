import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAllProducts()
      .pipe(
        map((data: Product[], i) =>
          data.map((product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.products = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onViewProductClick(productId: number) {
    this.router.navigate(['/product-view-details', { productId: productId }]);
  }
}
