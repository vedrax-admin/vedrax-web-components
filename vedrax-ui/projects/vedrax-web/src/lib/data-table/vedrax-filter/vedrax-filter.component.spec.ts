import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VedraxFilterComponent } from './vedrax-filter.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { FormService } from '../../services/form.service';
import { DescriptorEndpoint } from '../../descriptor/descriptor-endpoint';
import { Observable, of } from 'rxjs';
import { FormDescriptorService } from '../../services/form-descriptor.service';

class FormServiceMock {

  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    return new FormGroup({});
  }

}

class FormDescriptorServiceMock {

  initLov(controls: DescriptorFormControl[] = [], endpoints: DescriptorEndpoint[] = []): Observable<any> {
    return of([]);
  }

}

describe('VedraxFilterComponent', () => {
  let component: VedraxFilterComponent;
  let fixture: ComponentFixture<VedraxFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VedraxFilterComponent],
      providers: [
        { provide: FormService, useClass: FormServiceMock },
        { provide: FormDescriptorService, useClass: FormDescriptorServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be defined', () => {
    component.ngOnInit();
    expect(component.formSearch).toBeDefined();
  });
});
