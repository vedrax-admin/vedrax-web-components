import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxRadioComponent } from './vedrax-radio.component';

describe('VedraxRadioComponent', () => {
  let component: VedraxRadioComponent;
  let fixture: ComponentFixture<VedraxRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
