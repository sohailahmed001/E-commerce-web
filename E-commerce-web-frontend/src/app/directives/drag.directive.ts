import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handle.model';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @HostBinding('style.background') private background = '#eee';
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    let fileHandle = new FileHandle();
    const file = evt.dataTransfer.files[0];

    fileHandle.file = file;
    fileHandle.url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );

    this.files.emit(fileHandle);
  }
}
