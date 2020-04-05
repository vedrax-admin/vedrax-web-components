import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { FormService } from '../../services/form.service';
import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorModal } from '../../descriptor/descriptor-modal';
import { DateUtil } from '../../util/date-util';

@Component({
  selector: 'vedrax-form-modal',
  templateUrl: './vedrax-form-modal.component.html',
  styleUrls: ['./vedrax-form-modal.component.scss']
})
export class VedraxFormModalComponent implements OnInit {

  /**
   * The form object
   */
  formModal: FormGroup;

  /**
   * The returned API error message if any
   */
  error: string;

  /**
   * State describing if form has been submitted
   */
  submitted: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DescriptorModal,
    public dialogRef: MatDialogRef<VedraxFormModalComponent>,
    private formService: FormService,
    private apiService: VedraxApiService) { }

  ngOnInit() {
    if (this.data.formDescriptor) {
      this.formModal = this.formService.createFormGroup(this.data.formDescriptor.controls);
    }
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {
    if (this.formModal.valid) {
      this.submitted = true;
      this.subscription.add(
        this.apiService.callEndpoint(this.data.formDescriptor, dto)
          .pipe(
            map(data => DateUtil.transformToISODate(data)),
            catchError(err => this.handleError(err)),
            finalize(() => {
              this.submitted = false;
            }))
          .subscribe(data => {
            this.dialogRef.close(data);
          }));
    }
  }

  private handleError(err) {
    this.error = err.error && err.error.message;
    return throwError(err);
  }

  cancel() {
    this.dialogRef.close();
  }

}
