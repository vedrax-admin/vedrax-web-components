import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxWebLibComponent } from './vedrax-web-lib.component';

describe('VedraxWebLibComponent', () => {
  let component: VedraxWebLibComponent;
  let fixture: ComponentFixture<VedraxWebLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxWebLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxWebLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
