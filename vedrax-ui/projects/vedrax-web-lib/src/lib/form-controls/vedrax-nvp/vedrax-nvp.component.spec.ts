import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxNvpComponent } from './vedrax-nvp.component';

describe('VedraxNvpComponent', () => {
  let component: VedraxNvpComponent;
  let fixture: ComponentFixture<VedraxNvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxNvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxNvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
