import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';

@Component({
  selector: 'app-vedrax-nvp',
  templateUrl: './vedrax-nvp.component.html',
  styleUrls: ['./vedrax-nvp.component.scss']
})
export class VedraxNvpComponent {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;

  constructor() { }

  /**
   * Get declared array of controls
   */
  get formArray(): FormArray {
    return this.form.get(this.descriptor.controlName) as FormArray;
  }

}
