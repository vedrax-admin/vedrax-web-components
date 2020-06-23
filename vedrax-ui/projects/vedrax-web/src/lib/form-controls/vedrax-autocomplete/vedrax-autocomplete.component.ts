import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { VedraxAutocompleteDataSource } from './vedrax-autocomplete.datasource';
import { VedraxApiService } from '../../services/vedrax-api.service';

@Component({
  selector: 'vedrax-autocomplete',
  templateUrl: './vedrax-autocomplete.component.html',
  styleUrls: ['./vedrax-autocomplete.component.scss']
})
export class VedraxAutocompleteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;
  selected: any;
  label: string;
  search: boolean = false;

  @Output() closed = new EventEmitter();

  datasource: VedraxAutocompleteDataSource;

  searchControl = new FormControl();

  visibleOptions = 4;

  constructor(private apiService: VedraxApiService) {}

  ngOnInit(): void {

    this.datasource = new VedraxAutocompleteDataSource(this.apiService, this.descriptor.controlSearchUrl)

    this.selected = this.descriptor.controlValue || { key: -1, value: this.descriptor.controlLabel };

  }

  performSearch(): void {
    this.search = true;
    this.searchControl.setValue('');
  }

  query(): void {
    const text = this.searchControl.value;
    if (text) {
      this.datasource.search(text);
    }
  }

  select(option): void {

    if (option) {
      this.search = false;
      this.selected = option;
      this.formControl.setValue(option['key']);
    }

  }

  get formControl(): FormControl {
    return this.form.get(this.descriptor.controlName) as FormControl;
  }

}
