import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxConfirmComponent } from './vedrax-confirm.component';

describe('VedraxConfirmComponent', () => {
  let component: VedraxConfirmComponent;
  let fixture: ComponentFixture<VedraxConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
