import { FileHandle } from './file-handle.model';

export class Product {
  productName: string;
  productDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandle[];
}
