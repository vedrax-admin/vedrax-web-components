import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DescriptorValidation } from '../../descriptor/descriptor-validation';

/**
 * Class that defines a component validation
 */
@Component({
  selector: 'vedrax-validation',
  templateUrl: './vedrax-validation.component.html'
})
export class VedraxValidationComponent {

  @Input() control: FormControl;
  @Input() validations: DescriptorValidation[] = [];

}
