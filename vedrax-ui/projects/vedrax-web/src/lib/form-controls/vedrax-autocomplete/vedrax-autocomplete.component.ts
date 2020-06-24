import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { NVP } from '../../shared';

@Component({
  selector: 'vedrax-autocomplete',
  templateUrl: './vedrax-autocomplete.component.html',
  styleUrls: ['./vedrax-autocomplete.component.scss']
})
export class VedraxAutocompleteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;
  selected: NVP;
  search: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
    this.selected = this.descriptor.controlValue || { key: -1, value: this.descriptor.controlLabel };
  }

  openSearch(): void {
    this.search = true;
  }

  closeSearch(): void {
    this.search = false;
  }

  select(option: NVP): void {
    if (option) {
      this.search = false;
      this.selected = option;
      this.formControl.setValue(option.key);
    }
  }

  get formControl(): FormControl {
    return this.form.get(this.descriptor.controlName) as FormControl;
  }




}
