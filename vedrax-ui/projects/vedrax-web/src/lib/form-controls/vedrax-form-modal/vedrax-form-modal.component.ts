import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorModal } from '../../descriptor/descriptor-modal';
import { DateUtil } from '../../util/date-util';
import { VedraxFormComponent } from '../vedrax-form/vedrax-form.component';
import { MsgLevel } from '../../enum/msg-level';
import { SnackbarService } from '../../services/snackbar.service';
import { ResponseWrapper } from '../../shared/response-wrapper';

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
    private snackbarService: SnackbarService,
    private apiService: VedraxApiService) { }

  ngOnInit() {
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {

    DateUtil.transformToISODate(dto);

    this.subscription.add(
      this.apiService.callEndpoint<ResponseWrapper>(this.data.formDescriptor, dto)
        .pipe(
          catchError(err => this.handleError(err)),
          finalize(() => {
            this.formComponent.end();
          }))
        .subscribe(data => {
          if (data) {
            this.snackbarService.open(data.status.message);
            this.dialogRef.close(data);
          }
        }));

  }

  private handleError(err) {
    const error = err.error && err.error.message;
    this.formComponent.setMsg(error, MsgLevel.error);
    return throwError(err);
  }

  cancel(event: boolean) {
    this.dialogRef.close();
  }

}
