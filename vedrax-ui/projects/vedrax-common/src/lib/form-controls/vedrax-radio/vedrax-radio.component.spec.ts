import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxRadioComponent } from './vedrax-radio.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';

const radioDescriptor: DescriptorFormControl = {
  controlName: 'brand',
  controlProperties: [],
  controlLabel: 'Brand',
  controlType: ControlType.radioButton,
  controlValidations: [],
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

describe('VedraxRadioComponent', () => {
  let component: VedraxRadioComponent;
  let fixture: ComponentFixture<VedraxRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ VedraxRadioComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxRadioComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = radioDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
