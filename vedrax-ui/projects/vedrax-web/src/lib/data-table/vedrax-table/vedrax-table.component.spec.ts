import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { VedraxTableComponent } from './vedrax-table.component';
import { DescriptorTable } from '../../descriptor/descriptor-table';
import { ControlType } from '../../enum/control-types';
import { VedraxMaterialModule } from '../../material/vedrax-material.module';
import { of } from 'rxjs';
import { VedraxApiService } from '../../services/vedrax-api.service';
import { MatDialog } from '@angular/material/dialog';


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

class ApiServiceMock{

};

const mock = { id: 2, name: 'test' };

describe('VedraxTableComponent', () => {
  let component: VedraxTableComponent;
  let fixture: ComponentFixture<VedraxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        VedraxMaterialModule
      ],
      providers: [
        { provide: VedraxApiService, useClass: ApiServiceMock }
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.displayedColumns.length).toBe(4);
    expect(component.datasource).toBeDefined();
  });

});
