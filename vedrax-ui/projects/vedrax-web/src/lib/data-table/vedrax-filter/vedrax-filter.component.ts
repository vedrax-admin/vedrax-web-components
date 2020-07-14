import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { DescriptorSearch } from '../../descriptor/descriptor-search';
import { FormDescriptorService } from '../../services/form-descriptor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vedrax-filter',
  templateUrl: './vedrax-filter.component.html'
})
export class VedraxFilterComponent implements OnInit, OnDestroy {

  /**
   * The list of filter controls
   */
  @Input() search: DescriptorSearch;

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

  /**
  * The list of subscription
  */
  private subscription: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private formDescriptorService: FormDescriptorService
  ) { }

  ngOnInit() {
    if (this.search) {
      this.formSearch = this.formService.createFormGroup(this.search.controls);
      this.subscription.add(this.formDescriptorService.initLov(this.search.controls, this.search.lovs).subscribe());
    }
  }

  /**
  * Used for unsubscribing on destroy
  */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any): void {
    if (this.formSearch.valid) {
      this.submitted = true;
      this.onSubmit.emit(dto);
    }
  }

  reset(): void {
    this.formSearch.reset();
  }

}
