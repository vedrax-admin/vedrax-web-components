import { Component, OnInit, Input } from '@angular/core';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';

@Component({
  selector: 'vedrax-title',
  template: '{{title}}'
})
export class VedraxTitleComponent implements OnInit {

  @Input() descriptor: DescriptorFormControl;
  @Input() index: number = 0;

  title: string = '';

  constructor() { }

  ngOnInit(): void {
    this.constructTitle();
  }

  private constructTitle(): void {
    const keys = this.descriptor.controlKeysAsTitle || [];

    keys.forEach(key => {
      const ctrl = this.getControlFromKey(key);
      if (ctrl.controlType === ControlType.select) {
        this.title = `${this.title} ${this.getOption(ctrl, this.getValue(key))}`;
      } else {
        this.title = `${this.title} ${this.getValue(key)}`;
      }
    });

    this.title = this.whenEmptyTitle(this.title);
  }

  private whenEmptyTitle(value: string) {
    return value ? value : '...';
  }

  private getControlFromKey(key: string): DescriptorFormControl {
    const children = this.descriptor.controlChildren || [];
    return children.find(child => child.controlName === key);
  }

  private getOption(ctrl: DescriptorFormControl, key: string | number): string {
    const options = ctrl.controlOptions || [];
    const option = options.find(option => option.key === key);
    return option ? option.value : '';
  }

  private getValue(key: string): any {
    const values = this.descriptor.controlValue || [];
    return values.length ? values[this.index][key] : '';
  }

}
