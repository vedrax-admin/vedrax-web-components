import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DescriptorForm } from '../../descriptor/descriptor-form';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'vedrax-form',
  templateUrl: './vedrax-form.component.html',
  styleUrls: ['./vedrax-form.component.scss']
})
export class VedraxFormComponent implements OnInit {

  /**
   * The descriptor form
   */
  @Input() descriptor: DescriptorForm;

  @Input() submitLabel?: string = 'Submit';

  @Input() cancelLabel?: string = 'Cancel';

  @Input() enableCancel?: boolean = true;

  /**
  * State describing if form has been submitted
  */
  submitted: boolean = false;

  /**
   * On submit event
   */
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  /**
   * On cancel event
   */
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

  /**
   * The form object
   */
  form: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    if (this.descriptor) {
      this.form = this.formService.createFormGroup(this.descriptor.controls);
    }
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any): void {
    if (this.form.valid) {
      this.submitted = true;
      this.onSubmit.emit(dto);
    }
  }

  /**
   * Emit an event on cancel
   */
  cancel(): void {
    this.onCancel.emit(true);
  }

  /**
   * reset form
   */
  reset(): void {

    this.form.reset();

    //hack for removing validation error when resetting
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }

  /**
   * set submitted to false
   */
  end(): void {
    this.submitted = false;
  }

}
