import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxDatepickerComponent } from './vedrax-datepicker.component';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';
import { ControlType } from '../enum/control-types';

const datepickerDescriptor: DescriptorFormControl = {
  controlName: 'birthdate',
  controlProperties: [],
  controlLabel: 'Birth date',
  controlType: ControlType.datepicker,
  controlValidations: [
      {
          validationName: 'required',
          validationValue: true,
          validationMessage: 'Birth date is required'
      }
  ]
};

describe('VedraxDatepickerComponent', () => {
  let component: VedraxDatepickerComponent;
  let fixture: ComponentFixture<VedraxDatepickerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ VedraxDatepickerComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxDatepickerComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = datepickerDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
