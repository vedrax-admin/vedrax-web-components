import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../shared/role.enum';
import { AuthenticationServiceStub } from '../../services/authentication.service.stub';
import { User } from '../../shared/user.model';

const ADMINISTRATOR: User = {
    email: 'remy.penchenat@vedrax.com',
    fullName: 'Remy Penchenat',
    userRole: Role.ADMIN,
    token: 'token'
}

const SIMPLE_USER: User = {
    email: 'elodie.penchenat@vedrax.com',
    fullName: 'Elodie Penchenat',
    userRole: Role.USER,
    token: 'token'
}

class MockActivatedRouteSnapshot {
    private _data: any;
    get data() {
        return this._data;
    }
}

class MockRouterStateSnapshot {
    url: string = '/';
}

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let authService: AuthenticationService;
    let routeMock: any = { url: '/users', data: { roles: [Role.ADMIN] } };
    let routeStateMock: any = { url: '/users' };
    let routerMock = { navigate: jasmine.createSpy('navigate') };
    let router: Router;


    describe('canActivate', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [AuthGuard,
                    { provide: Router, useValue: routerMock },
                    { provide: ActivatedRouteSnapshot, useValue: routeMock },
                    { provide: AuthenticationService, useClass: AuthenticationServiceStub },
                    { provide: RouterStateSnapshot, useValue: routeStateMock }
                ],
                imports: [HttpClientTestingModule]
            });
            router = TestBed.get(Router);
            authService = TestBed.get(AuthenticationService);
            authGuard = TestBed.get(AuthGuard);

            routeMock = { url: '/users', data: { roles: [Role.ADMIN] } };
            routeStateMock = { url: '/users' };
        });

        it('When logged in user has permission returns true ', () => {

            authService.setAuthentication(ADMINISTRATOR);

            expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
        });

        
        it('When logged in user has NO permission returns false and redirect to home page', () => {

            authService.setAuthentication(SIMPLE_USER);

            expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        });

        

        it('logged in user can go to authorized page', () => {

            authService.setAuthentication(SIMPLE_USER);

            routeMock = { url: '/public' };

            expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
        });

        it('When user is not logged in returns false and redirect to authentication page', () => {

            //not authenticated
            authService.setAuthentication(null);

            expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/'], { queryParams: { returnUrl: '/users' } });
        });

    });
});