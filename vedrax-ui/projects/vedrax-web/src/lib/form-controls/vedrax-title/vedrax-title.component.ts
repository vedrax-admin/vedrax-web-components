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

    let elements: any[] = [];

    keys.forEach(key => {
      const ctrl = this.getControlFromKey(key);
      if (ctrl.controlType === ControlType.select) {
        this.addToElements(elements, this.getOption(ctrl, this.getValue(key)));
      } else {
        this.addToElements(elements, this.getValue(key));
      }
    });

    this.title = elements.length ? elements.join(' ') : '...';
  }

  private addToElements(elements: any[], value: string): void {
    if (value) {
      elements.push(value);
    }
  }

  private getControlFromKey(key: string): DescriptorFormControl {
    const children = this.descriptor.controlChildren || [];
    return children.find(child => child.controlName === key);
  }

  private getOption(ctrl: DescriptorFormControl, key: string | number): string {
    const options = ctrl.controlOptions || [];
    const option = options.find(option => option.key === key);
    return option ? option.value : undefined;
  }

  private getValue(key: string): string {
    const values = this.descriptor.controlValue || [];
    return values.length ? values[this.index][key] : undefined;
  }

}
