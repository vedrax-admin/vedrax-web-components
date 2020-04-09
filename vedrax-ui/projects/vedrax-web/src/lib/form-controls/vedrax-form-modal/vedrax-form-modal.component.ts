import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorModal } from '../../descriptor/descriptor-modal';
import { DateUtil } from '../../util/date-util';
import { VedraxFormComponent } from '../vedrax-form/vedrax-form.component';
import { MsgLevel } from '../../enum/msg-level';

@Component({
  selector: 'vedrax-form-modal',
  templateUrl: './vedrax-form-modal.component.html',
  styleUrls: ['./vedrax-form-modal.component.scss']
})
export class VedraxFormModalComponent implements OnInit {

  /**
   * The form component
   */
  @ViewChild(VedraxFormComponent) formComponent: VedraxFormComponent;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DescriptorModal,
    public dialogRef: MatDialogRef<VedraxFormModalComponent>,
    private apiService: VedraxApiService) { }

  ngOnInit() {
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {

    this.subscription.add(
      this.apiService.callEndpoint(this.data.formDescriptor, dto)
        .pipe(
          map(data => DateUtil.transformToISODate(data)),
          catchError(err => this.handleError(err)),
          finalize(() => {
            this.formComponent.end();
            this.formComponent.reset();
          }))
        .subscribe(data => {
          this.formComponent.setMsg('Success');
          this.close(data);
        }));

  }

  private handleError(err) {
    const error = err.error && err.error.message;
    this.formComponent.setMsg(error, MsgLevel.error);
    return throwError(err);
  }

  private close(data: any) {
    //we delay the closing of the modal for letting the user read the message
    setTimeout(() => {
      this.dialogRef.close(data);
    }, 3000);
  }

  cancel(event: boolean) {
    this.dialogRef.close();
  }

}
