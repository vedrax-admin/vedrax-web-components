import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { VedraxFile } from '../../util/vedrax-file';

@Component({
  selector: 'vedrax-input-file',
  templateUrl: './vedrax-input-file.component.html',
  styleUrls: ['./vedrax-input-file.component.css']
})
export class VedraxInputFileComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;

  removable = true;

  constructor() { }

  uploadFile: VedraxFile;

  ngOnInit(): void {
  }

  handleUploadedFile(uploadedFile: VedraxFile) {
    this.uploadFile = uploadedFile;

    if (this.uploadFile && this.uploadFile.file) {
      this.form.get(this.descriptor.controlName).setValue(this.uploadFile.file);
    }
  }

}
