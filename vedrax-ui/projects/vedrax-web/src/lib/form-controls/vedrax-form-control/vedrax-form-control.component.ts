import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { DescriptorOption } from '../../descriptor/descriptor-option';

/**
 * Class that defines a form control component according to the control type
 */
@Component({
  selector: 'vedrax-form-control',
  templateUrl: './vedrax-form-control.component.html'
})
export class VedraxFormControlComponent {

  @Input() form : FormGroup;
  @Input() descriptor : DescriptorFormControl;
  @Input() lovs?: Map<string, Array<DescriptorOption>>;

}
