import { TestBed } from '@angular/core/testing';

import { FormDescriptorService } from './form-descriptor.service';
import { VedraxApiService } from './vedrax-api.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { ApiMethod } from '../enum/api-methods';
import { ControlType } from '../enum/control-types';
import { DescriptorForm } from '../descriptor/descriptor-form';

const DESCRIPTOR_FORM: DescriptorForm = {
    title: 'create',
    lovs:[
        {
            key:'species',
            url:'/api/lov/species'
        },
        {
            key:'regions',
            url:'/api/lov/regions'
        }
    ],
    controls: [
        {
            controlName: 'species',
            controlProperties: [],
            controlLabel: 'Species',
            controlType: ControlType.select,
        },
        {
            controlName: 'regions',
            controlProperties: [],
            controlLabel: 'Region',
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

describe('FormDescriptorService', () => {
    let httpTestingController: HttpTestingController;
    let service: FormDescriptorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VedraxApiService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(FormDescriptorService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialized form descriptor with LOVs', () => {

        service.getDescriptor('/api/descriptor/form').subscribe(formDescriptor => {
            expect(formDescriptor).toBeDefined();
            expect(formDescriptor.controls[0].controlName).toBe('species');
            expect(formDescriptor.controls[0].controlOptions).toBeDefined();
            expect(formDescriptor.controls[0].controlOptions.length).toBe(2);

            expect(formDescriptor.controls[1].controlName).toBe('regions');
            expect(formDescriptor.controls[1].controlOptions).toBeDefined();
            expect(formDescriptor.controls[1].controlOptions.length).toBe(3);
        });

        //first flush form descriptor
        const req = httpTestingController.expectOne('/api/descriptor/form');
        expect(req.request.method).toEqual('GET');
        req.flush(DESCRIPTOR_FORM);

        //after flush LOV requests
        const reqSpecies = httpTestingController.expectOne('/api/lov/species');
        const reqRegions = httpTestingController.expectOne('/api/lov/regions');

        expect(reqSpecies.request.method).toEqual('GET');
        expect(reqRegions.request.method).toEqual('GET');

        reqSpecies.flush(SPECIES);
        reqRegions.flush(REGIONS);
    });

    it('error throws when getting form descriptor', () => {

        service.getDescriptor('/api/descriptor/form').subscribe(formDescriptor => {
            expect(formDescriptor).toBeDefined();
            expect(formDescriptor.controls).toBeDefined();
            expect(formDescriptor.controls.length).toBe(0);
        });

        const req = httpTestingController.expectOne('/api/descriptor/form');
        expect(req.request.method).toEqual('GET');
        req.flush(null, { status: 400, statusText: 'bad request' });
    });

    
    it('error throws when getting LOV', () => {

        service.getDescriptor('/api/descriptor/form').subscribe(formDescriptor => {
            expect(formDescriptor).toBeDefined();
            expect(formDescriptor.controls).toBeDefined();
            expect(formDescriptor.controls.length).toBe(0);
        });

        const req = httpTestingController.expectOne('/api/descriptor/form');
        expect(req.request.method).toEqual('GET');
        req.flush(DESCRIPTOR_FORM);


        const reqSpecies = httpTestingController.expectOne('/api/lov/species');
        const reqRegions = httpTestingController.expectOne('/api/lov/regions');

        reqSpecies.flush(null, { status: 400, statusText: 'bad request' });


    });

    

});