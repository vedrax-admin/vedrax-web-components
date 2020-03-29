import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxCheckboxComponent } from './vedrax-checkbox.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';

const checkboxDescriptor: DescriptorFormControl = {
  controlName: 'men',
  controlProperties: [],
  controlLabel: 'Are you a men ?',
  controlType: ControlType.checkbox,
};

describe('VedraxCheckboxComponent', () => {
  let component: VedraxCheckboxComponent;
  let fixture: ComponentFixture<VedraxCheckboxComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxCheckboxComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxCheckboxComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = checkboxDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
