import { TestBed } from '@angular/core/testing';
import { VedraxApiService } from './vedrax-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiMethod, ControlType } from '../enum';
import { DescriptorForm } from '../descriptor/descriptor-form';

const descriptorForm: DescriptorForm = {
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
        controlType: ControlType.datepicker
      }
    ],
    endpoint: '/api/test',
    method: ApiMethod.POST,
  };

describe('VedraxApiService', () => {
    let httpTestingController: HttpTestingController;
    let service: VedraxApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VedraxApiService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(VedraxApiService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('when get returns expected result', () => {

        service.get<string>('api/test')
            .subscribe(data => {
                expect(data).toEqual('test');
            });

        const req = httpTestingController.expectOne('api/test');

        expect(req.request.method).toEqual('GET');

        req.flush('test');
    });

    it('given no path when get then throws Error', () => {
        expect(function () { service.get<string>(null).subscribe() }).toThrowError();
    });

    it('given path when callEndpoint then returns string', () => {

        const data: { id: string, date: Date } = {
            id: 'test',
            date: new Date(2020, 11, 5, 0, 0, 0)
        };

        service.callEndpoint(descriptorForm, data)
            .subscribe(data => {
                expect(data.id).toEqual('test');
                expect(data.date).toEqual('2020-12-04T22:00:00.000Z');
            });

        const req = httpTestingController.expectOne('api/test');

        expect(req.request.method).toEqual('POST');

        req.flush(data);
    });

    it('given no path when callEndpoint then throws Error', () => {
        expect(function () { service.callEndpoint(null).subscribe() }).toThrowError();
    });


});