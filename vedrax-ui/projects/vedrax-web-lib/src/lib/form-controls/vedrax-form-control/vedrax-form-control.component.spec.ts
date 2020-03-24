import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VedraxFormControlComponent } from './vedrax-form-control.component';
import { DescriptorFormControl } from '../../descriptor';
import { ControlType } from '../../enum/control-types';

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

const searchDescriptor: DescriptorFormControl = {
  controlName: 'productId',
  controlProperties: [],
  controlLabel: 'Product',
  controlType: ControlType.search,
  controlValue: 1,
  controlDisplayKey: 'productType',
  controlDisplayValue: 'PZ45',
  controlValidations: [
      {
          validationName: 'required',
          validationValue: true,
          validationMessage: 'Product is required'
      }
  ],
  controlSearch: {
      path: '/api/source-products',
      title:'title',
      searchControls: [{
          controlName: 'productType',
          controlProperties: [],
          controlLabel: 'Product Type',
          controlType: ControlType.input
      }],
      columns: [
          {
              id: 'id',
              label: 'ID'
          },
          {
              id: 'brandName',
              label: 'Brand'
          }
      ]
  }
};

describe('VedraxControlCustomComponent', () => {
  let component: VedraxFormControlComponent;
  let fixture: ComponentFixture<VedraxFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxFormControlComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFormControlComponent);
    component = fixture.componentInstance;
    component.descriptor = dynamicDescriptor;
    component.form = new FormGroup({
      productId: new FormControl(),
      services: new FormArray([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    assertComponent('vedrax-dynamic');
  });

  it('should create search component', () => {
    component.descriptor = searchDescriptor;
    fixture.detectChanges();
    
    assertComponent('vedrax-search');

  });

  function assertComponent(tag: string) {
    
    const component = fixture.debugElement.query(By.css(tag)).nativeElement;

    expect(component).toBeDefined();
  }

});
