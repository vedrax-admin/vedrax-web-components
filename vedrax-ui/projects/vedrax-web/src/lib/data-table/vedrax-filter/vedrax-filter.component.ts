import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';

@Component({
  selector: 'vedrax-filter',
  templateUrl: './vedrax-filter.component.html'
})
export class VedraxFilterComponent implements OnInit {

  /**
   * The list of filter controls
   */
  @Input() descriptors: DescriptorFormControl[] = [];

  /**
   * Status of the request
   */
  @Input() submitted: boolean = false;

  /**
   * Emit event with data when submitting the form
   */
  @Output() onSubmit = new EventEmitter<any>();

  /**
   * The form object
   */
  formSearch: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formSearch = this.formService.createFormGroup(this.descriptors);
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {
    if (this.formSearch.valid) {
      this.onSubmit.emit(dto);
    }
  }

}
