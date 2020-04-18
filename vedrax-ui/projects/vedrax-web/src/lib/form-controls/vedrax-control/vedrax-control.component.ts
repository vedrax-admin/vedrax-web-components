import { Component, Input } from '@angular/core';
import { VedraxBaseComponent } from '../../shared/vedrax-base.component';
import { DescriptorOption } from '../../descriptor/descriptor-option';

/**
 * Class that defines a generic component according to the control type
 */
@Component({
  selector: 'vedrax-control',
  templateUrl: './vedrax-control.component.html'
})
export class VedraxControlComponent extends VedraxBaseComponent {

  @Input() lovs?: Map<string, Array<DescriptorOption>>;
  
}
