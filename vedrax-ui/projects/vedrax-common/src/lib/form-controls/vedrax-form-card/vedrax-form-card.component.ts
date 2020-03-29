import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { FormService } from '../../services/form.service';
import { DescriptorForm } from '../../descriptor';
import { VedraxApiService } from '../../services/vedrax-api.service';


/**
 * Class that defines a form
 */
@Component({
  selector: 'vedrax-form-card',
  templateUrl: './vedrax-form-card.component.html',
  styleUrls: ['./vedrax-form-card.component.scss']
})
export class VedraxFormCardComponent implements OnInit, OnDestroy {

  @Input() descriptor: DescriptorForm;

  /**
  * State describing if form has been submitted
  */
  submitted: boolean = false;

  /**
   * The returned API error message if any
   */
  error: string;

  private subscription: Subscription = new Subscription();

  /**
   * The form object
   */
  formCard: FormGroup;

  constructor(
    private formService: FormService,
    private apiService: VedraxApiService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.descriptor) {
      this.formCard = this.formService.createFormGroup(this.descriptor.controls);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {
    if (this.formCard.valid) {
      this.submitted = true;
      this.subscription.add(
        this.apiService.callEndpoint(this.descriptor, dto)
          .pipe(
            catchError(err => this.handleError(err)),
            finalize(() => {
              this.submitted = false;
            }))
          .subscribe(data => {
            this.redirectToSuccessIfProvided();
          }));
    }
  }

  private handleError(err) {
    this.error = err.error && err.error.message;
    return throwError(err);
  }

  private redirectToSuccessIfProvided(): void {
    if (this.descriptor.successUrl) {
      this.router.navigate([this.descriptor.successUrl]);
    }
  }

  cancel() {
    this.location.back();
  }

}
