import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxMultipleComponent } from './vedrax-multiple.component';

describe('VedraxMultipleComponent', () => {
  let component: VedraxMultipleComponent;
  let fixture: ComponentFixture<VedraxMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
