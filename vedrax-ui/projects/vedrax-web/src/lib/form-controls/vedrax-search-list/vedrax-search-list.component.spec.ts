import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxSearchListComponent } from './vedrax-search-list.component';

describe('VedraxSearchListComponent', () => {
  let component: VedraxSearchListComponent;
  let fixture: ComponentFixture<VedraxSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
