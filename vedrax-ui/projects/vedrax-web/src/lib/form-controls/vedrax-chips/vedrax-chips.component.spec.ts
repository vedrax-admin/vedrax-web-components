import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxChipsComponent } from './vedrax-chips.component';

describe('VedraxChipsComponent', () => {
  let component: VedraxChipsComponent;
  let fixture: ComponentFixture<VedraxChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
