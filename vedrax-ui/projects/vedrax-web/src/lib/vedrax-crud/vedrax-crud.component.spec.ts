import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxCrudComponent } from './vedrax-crud.component';
import { of, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ControlType } from '../enum/control-types';
import { ApiMethod } from '../enum/api-methods';
import { DescriptorForm } from '../descriptor/descriptor-form';

import { FormDescriptorService } from '../services/form-descriptor.service';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { ActionType } from '../enum/action-types';

const DESCRIPTOR_FORM: DescriptorForm = {
  title: 'create',
  controls: [
    {
      controlName: 'species',
      controlProperties: [],
      controlLabel: 'Species',
      controlOptionsEndpoint: '/api/lov/species',
      controlType: ControlType.select,
    },
    {
      controlName: 'regions',
      controlProperties: [],
      controlLabel: 'Region',
      controlOptionsEndpoint: '/api/lov/regions',
      controlType: ControlType.select
    },
    {
      controlName: 'department',
      controlProperties: [],
      controlLabel: 'Birth date',
      controlOptions: [
        { key: 'd1', value: 'd1' },
        { key: 'd2', value: 'd2' }
      ],
      controlType: ControlType.select,
      controlValidations: []
    }
  ],
  endpoint: '/api/test',
  method: ApiMethod.POST,
  updateTable: true
};

const SPECIES: DescriptorOption[] = [
  { key: 'S1', value: 'S1' },
  { key: 'S2', value: 'S2' }
];

const REGIONS: DescriptorOption[] = [
  { key: 'r1', value: 'r1' },
  { key: 'r2', value: 'r2' },
  { key: 'r3', value: 'r3' }
];

class FormDescriptorServiceMock {

  getDescriptor(endpoint: string, lovs: Map<string, Array<DescriptorOption>> = new Map()): Observable<DescriptorForm> {
    return of(DESCRIPTOR_FORM);
  }

};

class DialogFormServiceMock {

  open(descriptor: DescriptorForm): Observable<any> {
    return of({ item: 1 });
  }


};

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('VedraxCrudComponent', () => {
  let component: VedraxCrudComponent;
  let fixture: ComponentFixture<VedraxCrudComponent>;
  const vedraxTableComponent = jasmine.createSpyObj('VedraxTableComponent', ['openDialog']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VedraxCrudComponent],
      providers: [
        { provide: FormDescriptorService, useClass: FormDescriptorServiceMock },
        { provide: Router, useValue: router }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('test create with no cached formDescriptor', () => {

    //form descriptor is not defined
    component.formDescriptor = undefined;

    //check if map of LOVs is initialized 
    expect(component.lovs).toBeDefined();
    expect(component.lovs.size).toBe(0);

    //set create action object
    component.createAction = {
      label:'test',
      url: 'test',
      action: ActionType.form
    };

    //set table component with spy object
    component.tableComponent = vedraxTableComponent;

    //call method to be tested
    component.create();

    //the cached form descriptor should be defined
    expect(component.formDescriptor).toBeDefined();

    //open dialog method of table component should have been called
    expect(vedraxTableComponent.openDialog).toHaveBeenCalledWith(DESCRIPTOR_FORM);

  });

  it('test create with cached formDescriptor', () => {

    //set form descriptor within component
    component.formDescriptor = DESCRIPTOR_FORM;

    //set create action object
    component.createAction = {
      label: 'test',
      url: 'test',
      action: ActionType.form
    };

    //set table component with spy object
    component.tableComponent = vedraxTableComponent;

    //call method to be tested
    component.create();

    //open dialog method of table component should have been called
    expect(vedraxTableComponent.openDialog).toHaveBeenCalledWith(DESCRIPTOR_FORM);

  });



});
