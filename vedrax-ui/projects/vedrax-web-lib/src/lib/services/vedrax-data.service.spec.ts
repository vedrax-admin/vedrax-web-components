import { TestBed } from '@angular/core/testing';
import { VedraxApiService } from './vedrax-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiMethod } from '../enum';
import { VedraxDataService } from './vedrax-data.service';
import { DescriptorPage, DescriptorTable } from '../descriptor';

describe('VedraxDataService', () => {
    let httpTestingController: HttpTestingController;
    let apiService: VedraxApiService;
    let dataService: VedraxDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VedraxApiService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        apiService = TestBed.get(VedraxApiService);
        dataService = TestBed.get(VedraxDataService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(apiService).toBeTruthy();
        expect(dataService).toBeTruthy();
        expect(dataService.data.length).toBe(0);
    });

    it('when load returns expected result', () => {

        const descriptor: DescriptorTable = {
            title: 'title',
            path: 'api/test',
            columns: []
        };

        dataService.load(descriptor);

        const req = httpTestingController.expectOne('api/test');

        expect(req.request.method).toEqual('GET');

        const result: DescriptorPage = {
            content: [
                { id: 1, name: 't1' },
                { id: 2, name: 't2' }
            ],
            first: true,
            last: false,
            totalPages: 2,
            totalElements: 60,
            size: 30,
            number: 0,
            empty: true
        };

        req.flush(result);

        expect(dataService.data.length).toBe(2);
        expect(dataService.totalElements).toBe(60);
    });

    it('when load throws an exception returns empty result', () => {

        const descriptor: DescriptorTable = {
            title: 'title',
            path: 'api/test',
            columns: []
        };

        dataService.load(descriptor);

        httpTestingController.expectOne('api/test').flush(null, { status: 400, statusText: 'bad request' });

        expect(dataService.data.length).toBe(0);
        expect(dataService.totalElements).toBe(0);
    });

    it('given no descriptor when load then throws Error', () => {
        expect(function () { dataService.load(null) }).toThrowError();
    });

    it('when loadValues returns expected result', () => {

        const descriptor: DescriptorTable = {
            title: 'title',
            path: 'api/test',
            columns: []
        };

        dataService.loadValues(descriptor);

        const req = httpTestingController.expectOne('api/test');

        expect(req.request.method).toEqual('GET');

        const result = [
            { id: 1, name: 't1' },
            { id: 2, name: 't2' }
        ];

        req.flush(result);

        expect(dataService.data.length).toBe(2);
        expect(dataService.totalElements).toBe(2);
    });

    it('when loadValues throws an exception returns empty result', () => {

        const descriptor: DescriptorTable = {
            title: 'title',
            path: 'api/test',
            columns: []
        };

        dataService.loadValues(descriptor);

        httpTestingController.expectOne('api/test').flush(null, { status: 400, statusText: 'bad request' });

        expect(dataService.data.length).toBe(0);
        expect(dataService.totalElements).toBe(0);
    });

    it('given no descriptor when loadValues then throws Error', () => {
        expect(function () { dataService.loadValues(null) }).toThrowError();
    });

    it('when addItem then add the provided items', () => {
        expect(dataService.data.length).toBe(0);

        dataService.addItem({ id: 1, name: 't1' });
        expect(dataService.data.length).toBe(1);

        dataService.addItem({ id: 2, name: 't2' });
        expect(dataService.data.length).toBe(2);

        dataService.addItem(null);
        expect(dataService.data.length).toBe(2);
    });

    it('when updateItem then update the provided items', () => {
        dataService.addItem({ id: 1, name: 't1' });
        expect(dataService.data.length).toBe(1);

        expect(dataService.data[0].name).toBe('t1');

        dataService.updateItem({ id: 1, name: 'updated' });

        expect(dataService.data[0].name).toBe('updated');
        
    });

});