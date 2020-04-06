import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { LoaderInterceptor } from './loader.interceptor';
import { loaderInterceptorProvider } from './loader.interceptor';
import { LoaderService } from '../../services/loader.service';
import { LoaderServiceStub } from '../../services/loader.service.stub';

const testUrl = '/data';

describe('LoaderInterceptor', () => {
    describe('intercept', () => {
        let loaderService: LoaderService;
        let httpClient: HttpClient;

        
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [LoaderInterceptor,
                    { provide: LoaderService, useClass: LoaderServiceStub },
                    loaderInterceptorProvider
                ],
                imports: [HttpClientTestingModule]
            });
            httpClient = TestBed.get(HttpClient);
            loaderService = TestBed.get(LoaderService);
            spyOn(loaderService, 'startLoading');
            spyOn(loaderService, 'stopLoading');
        });

        it('When request starts the loader starts and ends as expected', () => {

            // Make an HTTP GET request
            httpClient.get<any>(testUrl)
                .pipe(
                    finalize(() => expect(loaderService.stopLoading).toHaveBeenCalledTimes(1))
                ).subscribe(
                    res => {
                        expect(loaderService.startLoading).toHaveBeenCalledTimes(1);
                    });

        });

    });
});