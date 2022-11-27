import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'discounted-price',
    'actual-price',
    'images',
    'actions',
  ];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
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
        this.getAllProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    this.dialog.open(ShowProductImagesDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
        images: product.productImages,
      },
    });
  }

  editProductDetails(productId: number) {
    this.router.navigate(['add-new-product', { productId: productId }]);
  }
}
