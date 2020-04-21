import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedraxCrudComponent } from './vedrax-crud.component';
import { of, forkJoin } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VedraxApiService } from '../services/vedrax-api.service';
import { Router } from '@angular/router';
import { ControlType } from '../enum/control-types';
import { ApiMethod } from '../enum/api-methods';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorOption } from 'vedrax-web/public-api';
import { DescriptorAction } from '../descriptor';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ActionType } from '../enum/action-types';

const DESCRIPTOR_FORM: DescriptorForm = {
  title:'create',
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

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('OK')
    };
  }
};

class ApiServiceMock {

};

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('VedraxCrudComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: VedraxCrudComponent;
  let fixture: ComponentFixture<VedraxCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VedraxCrudComponent],
      imports: [HttpClientTestingModule],
      providers: [
        VedraxApiService,
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: Router, useValue: router }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(VedraxCrudComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when select should add LOV', () => {

    let action: DescriptorAction = new DescriptorAction();
    action.label = 'test';
    action.action = ActionType.form,
      action.url = 'api/descriptor/form';

    let item: any = {
      id: 1,
      name: 'test'
    };

    expect(component.formDescriptor).toBeUndefined();
    expect(component.lovs).toBeDefined();
    expect(component.lovs.size).toBe(0);

    component.select(action, item);

    //first flush form descriptor
    const req = httpTestingController.expectOne('/api/descriptor/form/1');
    expect(req.request.method).toEqual('GET');
    req.flush(DESCRIPTOR_FORM);

    //after flush LOV requests
    const reqSpecies = httpTestingController.expectOne('/api/lov/species');
    const reqRegions = httpTestingController.expectOne('/api/lov/regions');

    expect(reqSpecies.request.method).toEqual('GET');
    expect(reqRegions.request.method).toEqual('GET');

    reqSpecies.flush(SPECIES);
    reqRegions.flush(REGIONS);

    expect(component.formDescriptor).toBeDefined();
    expect(component.formDescriptor.controls[0].controlName).toBe('species');
    expect(component.formDescriptor.controls[0].controlOptions).toBeDefined();
    expect(component.formDescriptor.controls[0].controlOptions.length).toBe(2);

    expect(component.formDescriptor.controls[1].controlName).toBe('regions');
    expect(component.formDescriptor.controls[1].controlOptions).toBeDefined();
    expect(component.formDescriptor.controls[1].controlOptions.length).toBe(3);

    expect(component.lovs).toBeDefined();
    expect(component.lovs.size).toBe(2);

    component.select(action, item);

    const req1 = httpTestingController.expectOne('/api/descriptor/form/1');
    expect(req1.request.method).toEqual('GET');
    req1.flush(DESCRIPTOR_FORM);

    expect(component.formDescriptor).toBeDefined();
    expect(component.formDescriptor.controls[0].controlName).toBe('species');
    expect(component.formDescriptor.controls[0].controlOptions).toBeDefined();
    expect(component.formDescriptor.controls[0].controlOptions.length).toBe(2);

    expect(component.formDescriptor.controls[1].controlName).toBe('regions');
    expect(component.formDescriptor.controls[1].controlOptions).toBeDefined();
    expect(component.formDescriptor.controls[1].controlOptions.length).toBe(3);

  });

  it('given error in get form descriptor when select', () => {

    let action: DescriptorAction = new DescriptorAction();
    action.label = 'test';
    action.action = ActionType.form,
      action.url = 'api/descriptor/form';

    let item: any = {
      id: 1,
      name: 'test'
    };

    component.select(action, item);

    const req = httpTestingController.expectOne('/api/descriptor/form/1');
    expect(req.request.method).toEqual('GET');
    req.flush(null, { status: 400, statusText: 'bad request' });

    //expect(component.formDescriptor).toBeDefined();
    //expect(component.formDescriptor.controls).toBeDefined();
    //expect(component.formDescriptor.controls.length).toBe(0);

  });

  it('given error in get lov when select', () => {

    let action: DescriptorAction = new DescriptorAction();
    action.label = 'test';
    action.action = ActionType.form,
      action.url = 'api/descriptor/form';

    let item: any = {
      id: 1,
      name: 'test'
    };

    component.select(action, item);

    const req = httpTestingController.expectOne('/api/descriptor/form/1');
    expect(req.request.method).toEqual('GET');
    req.flush(DESCRIPTOR_FORM);

    const reqSpecies = httpTestingController.expectOne('/api/lov/species');
    reqSpecies.flush(null, { status: 400, statusText: 'bad request' });

    const reqRegions = httpTestingController.expectOne('/api/lov/regions');

    expect(component.formDescriptor).toBeDefined();
    expect(component.formDescriptor.controls).toBeDefined();
    expect(component.formDescriptor.controls.length).toBe(3);

    expect(component.formDescriptor.controls[0].controlName).toBe('species');
    expect(component.formDescriptor.controls[0].controlOptions).toBeUndefined();

  });


});
