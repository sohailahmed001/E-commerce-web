import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolveService implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const isSingleProductCheckout: boolean =
      route.params['isSingleProductCheckout'];
    const productId: number = route.params['productId'];

    return this.productService
      .getProductDetails(isSingleProductCheckout, productId)
      .pipe(
        map((data, i) =>
          data.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
