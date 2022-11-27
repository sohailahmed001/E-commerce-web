import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from 'src/app/model/file-handle.model';

export interface DilaogData {
  images: FileHandle[];
}

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css'],
})
export class ShowProductImagesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DilaogData) {}
}
