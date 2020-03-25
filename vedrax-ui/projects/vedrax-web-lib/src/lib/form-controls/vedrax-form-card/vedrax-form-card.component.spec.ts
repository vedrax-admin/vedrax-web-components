import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxFormCardComponent } from './vedrax-form-card.component';
import { FormService } from '../../services/form.service';
import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';
import { DescriptorForm } from '../../descriptor';
import { ApiMethod } from '../../enum';


const descriptor: DescriptorForm = {
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

class FormServiceMock {

  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    return new FormGroup({});
  }

}

class VedraxApiServiceMock {

}

const router = {
  navigate: jasmine.createSpy('navigate')
}

class LocationMock {
  back() { }
}

describe('VedraxFormComponent', () => {
  let component: VedraxFormCardComponent;
  let fixture: ComponentFixture<VedraxFormCardComponent>;
  let formService:FormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxFormCardComponent],
      providers: [
        { provide: FormService, useClass: FormServiceMock },
        { provide: VedraxApiService, useClass: VedraxApiServiceMock },
        { provide: Router, useValue: router },
        { provide: Location, useClass: LocationMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFormCardComponent);
    component = fixture.componentInstance;
    component.descriptor = descriptor;
    formService = TestBed.get(FormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be defined', () => {
    let spy = spyOn(formService,"createFormGroup");
    component.ngOnInit();
    expect(component.formCard).toBeDefined();
    expect(spy).toHaveBeenCalledWith(descriptor.controls);
  });
});
