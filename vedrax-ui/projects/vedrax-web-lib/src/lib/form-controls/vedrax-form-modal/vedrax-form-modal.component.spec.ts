import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxFormModalComponent } from './vedrax-form-modal.component';

describe('VedraxFormModalComponent', () => {
  let component: VedraxFormModalComponent;
  let fixture: ComponentFixture<VedraxFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxFormModalComponent ]
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
