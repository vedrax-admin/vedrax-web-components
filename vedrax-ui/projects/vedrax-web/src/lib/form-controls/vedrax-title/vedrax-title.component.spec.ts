import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxTitleComponent } from './vedrax-title.component';

describe('VedraxTitleComponent', () => {
  let component: VedraxTitleComponent;
  let fixture: ComponentFixture<VedraxTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
