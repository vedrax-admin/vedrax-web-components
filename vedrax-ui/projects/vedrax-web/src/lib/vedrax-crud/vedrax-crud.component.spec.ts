import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxCrudComponent } from './vedrax-crud.component';

describe('VedraxCrudComponent', () => {
  let component: VedraxCrudComponent;
  let fixture: ComponentFixture<VedraxCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
