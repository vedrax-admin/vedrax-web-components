import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VedraxFormCardComponent } from './vedrax-form-card.component';
import { FormService } from '../../services/form.service';


describe('VedraxFormComponent', () => {
  let component: VedraxFormCardComponent;
  let fixture: ComponentFixture<VedraxFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [VedraxFormCardComponent],
      providers: [
        FormService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxFormCardComponent);
    component = fixture.componentInstance;
    component.descriptor = descriptors;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be defined', () => {
    component.ngOnInit();
    expect(component.formCard).toBeDefined();
  });
});
