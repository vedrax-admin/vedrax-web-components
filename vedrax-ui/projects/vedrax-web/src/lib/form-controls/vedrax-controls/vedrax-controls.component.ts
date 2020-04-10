import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { DescriptorForm } from '../../descriptor/descriptor-form';

@Component({
  selector: 'vedrax-controls',
  templateUrl: './vedrax-controls.component.html'
})
export class VedraxControlsComponent implements OnInit {

  /**
   * The form controls
   */
  @Input() descriptor: DescriptorForm;

  /**
   * The form object
   */
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getControlDescriptor(controlId: string): DescriptorFormControl {
    console.log(controlId);
    return this.descriptor.controls.find(control => control.controlName === controlId );
  }

}
