import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  product: Product = new Product();
  saveButtonStr: string = 'Add Product';

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.saveButtonStr =
      this.product && this.product.productId ? 'Update Product' : 'Add Product';
  }

  addProduct(productForm: NgForm) {
    console.log(this.product);
    this.productService
      .addProduct(this.prepareFormData(this.product))
      .subscribe(
        (response) => {
          console.log(response);
          this.product = new Product();
          productForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onClearClick(productForm: NgForm) {
    productForm.reset();
  }

  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle = new FileHandle();

      fileHandle.file = file;
      fileHandle.url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );

      this.onfileDrop(fileHandle);
    }
  }

  onRemoveImageClick(i: number) {
    this.product.productImages.splice(i, 1);
  }

  onfileDrop(fileHandle: FileHandle) {
    if (this.product.productImages) {
      this.product.productImages.push(fileHandle);
    } else {
      this.product.productImages = [fileHandle];
    }
  }
}
