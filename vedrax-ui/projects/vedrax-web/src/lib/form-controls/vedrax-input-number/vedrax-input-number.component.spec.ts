import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxInputNumberComponent } from './vedrax-input-number.component';

describe('VedraxInputNumberComponent', () => {
  let component: VedraxInputNumberComponent;
  let fixture: ComponentFixture<VedraxInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
