import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxValidationComponent } from './vedrax-validation.component';

import { DescriptorValidation } from '../../descriptor/descriptor-validation';

describe('VedraxValidationComponent', () => {
  let component: VedraxValidationComponent;
  let fixture: ComponentFixture<VedraxValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxValidationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxValidationComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(null, [Validators.required]);
    const validations: DescriptorValidation[] = [
      {
        validationName: 'required',
        validationValue: true,
        validationMessage: 'Test is required'
      }
    ];
    component.validations = validations;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.control.invalid).toBe(true);
  });

});
