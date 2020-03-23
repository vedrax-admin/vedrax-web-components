import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { FormService } from '../../services/form.service';

/**
 * Class that defines a dynamic component
 */
@Component({
  selector: 'vedrax-dynamic',
  templateUrl: './vedrax-dynamic.component.html',
  styleUrls: ['./vedrax-dynamic.component.scss']
})
export class VedraxDynamicComponent {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;

  constructor(private formService: FormService) {}

  /**
   * Get declared array of controls
   */
  get formArray(): FormArray {
    return this.form.get(this.descriptor.controlName) as FormArray;
  }

  /**
   * Remove a control by index from the array
   * 
   * @param index the index of the control
   */
  remove(index: number): void {
    this.formArray.removeAt(index);
  }

  /**
   * Add a control to the array
   */
  add(): void {
    const formGroup: FormGroup = this.formService.createFormGroup(this.descriptor.controlChildren);
    this.formArray.push(formGroup);
  }

}
