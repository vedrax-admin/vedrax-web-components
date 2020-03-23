import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxInputComponent } from './vedrax-input.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';

const inputDescriptor: DescriptorFormControl = {
  controlName: 'city',
  controlProperties: [{
    propertyName: 'type',
    propertyValue: 'text'
  }],
  controlLabel: 'City',
  controlType: ControlType.input,
  controlHint: 'Your city where you lives',
  controlValidations: [
    {
      validationName: 'required',
      validationValue: true,
      validationMessage: 'City is required'
    }
  ]
};

describe('VedraxInputComponent', () => {
  let component: VedraxInputComponent;
  let fixture: ComponentFixture<VedraxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = inputDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hasProperty('type')).toBeTruthy();
  });
});
