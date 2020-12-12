import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { VedraxFile } from '../../util/vedrax-file';

const INVALID_TYPE = 'Fichier invalide';
const INVALID_SIZE = 'Taille de fichier invalide';

@Component({
  selector: 'vedrax-upload',
  templateUrl: './vedrax-upload.component.html',
  styleUrls: ['./vedrax-upload.component.css']
})
export class VedraxUploadComponent implements OnInit {

  @Input() descriptor: DescriptorFormControl;
  @Output() uploadedFile: EventEmitter<VedraxFile> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  uploadFiles(event) {

    if (event.target.files && event.target.files.length) {

      const file = (event.target as HTMLInputElement).files[0];

      const { type, name, size } = file;

      if (!this.isValidSize(size)) {
        this.uploadedFile.emit({ error: { name, errorMessage: INVALID_SIZE } });
      }

      if (!this.isValidType(this.descriptor.controlAccept, type)) {
        this.uploadedFile.emit({ error: { name, errorMessage: INVALID_TYPE } });
      }

      this.uploadedFile.emit({ file });
    }
  }

  private isValidType(allowedFileTypes: string[] = [], type: string): boolean {
    return allowedFileTypes.indexOf(type) > -1;
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte >= 5 && toKByte <= 5120;
  }

}
