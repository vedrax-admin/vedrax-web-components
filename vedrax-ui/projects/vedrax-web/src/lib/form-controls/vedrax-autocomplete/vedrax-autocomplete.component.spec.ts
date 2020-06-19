import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxAutocompleteComponent } from './vedrax-autocomplete.component';

describe('VedraxAutocompleteComponent', () => {
  let component: VedraxAutocompleteComponent;
  let fixture: ComponentFixture<VedraxAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedraxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
