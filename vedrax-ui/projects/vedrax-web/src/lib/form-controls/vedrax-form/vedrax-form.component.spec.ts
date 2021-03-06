import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormService } from '../../services/form.service';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';
import { DescriptorForm } from '../../descriptor';
import { ApiMethod } from '../../enum';
import { VedraxFormComponent } from './vedrax-form.component';

const descriptorForm: DescriptorForm = {
  title:'test',
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
      controlType: ControlType.datepicker
    }
  ],
  endpoint: '/api/test',
  method: ApiMethod.POST,
};

class FormServiceMock {

  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    return new FormGroup({});
  }

}

describe('VedraxFormComponent', () => {
  let component: VedraxFormComponent;
  let fixture: ComponentFixture<VedraxFormComponent>;
  let formService: FormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ VedraxFormComponent ],
      providers: [
        { provide: FormService, useClass: FormServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFormComponent);
    component = fixture.componentInstance;
    formService = TestBed.get(FormService);
    component.descriptor = descriptorForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be defined', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  
});
