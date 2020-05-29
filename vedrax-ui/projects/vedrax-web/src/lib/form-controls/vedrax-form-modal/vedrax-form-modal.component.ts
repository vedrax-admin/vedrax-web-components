import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DateUtil } from '../../util/date-util';
import { VedraxFormComponent } from '../vedrax-form/vedrax-form.component';
import { SnackbarService } from '../../services/snackbar.service';
import { DescriptorForm } from '../../descriptor/descriptor-form';

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
    @Inject(MAT_DIALOG_DATA) public data: DescriptorForm,
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

    const formDescriptor: DescriptorForm = this.data;

    this.subscription.add(
      this.apiService.callEndpoint(formDescriptor, dto)
        .pipe(
          finalize(() => {
            this.formComponent.end();
          }))
        .subscribe(data => {
          if (data) {
            this.snackbarService.open(formDescriptor.successMessage || 'done');
            this.dialogRef.close(data);
          }
        }));

  }

  cancel(event: boolean) {
    if (event) {
      this.dialogRef.close();
    }
  }

}
