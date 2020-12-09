import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxInputFileComponent } from './vedrax-input-file.component';

describe('VedraxInputFileComponent', () => {
  let component: VedraxInputFileComponent;
  let fixture: ComponentFixture<VedraxInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
