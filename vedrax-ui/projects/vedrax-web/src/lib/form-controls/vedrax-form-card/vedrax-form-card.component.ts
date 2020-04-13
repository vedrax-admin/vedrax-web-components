import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DateUtil } from '../../util/date-util';
import { VedraxFormComponent } from '../vedrax-form/vedrax-form.component';
import { DescriptorForm } from '../../descriptor/descriptor-form';
import { MsgLevel } from '../../enum/msg-level';
import { ResponseWrapper } from '../../shared/response-wrapper';
import { SnackbarService } from '../../services/snackbar.service';


/**
 * Class that defines a form
 */
@Component({
  selector: 'vedrax-form-card',
  templateUrl: './vedrax-form-card.component.html',
  styleUrls: ['./vedrax-form-card.component.scss']
})
export class VedraxFormCardComponent implements OnInit, OnDestroy {

  /**
   * The form descriptor
   */
  @Input() descriptor: DescriptorForm;

  /**
   * Provide optionnaly a card title
   */
  @Input() title?: string;

  /**
   * The form component
   */
  @ViewChild(VedraxFormComponent) formComponent: VedraxFormComponent;

  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: VedraxApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
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

    DateUtil.transformToISODate(dto);

    this.subscription.add(
      this.apiService.callEndpoint(this.descriptor, dto)
        .pipe(
          finalize(() => {
            this.formComponent.end();
          }))
        .subscribe(data => {
          if (data) {
            this.snackbarService.open('Success');
            this.redirectToSuccessIfProvided();
          }
        }));
  }

  private redirectToSuccessIfProvided(): void {
    if (this.descriptor.successUrl) {
      this.router.navigate([this.descriptor.successUrl]);
    }
  }

  cancel(event: boolean) {
    if (event) {
      this.location.back();
    }
  }

}
