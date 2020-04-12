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
    this.subscription.add(
      this.apiService.callEndpoint(this.descriptor, dto)
        .pipe(
          map(data => DateUtil.transformToISODate(data)),
          catchError(err => this.handleError(err)),
          finalize(() => {
            this.formComponent.end();
            this.formComponent.reset();
          }))
        .subscribe(data => {
          this.formComponent.setMsg('Success');
          this.redirectToSuccessIfProvided();
        }));
  }

  private handleError(err) {
    const error = err.error && err.error.message;
    this.formComponent.setMsg(error, MsgLevel.error);
    return throwError(err);
  }

  private redirectToSuccessIfProvided(): void {
    if (this.descriptor.successUrl) {
      //we delay the redirection for letting the user read the message
      setTimeout(() => {
        this.router.navigate([this.descriptor.successUrl]);
      }, 3000);//3s
    }
  }

  cancel(event: boolean) {
    if (event) {
      this.location.back();
    }
  }

}
