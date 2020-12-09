import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { from, Observable, Observer, of } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';
import { VedraxFile } from '../../util/vedrax-file';

const INVALID_FILE = 'Fichier invalide';
const INVALID_SIZE = 'Taille de fichier invalide';

@Component({
  selector: 'vedrax-upload',
  templateUrl: './vedrax-upload.component.html',
  styleUrls: ['./vedrax-upload.component.css']
})
export class VedraxUploadComponent implements OnInit {

  @Output() uploadedFiles: EventEmitter<VedraxFile> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  uploadFiles(event) {
    if (event) {
      const files = event.target?.files;
      const nbOfFiles = files.length;
      from(files)
        .pipe(
          concatMap((file: File) => this.validateFile(file).pipe(catchError((error: VedraxFile) => of(error)))),
          take(nbOfFiles)
        )
        .subscribe((validatedFile: VedraxFile) => {
          this.uploadedFiles.emit(validatedFile);
        })
    }
  }

  private validateFile(file: File): Observable<VedraxFile> {
    const fileReader: FileReader = new FileReader();
    return new Observable((observer: Observer<VedraxFile>) => {
      this.validateSize(file, observer);
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        observer.next({ file });
        observer.complete();
      };
      fileReader.onerror = () => {
        const { name } = file;
        observer.error({ error: { name, errorMessage: INVALID_FILE } });
      };
    });
  }

  private validateSize(file: File, observer: Observer<VedraxFile>): void {
    const { name, size } = file;
    if (!this.isValidSize(size)) {
      observer.error({ error: { name, errorMessage: INVALID_SIZE } });
    }
  }

  private isValidSize(size: number): boolean {
    const toKByte = size / 1024;
    return toKByte >= 5 && toKByte <= 5120;
  }

}
