import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handle.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ImageProcessingService {
  constructor(private sanitizer: DomSanitizer) {}

  createImages(product: Product): Product {
    const productImages: any[] = product.productImages || [];
    const imagefileHandles: FileHandle[] = [];

    productImages.forEach((imageData) => {
      const imageFileHandle = new FileHandle();
      const imageBlob = this.dataURItoBlob(imageData.picBytes, imageData.type);
      const imageFile = new File([imageBlob], imageData.name, {
        type: imageData.type,
      });
      const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(imageFile)
      );

      imageFileHandle.file = imageFile;
      imageFileHandle.url = imageUrl;

      imagefileHandles.push(imageFileHandle);
    });

    product.productImages = imagefileHandles;

    return product;
  }

  dataURItoBlob(picBytes, imageType) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Int8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {
      type: imageType,
    });
  }
}
