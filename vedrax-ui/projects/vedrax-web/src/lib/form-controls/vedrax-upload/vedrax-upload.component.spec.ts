import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxUploadComponent } from './vedrax-upload.component';

describe('VedraxUploadComponent', () => {
  let component: VedraxUploadComponent;
  let fixture: ComponentFixture<VedraxUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
