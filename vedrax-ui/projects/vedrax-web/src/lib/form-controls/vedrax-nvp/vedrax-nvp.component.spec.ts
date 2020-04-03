import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VedraxNvpComponent } from './vedrax-nvp.component';
import { VedraxMaterialModule } from '../../material/vedrax-material.module';


describe('VedraxNvpComponent', () => {
  let component: VedraxNvpComponent;
  let fixture: ComponentFixture<VedraxNvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        ReactiveFormsModule,
        VedraxMaterialModule
      ],
      declarations: [ VedraxNvpComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
