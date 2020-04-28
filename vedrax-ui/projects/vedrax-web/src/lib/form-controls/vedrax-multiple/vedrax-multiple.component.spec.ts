import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormArray } from '@angular/forms';

import { VedraxMultipleComponent } from './vedrax-multiple.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NVP } from '../../shared/nvp';
import { ControlType } from '../../enum/control-types';

const controlForm = {
  controlName: 'services',
  controlProperties: [],
  controlLabel: 'Are you a men ?',
  controlType: ControlType.multiple,
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
      services: new FormArray([])
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

    const item: NVP = { key: 1, value: 'label' };

    component.onChange(item);

    expect(component.selections.length).toBe(1);
    expect(component.formArray.length).toBe(1);

    component.remove(item.key);

    expect(component.formArray.length).toBe(0);
    expect(component.selections.length).toBe(0);

  });
});
