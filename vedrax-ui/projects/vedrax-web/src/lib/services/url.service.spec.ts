import { TestBed } from '@angular/core/testing';
import { UrlService } from "./url.service";

describe('UrlService', () => {

    let service: UrlService;

    beforeEach(() => {
        service = TestBed.get(UrlService);
        service.reset();
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

    it('should add fragments for creating URL', () => {

        service.insertFragment('um/descriptor/form/users');
        service.insertFragment('finance@vedrax.com');
        service.insertFragment('credentials');

        expect(service.construct()).toBe('/um/descriptor/form/users/finance@vedrax.com/credentials');

        service.reset();

        expect(service.construct()).toBe('/');

    });


});