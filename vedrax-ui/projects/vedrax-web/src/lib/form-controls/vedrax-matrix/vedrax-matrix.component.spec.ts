import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxMatrixComponent } from './vedrax-matrix.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('VedraxMatrixComponent', () => {
  let component: VedraxMatrixComponent;
  let fixture: ComponentFixture<VedraxMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
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
