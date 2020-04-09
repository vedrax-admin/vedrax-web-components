import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DescriptorForm } from '../../descriptor/descriptor-form';
import { FormService } from '../../services/form.service';
import { Msg } from '../../shared';
import { MsgLevel } from '../../enum';
import { Validate } from '../../util';

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
  * 
  * The returned API message if any
  */
  msg: Msg;

  /**
   * The message style class
   */
  msgStyleClass: string;

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
  formCard: FormGroup;

  constructor(private formService: FormService) { }

  ngOnInit() {
    if (this.descriptor) {
      this.formCard = this.formService.createFormGroup(this.descriptor.controls);
    }
  }

  /**
   * Emit an event with data when the form is valid
   * 
   * @param dto 
   */
  submit(dto: any) {
    if (this.formCard.valid) {
      this.submitted = true;
      this.onSubmit.emit(dto);
    }
  }

  /**
   * Emit an event on cancel
   */
  cancel() {
    this.onCancel.emit(true);
  }

  /**
   * reset form
   */
  reset(): void {
    this.formCard.reset();
  }

  /**
   * set submitted to false
   */
  end(): void {
    this.submitted = false;
  }

  /**
   * set msg
   * @param msg 
   */
  setMsg(message: string, level: MsgLevel = MsgLevel.info) {
    Validate.isNotNull(message, 'message must be provided');

    const alert = new Msg();
    alert.message = message;
    alert.level = level;
    this.msg = alert;
    this.msgStyleClass = `alert alert-${alert.level}`;
  }

}
