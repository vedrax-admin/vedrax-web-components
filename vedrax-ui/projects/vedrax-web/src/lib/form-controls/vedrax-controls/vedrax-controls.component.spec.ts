import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { VedraxControlsComponent } from './vedrax-controls.component';
import { DescriptorForm } from '../../descriptor/descriptor-form';
import { ControlType } from '../../enum/control-types';
import { ApiMethod } from '../../enum/api-methods';


const descriptorForm: DescriptorForm = {
  controls: [
    {
      controlName: 'men',
      controlProperties: [],
      controlLabel: 'Are you a men ?',
      controlType: ControlType.checkbox,
    },
    {
      controlName: 'women',
      controlProperties: [],
      controlLabel: 'Are you a men ?',
      controlType: ControlType.checkbox,
    },
    {
      controlName: 'birthdate',
      controlProperties: [],
      controlLabel: 'Birth date',
      controlType: ControlType.datepicker
    }
  ],
  groups:[
    {
      name:'g1',
      ids:['men','women']
    },
    {
      name:'g2',
      ids:['birthdate']
    }
  ],
  endpoint: '/api/test',
  method: ApiMethod.POST,
};

describe('VedraxControlsComponent', () => {
  let component: VedraxControlsComponent;
  let fixture: ComponentFixture<VedraxControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ VedraxControlsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxControlsComponent);
    component = fixture.componentInstance;
    component.descriptor = descriptorForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate group list',()=>{
    component.ngOnInit();

    expect(component.controlsPerGroups).toBeTruthy();
    expect(component.controlsPerGroups.length).toBe(2);
    expect(component.controlsPerGroups[0].controls.length).toBe(2);
  });
});
