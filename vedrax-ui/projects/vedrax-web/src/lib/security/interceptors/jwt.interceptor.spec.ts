import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../../services/authentication.service';
import { jwtInterceptorProvider } from './jwt.interceptor';
import { AuthenticationServiceStub } from '../../services/authentication.service.stub';
import { User } from '../../shared/user.model';
import { Role } from '../../shared/role.enum';

const SIMPLE_USER: User = {
    email: 'elodie.penchenat@vedrax.com',
    fullName: 'Elodie Penchenat',
    userRole: Role.USER,
    token: 'token'
}

const testUrl = '/data';

describe('JwtInterceptor', () => {
    describe('intercept', () => {
        let authService: AuthenticationService;
        let httpClient: HttpClient;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [JwtInterceptor,
                    { provide: AuthenticationService, useClass: AuthenticationServiceStub },
                    jwtInterceptorProvider
                ],
                imports: [HttpClientTestingModule]
            });
            httpClient = TestBed.get(HttpClient);
            httpMock = TestBed.get(HttpTestingController);
            authService = TestBed.get(AuthenticationService);
        });

        it('When authenticated user, should add authentication header to each request', () => {

            //Add authenticated user
            authService.setAuthentication(SIMPLE_USER);

            // Make an HTTP GET request
            initiateGetRequest();

            // The following `expectOne()` will match the request's URL.
            const req = mockRequest();

            expect(req.request.headers.has('Authorization')).toEqual(true);
            expect(req.request.headers.get('Authorization')).toBe('Bearer token');
        });

        it('When NO authenticated user, should NOT add authentication header to each request', () => {

            //no user authenticated
            authService.setAuthentication(null);

            // Make an HTTP GET request
            initiateGetRequest();

            // The following `expectOne()` will match the request's URL.
            const req = mockRequest();

            expect(req.request.headers.has('Authorization')).toEqual(false);
        });

        function initiateGetRequest() {
            httpClient.get<any>(testUrl).subscribe(
                res => {
                    expect(res).toBeTruthy();
                });
        }

        function mockRequest() {
            return httpMock.expectOne(testUrl);
        }

    });
});