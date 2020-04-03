import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { VedraxFormModalComponent } from './vedrax-form-modal.component';
import { DescriptorModal, DescriptorFormControl } from '../../descriptor';
import { ControlType } from '../../enum/control-types';
import { ApiMethod } from '../../enum/api-methods';
import { FormService } from '../../services/form.service';
import { VedraxApiService } from '../../services/vedrax-api.service';



const MAT_DIALOG_DATA_MOCK: DescriptorModal = {
  title: 'test',
  formDescriptor: {
    controls: [
      {
        controlName: 'men',
        controlProperties: [],
        controlLabel: 'Are you a men ?',
        controlType: ControlType.checkbox,
      },
      {
        controlName: 'birthdate',
        controlProperties: [],
        controlLabel: 'Birth date',
        controlType: ControlType.datepicker,
        controlValidations: []
      }
    ],
    endpoint: '/api/test',
    method: ApiMethod.POST,
  }
};

class FormServiceMock {

  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    return new FormGroup({});
  }

}

class VedraxApiServiceMock {

}

describe('VedraxFormModalComponent', () => {
  let component: VedraxFormModalComponent;
  let fixture: ComponentFixture<VedraxFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [VedraxFormModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_MOCK },
        { provide: MatDialogRef, useValue: {} },
        { provide: FormService, useClass: FormServiceMock },
        { provide: VedraxApiService, useClass: VedraxApiServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
