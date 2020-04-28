import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { VedraxMultipleComponent } from './vedrax-multiple.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NVP } from '../../shared/nvp';
import { ControlType } from '../../enum/control-types';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';

const controlForm: DescriptorFormControl = {
  controlName: 'services',
  controlProperties: [],
  controlLabel: 'Are you a men ?',
  controlType: ControlType.multiple,
  controlOptions: [
    { key: 1, value: 'v1' },
    { key: 2, value: 'v2' },
    { key: 3, value: 'v3' },
    { key: 4, value: 'v4' },
    { key: 5, value: 'v5' },
    { key: 6, value: 'v6' },
  ],
  controlValue: [
    1, 3, 4
  ]
};

describe('VedraxMultipleComponent', () => {
  let component: VedraxMultipleComponent;
  let fixture: ComponentFixture<VedraxMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VedraxMultipleComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxMultipleComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      services: new FormArray([
        new FormControl(1),
        new FormControl(3),
        new FormControl(4)
      ])
    });
    component.descriptor = controlForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get form array', () => {
    expect(component.formArray).toBeDefined();
  });

  it('check when add control', () => {

    component.ngOnInit();

    expect(component.selections.length).toBe(6);

    const item: NVP = { key: 7, value: 'v7' };

    component.onChange(item);

    expect(component.selections.length).toBe(7);
    expect(component.formArray.length).toBe(7);

    component.remove(item.key);

    expect(component.formArray.length).toBe(6);
    expect(component.selections.length).toBe(6);

  });
});
