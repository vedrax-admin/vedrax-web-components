import { TestBed } from '@angular/core/testing';
import { UrlService } from "./url.service";

describe('UrlService', () => {

    let service: UrlService;

    beforeEach(() => {
        service = TestBed.get(UrlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service.construct()).toBe('/');
    });

    it('should add fragments', () => {

        service.insertFragment('test');
        service.insertFragment('api');

        expect(service.construct()).toBe('/test/api');

        service.reset();

        expect(service.construct()).toBe('/');

    });


});