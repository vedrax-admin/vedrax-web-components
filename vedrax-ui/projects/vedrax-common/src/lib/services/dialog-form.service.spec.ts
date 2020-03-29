import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DialogFormService } from './dialog-form.service';
import { DescriptorForm } from '../descriptor';
import { ControlType, ApiMethod, ActionType } from '../enum';
import { UrlService } from './url.service';
import { VedraxApiService } from './vedrax-api.service';


const descriptor: DescriptorForm = {
    controls: [
        {
            controlName: 'men',
            controlProperties: [],
            controlLabel: 'Are you a men ?',
            controlType: ControlType.checkbox,
        },
        {
            controlName: 'birthdate',
            controlProperties: [],
            controlLabel: 'Birth date',
            controlType: ControlType.datepicker,
            controlValidations: []
        }
    ],
    endpoint: '/api/test',
    method: ApiMethod.POST
};

const parameter: HttpParams = new HttpParams();

class MatDialogMock {
    open(component: any, config: any) {
        return {
            afterClosed: () => of('done')
        }
    }
};

describe('DialogFormService', () => {

    let httpTestingController: HttpTestingController;
    let service: DialogFormService;
    let apiService: VedraxApiService;
    let matDialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UrlService,
                VedraxApiService,
                { provide: MatDialog, useClass: MatDialogMock }
            ]
        });
    });

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(DialogFormService);
        apiService = TestBed.get(VedraxApiService);
        matDialog = TestBed.get(MatDialog);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('given valid params open dialog', () => {

        let test: any;

        let callback = (item: any) => { test = item; };
        service.openFormDialogFromApi(
            { label: 'label', url: 'api', fragment: 'detail', action: ActionType.form },
            { id: 1, name: 't1' },
            callback);

        const req = httpTestingController.expectOne('/api/1/detail');

        expect(req.request.method).toEqual('GET');

        req.flush(descriptor);

        expect(test).toBeDefined();
        expect(test).toBe('done');


    });

});