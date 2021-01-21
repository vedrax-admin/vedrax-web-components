import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Subscription } from 'rxjs';
import { VedraxBaseComponent } from '../../shared/vedrax-base.component';

@Component({
  selector: 'vedrax-input-number',
  templateUrl: './vedrax-input-number.component.html'
})
export class VedraxInputNumberComponent extends VedraxBaseComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  @Input() form : FormGroup;

  @Input() matrixIndex : number;

  @Input() entriesIndex : number;

  @Input() label: string;

  constructor(private decimalPipe: DecimalPipe) { 
    super();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.control.valueChanges.subscribe(value => {
        const matrix = <FormArray> this.form.get('matrix');

        const matrixElement = <FormArray> matrix.at(this.matrixIndex);

        const entries = <FormArray> matrixElement.get('entries');

        const entry = entries.at(this.entriesIndex);

        const valueFormatted = this.decimalPipe.transform(value, '1.1-5');

        entry.get('value').setValue(valueFormatted, { onlySelf: true, emitEvent: false });

      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
