import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DescriptorFormControl } from '../descriptor';
import { ControlType } from '../enum';

describe('FormService', () => {

  let service: FormService;

  let descriptors: DescriptorFormControl[] = [
    {
      controlName: 'ctrl1',
      controlProperties: [],
      controlLabel: 'ctrl1',
      controlType: ControlType.checkbox,
      controlValidations: [
        {
          validationName: 'required',
          validationMessage: 'message',
          validationValue: true
        },
        {
          validationName: 'min',
          validationMessage: 'message',
          validationValue: 10
        }
      ]
    },
    {
      controlName: 'ctrl2',
      controlProperties: [],
      controlLabel: 'ctrl2',
      controlType: ControlType.input,
      controlValidations: [
        {
          validationName: 'required',
          validationMessage: 'message',
          validationValue: true
        }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    });
  });

  beforeEach(() => {
    service = TestBed.get(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createFormGroup without descriptors', () => {
    let formGroup: FormGroup = service.createFormGroup();

    expect(formGroup).toBeDefined();
  });

  it('createFormGroup with descriptors', () => {
    let formGroup: FormGroup = service.createFormGroup(descriptors);

    expect(formGroup.get(descriptors[0].controlName)).toBeDefined();
    expect(formGroup.get(descriptors[1].controlName)).toBeDefined();
  });

  it('createFormControl with descriptor', () => {

    let formControl = service.createFormControl(descriptors[0]);

    expect(formControl).toBeDefined();
  });

  it('createFormControl with undefined descriptor throws Error', () => {

    //for checking error we pass the method in a function
    expect(function () { service.createFormControl(null) }).toThrowError();
  });

  it('check when matrix', () => {

    const descriptorMatrix: DescriptorFormControl = {
      controlName: 'matrix',
      controlProperties: [],
      controlLabel: 'Matrix',
      controlType: ControlType.matrix,
      controlValidations: [],
      controlValue: [
        {
          key: 'k1',
          entries: [
            { key: 'e1', value: 0.005 },
            { key: 'e3', value: 0.076 },
            { key: 'e4', value: 0.0008 },
            { key: 'e5', value: 0.005456 }
          ]
        },
        {
          key: 'k2',
          entries: [
            { key: 'e1', value: 0.005 },
            { key: 'e3', value: 0.076 },
            { key: 'e4', value: 0.0008 },
            { key: 'e5', value: 0.005456 }
          ]
        },
        {
          key: 'k3',
          entries: [
            { key: 'e1', value: 0.005 },
            { key: 'e3', value: 0.076 },
            { key: 'e4', value: 0.0008 },
            { key: 'e5', value: 0.005456 }
          ]
        }
      ]
    }

    let formControl = service.createFormControl(descriptorMatrix);

    expect(formControl).toBeDefined();
    expect(formControl.value.length).toBe(3);
  });
});
