import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VedraxControlComponent } from './vedrax-control.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';

const inputDescriptor: DescriptorFormControl = {
  controlName: 'city',
  controlProperties: [],
  controlLabel: 'City',
  controlType: ControlType.input,
  controlValidations: []
};

const datepickerDescriptor: DescriptorFormControl = {
  controlName: 'birthdate',
  controlProperties: [],
  controlLabel: 'Birth date',
  controlType: ControlType.datepicker,
  controlValidations: []
};

describe('VedraxControlComponent', () => {
  let component: VedraxControlComponent;
  let fixture: ComponentFixture<VedraxControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxControlComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxControlComponent);
    component = fixture.componentInstance;
    //init component
    component.control = new FormControl({});
    component.descriptor = inputDescriptor;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an input component', () => {

    assertComponent('vedrax-input');

  });

  it('should create a datepicker component', () => {

    component.descriptor = datepickerDescriptor;

    assertComponent('vedrax-datepicker');

  });

  function assertComponent(tag: string) {

    fixture.detectChanges();
    const component = fixture.debugElement.query(By.css(tag)).nativeElement;

    expect(component).toBeDefined();
  }

});
