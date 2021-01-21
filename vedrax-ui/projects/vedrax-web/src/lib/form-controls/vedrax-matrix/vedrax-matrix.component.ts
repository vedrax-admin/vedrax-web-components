import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vedrax-matrix',
  templateUrl: './vedrax-matrix.component.html',
  styleUrls: ['./vedrax-matrix.component.scss']
})
export class VedraxMatrixComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;

  private subscription: Subscription = new Subscription();

  constructor(
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {

    this.subscription.add(
      this.form.get(this.descriptor.controlName).valueChanges.subscribe(items => this.formatValue(items))
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private formatValue(items: any) {
    // get our items group control
    const control = this.formArray;

    for (let i in items) {
      let value = items[i].value;
      // now format the value with angular decimal pipe
      let valueFormatted = this.decimalPipe.transform(value, '1.1-5');
      // format field and do not emit event
      control.at(+i).get('value').setValue(valueFormatted, { onlySelf: true, emitEvent: false });
    }
  }

  /**
   * Get declared array of controls
   */
  get formArray(): FormArray {
    return this.form.get(this.descriptor.controlName) as FormArray;
  }



}
