import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { DescriptorForm } from '../../descriptor/descriptor-form';
import { ControlsPerGroup } from '../../shared';

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
   * Controls per group list
   */
  controlsPerGroups: ControlsPerGroup[] = [];

  /**
   * The form object
   */
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    const groups = this.descriptor.groups || [];

    groups.forEach(group => {
      let controlsPerGroup: ControlsPerGroup = new ControlsPerGroup();
      controlsPerGroup.name = group.name;

      let ids = group.ids || [];
      ids.forEach(id => this.initControl(id, controlsPerGroup.controls));
      this.controlsPerGroups.push(controlsPerGroup);
    });

  }

  initControl(controlId: string, controls: DescriptorFormControl[]): void {
    const descriptor: DescriptorFormControl = this.descriptor.controls.find(control => control.controlName === controlId);
    if (descriptor) {
      controls.push(descriptor);
    }
  }

}
