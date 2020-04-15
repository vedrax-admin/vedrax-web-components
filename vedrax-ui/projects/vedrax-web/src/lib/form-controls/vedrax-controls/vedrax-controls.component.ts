import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { DescriptorForm } from '../../descriptor/descriptor-form';
import { ControlsPerGroup } from '../../shared/controlsPerGroup';

@Component({
  selector: 'vedrax-controls',
  templateUrl: './vedrax-controls.component.html',
  styleUrls: ['./vedrax-controls.component.scss']
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

    if (this.descriptor.groups) {

      const groups = this.descriptor.groups;

      this.controlsPerGroups = [];

      groups.forEach(group => {
        let controlsPerGroup: ControlsPerGroup = new ControlsPerGroup();
        controlsPerGroup.name = group.name;

        const ids = group.ids || [];
        controlsPerGroup.controls = ids.map(id => this.getControl(id))

        this.controlsPerGroups.push(controlsPerGroup);
      });

    }

  }

  private getControl(controlId: string): DescriptorFormControl {
    return this.descriptor.controls.find(control => control.controlName === controlId);
  }

}
