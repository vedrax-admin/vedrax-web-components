import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxControlsComponent } from './vedrax-controls.component';

describe('VedraxControlsComponent', () => {
  let component: VedraxControlsComponent;
  let fixture: ComponentFixture<VedraxControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
