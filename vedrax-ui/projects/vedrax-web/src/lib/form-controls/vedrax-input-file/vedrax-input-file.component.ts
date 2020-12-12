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
    const reader = new FileReader();
    this.uploadFile = uploadedFile;

    reader.readAsDataURL(this.uploadFile.file);
    reader.onload = () => {
      this.form.get(this.descriptor.controlName).setValue(reader.result);
    };

  }

}
