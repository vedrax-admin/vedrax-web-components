import { Component, OnInit, Input } from '@angular/core';
import { NVP } from '../../shared/nvp';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';

@Component({
  selector: 'vedrax-multiple',
  templateUrl: './vedrax-multiple.component.html',
  styleUrls: ['./vedrax-multiple.component.scss']
})
export class VedraxMultipleComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;
  selectable = true;
  removable = true;

  constructor() { }

  selections: NVP[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    const keys: any[] = this.formArray.value || [];
    console.log(`keys: ${keys}`);
    this.selections = keys.map(id => this.toNvp(id));
  }

  private toNvp(id: string | number): NVP {
    const options = this.descriptor.controlOptions || [];
    return options.find(item => item.key === id);
  }

  /**
   * Get declared array of controls
   */
  get formArray(): FormArray {
    return this.form.get(this.descriptor.controlName) as FormArray;
  }

  onChange(item) {

    const nvp:NVP = item.value;

    console.log(`NVP selected: ${nvp}`);

    const idx = this.find(nvp.key);

    console.log(`ARRAY ID: ${idx}`);

    if (idx === -1) {
      console.log('NVP added to selections')
      this.selections.push(nvp);
      this.formArray.push(new FormControl(nvp.key));
    }
  }

  remove(key: string | number) {
    const idx = this.find(key);

    if (idx !== -1) {
      this.selections.splice(idx, 1);
      this.formArray.removeAt(idx);
    }
  }

  private find(key: string | number): number {
    return this.selections.findIndex(selection => selection.key === key);
  }

}
