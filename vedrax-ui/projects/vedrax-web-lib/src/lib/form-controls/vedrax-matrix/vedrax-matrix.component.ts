import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';

@Component({
  selector: 'vedrax-matrix',
  templateUrl: './vedrax-matrix.component.html',
  styleUrls: ['./vedrax-matrix.component.scss']
})
export class VedraxMatrixComponent {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;

  /**
   * Get declared array of controls
   */
  get formArray(): FormArray {
    return this.form.get(this.descriptor.controlName) as FormArray;
  }

}
