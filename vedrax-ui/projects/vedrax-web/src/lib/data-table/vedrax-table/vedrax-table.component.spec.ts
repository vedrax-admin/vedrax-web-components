import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { VedraxTableComponent } from './vedrax-table.component';
import { DescriptorTable } from '../../descriptor/descriptor-table';
import { ControlType } from '../../enum/control-types';
import { VedraxDataService } from '../../services/vedrax-data.service';
import { DescriptorAction } from '../../descriptor/descriptor-action';
import { DialogFormService, DataTableCallback } from '../../services/dialog-form.service';
import { ActionType } from '../../enum';
import { VedraxMaterialModule } from '../../material/vedrax-material.module';
import { of, Observable } from 'rxjs';


const tableDescriptor: DescriptorTable = {
  path: '/api/products',
  title: 'products',
  searchControls: [
    {
      controlName: 'productType',
      controlProperties: [{
        propertyName: 'type',
        propertyValue: 'text'
      }],
      controlLabel: 'Product Type',
      controlType: ControlType.input
    }
  ],
  columns: [
    {
      id: 'id',
      label: 'ID'
    },
    {
      id: 'brandName',
      label: 'Brand'
    },
    {
      id: 'categoryName',
      label: 'Category'
    },
    {
      id: 'productType',
      label: 'Type'
    }
  ]
};

const router = {
  navigate: jasmine.createSpy('navigate')
}

class VedraxDataServiceMock {

  load(descriptor: DescriptorTable, params?: HttpParams): void {
  }

  loadValues(descriptor: DescriptorTable, params?: HttpParams): void {
  }

  addItem(item: any): void { }

  updateItem(item: any): void { }

  get dataAsObservable(): Observable<any[]> {
    return of([]);
  }

  complete(){}

}

class DialogFormServiceMock {

  openFormDialogFromApi(action: DescriptorAction, item: any, callback: DataTableCallback): void { }

}

const mock = { id: 2, name: 'test' };

describe('VedraxTableComponent', () => {
  let component: VedraxTableComponent;
  let fixture: ComponentFixture<VedraxTableComponent>;
  let dialogFormService: DialogFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        VedraxMaterialModule
      ],
      providers: [
        { provide: VedraxDataService, useClass: VedraxDataServiceMock },
        { provide: DialogFormService, useClass: DialogFormServiceMock },
        { provide: Router, useValue: router }
      ],
      declarations: [VedraxTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxTableComponent);
    component = fixture.componentInstance;
    component.descriptor = tableDescriptor;
    dialogFormService = TestBed.get(DialogFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.displayedColumns.length).toBe(4);
    expect(component.datasource).toBeDefined();
  });

  it('should call API with correct params', () => {

    component.ngOnInit();

    //DTO from search form
    const search = {
      productType: 'test'
    };

    const spy = spyOn(component.vedraxDataService, 'loadValues');

    //Call filter with the search data
    component.filter(search);

    let params = new HttpParams();
    params.set('productType', search.productType);

    expect(spy).toHaveBeenCalled();

  });

  it('when add item call service method addItem', () => {

    component.ngOnInit();

    const spy = spyOn(component.vedraxDataService, 'addItem');

    component.addItem('test');

    expect(spy).toHaveBeenCalledWith('test');

  });

  it('when update item call service method updateItem', () => {

    component.ngOnInit();

    const spy = spyOn(component.vedraxDataService, 'updateItem');

    component.updateItem('test');

    expect(spy).toHaveBeenCalledWith('test');

  });

  it('when select with redirection', () => {

    component.ngOnInit();

    const descriptor: DescriptorAction = { label: 'test', url: '/api', fragment: 'detail', action: ActionType.redirect };

    component.select(descriptor, mock);

    expect(router.navigate).toHaveBeenCalledWith(['/api', 2, 'detail']);

  });

  it('when select with action equals to select', () => {

    component.ngOnInit();

    const spy = spyOn(component.onSelect, 'emit');

    const descriptor: DescriptorAction = { label: 'test', action: ActionType.select };

    component.select(descriptor, mock);

    expect(spy).toHaveBeenCalledWith({ action: descriptor, item: mock });

  });

  it('when select with action equals to form', () => {

    component.ngOnInit();

    const spy = spyOn(dialogFormService, 'openFormDialogFromApi');

    const descriptor: DescriptorAction = { label: 'test', action: ActionType.form };

    component.select(descriptor, mock);

    expect(spy).toHaveBeenCalledWith(descriptor, mock, component.updateItem);

  });

});
