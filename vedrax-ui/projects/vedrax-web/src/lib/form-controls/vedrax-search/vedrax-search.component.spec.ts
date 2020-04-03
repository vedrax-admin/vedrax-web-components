import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { VedraxSearchComponent } from './vedrax-search.component';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { ControlType } from '../../enum/control-types';
import { VedraxModalComponent } from '../../vedrax-modal/vedrax-modal.component';
import { VedraxTableComponent } from '../../data-table/vedrax-table/vedrax-table.component';
import { ActionType } from '../../enum';
import { VedraxMaterialModule } from '../../material/vedrax-material.module';

const searchDescriptor: DescriptorFormControl = {
  controlName: 'productId',
  controlProperties: [],
  controlLabel: 'Product',
  controlType: ControlType.search,
  controlValue: 1,
  controlDisplayKey: 'productType',
  controlDisplayValue: 'PZ45',
  controlValidations: [],
  controlSearch: {
    path: '/api/source-products',
    title: 'title',
    searchControls: [{
      controlName: 'productType',
      controlProperties: [],
      controlLabel: 'Product Type',
      controlType: ControlType.input
    }],
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
        id: 'actions',
        label: 'Action',
        actions: [{
          label: 'Select',
          action: ActionType.redirect
        }]
      }
    ]
  }
};

class MatDialogMock {
  open() {

    return { afterClosed: () => of({}) };

  }
};

const matDialogMock = {
  open: jasmine.createSpy('open')
}

describe('VedraxSearchComponent', () => {
  let component: VedraxSearchComponent;
  let fixture: ComponentFixture<VedraxSearchComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        VedraxMaterialModule
      ],
      providers: [
        //{ provide: MatDialog, useClass: MatDialogMock }
      ],
      declarations: [VedraxSearchComponent, VedraxTableComponent, VedraxModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedraxSearchComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.descriptor = searchDescriptor;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dialog).toBeTruthy();
  });

  it('when openDialog then call open', () => {
    //the type of the return value should be 'any' for karma to be happy !!!
    const spy = spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ data: { item: { id: 2, productType: 'test' } } }) } as any);

    component.openDialog();

    expect(spy).toHaveBeenCalledWith(VedraxModalComponent, {
      width: '600px',
      data: {
        title: searchDescriptor.controlLabel,
        component: VedraxTableComponent,
        inputs: {
          descriptor: searchDescriptor.controlSearch
        }
      }
    });

    //control value is set when dialog is closed
    expect(component.control.value).toBe(2);

    //the display is set according to the provided key in descriptor
    expect(component.displayValue).toBe('test');

  });
});
