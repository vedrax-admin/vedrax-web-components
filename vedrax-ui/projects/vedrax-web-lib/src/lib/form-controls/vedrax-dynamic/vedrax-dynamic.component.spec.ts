import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { VedraxDynamicComponent } from './vedrax-dynamic.component';
import { ControlType } from '../../enum/control-types';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { FormService } from '../../services/form.service';

const dynamicDescriptor: DescriptorFormControl = {
  controlName: 'services',
  controlProperties: [],
  controlLabel: 'Services',
  controlType: ControlType.arrayOfControls,
  controlChildren: [
      {
          controlName: 'code',
          controlProperties: [{
              propertyName: 'type',
              propertyValue: 'text'
          }],
          controlLabel: 'Code',
          controlType: ControlType.input,
          controlValidations: [
              {
                  validationName: 'required',
                  validationValue: true,
                  validationMessage: 'Code is required'
              }
          ]
      },
      {
          controlName: 'value',
          controlProperties: [{
              propertyName: 'type',
              propertyValue: 'text'
          }],
          controlLabel: 'Value',
          controlType: ControlType.input,
          controlValidations: [
              {
                  validationName: 'required',
                  validationValue: true,
                  validationMessage: 'Value is required'
              }
          ]
      }
  ]
};

describe('VedraxDynamicComponent', () => {
  let component: VedraxDynamicComponent;
  let fixture: ComponentFixture<VedraxDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxDynamicComponent],
      providers: [
        FormService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxDynamicComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      services: new FormArray([])
    });
    component.descriptor = dynamicDescriptor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get form array', () => {
    expect(component.formArray).toBeDefined();
  });

  it('check when add control', () => {

    const button = getAddButton();
    button.click();

    fixture.detectChanges();

    expect(component.formArray.length).toBe(1);

    //remove added object

    const removeButtons = getRemoveButtons();
    expect(removeButtons.length).toBe(1);

    const removeButton = removeButtons[0].nativeElement;
    removeButton.click();

    expect(component.formArray.length).toBe(0);

  });


  function getAddButton() {
    return fixture.debugElement.query(By.css(".add-param")).nativeElement;
  }

  function getRemoveButtons() {
    return fixture.debugElement.queryAll(By.css(".remove-param"));
  }
});
