import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxSelectComponent } from './vedrax-select.component';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';
import { ControlType } from '../enum/control-types';

const selectDescriptor: DescriptorFormControl = {
  controlName: 'brand',
  controlProperties: [],
  controlLabel: 'Brand',
  controlType: ControlType.select,
  controlValidations: [
      {
          validationName: 'required',
          validationValue: true,
          validationMessage: 'Brand is required'
      }
  ],
  controlOptions: [
      {
          key: 1,
          value: 'HP'
      },
      {
          key: 2,
          value: 'Sony'
      }
  ]
};

describe('VedraxSelectComponent', () => {
  let component: VedraxSelectComponent;
  let fixture: ComponentFixture<VedraxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxSelectComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxSelectComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = selectDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
