import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { NVP } from '../../shared';
import { Validate } from '../../util';

@Component({
  selector: 'vedrax-autocomplete',
  templateUrl: './vedrax-autocomplete.component.html'
})
export class VedraxAutocompleteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;
  selected: NVP;
  search: boolean = false;
  endpoint: string;
  params: NVP[] = [];
  filters: NVP[];


  constructor() {
  }

  ngOnInit(): void {
    Validate.isNotNull(this.descriptor.controlSearch, "search must be provided in descriptor");

    const controlSearchDescriptor = this.descriptor.controlSearch;

    this.endpoint = controlSearchDescriptor.endpoint;
    this.params = controlSearchDescriptor.defaultParams;
    this.filters = controlSearchDescriptor.filters;
    this.selected = this.descriptor.controlValue || { key: -1, value: '' };
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
