import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxMatrixComponent } from './vedrax-matrix.component';

describe('VedraxMatrixComponent', () => {
  let component: VedraxMatrixComponent;
  let fixture: ComponentFixture<VedraxMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
