import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NoAuthGuard } from './no-auth.guard';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationServiceStub } from '../../services/authentication.service.stub';
import { User } from '../../shared/user.model';
import { Role } from '../../shared/role.enum';

const ADMINISTRATOR: User = {
    email: 'remy.penchenat@vedrax.com',
    fullName: 'Remy Penchenat',
    userRole: Role.ADMIN,
    token: 'token'
}

class MockRouter {
    navigate(path) { }
}

describe('NoAuthGuard', () => {
    describe('canActivate', () => {
        let noAuthGuard: NoAuthGuard;
        let authService: AuthenticationService;
        let router: Router;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [NoAuthGuard,
                    { provide: Router, useClass: MockRouter },
                    { provide: AuthenticationService, useClass: AuthenticationServiceStub }
                ]
            });
            router = TestBed.get(Router);
            spyOn(router, 'navigate');
            authService = TestBed.get(AuthenticationService);
            //set logged in administrator by default
            authService.setAuthentication(ADMINISTRATOR);
            noAuthGuard = TestBed.get(NoAuthGuard);
        });

        it('When user is logged in returns false', () => {

            expect(noAuthGuard.canActivate()).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        it('When user is NOT logged in returns true', () => {

            //no user currently logged in
            authService.setAuthentication(null);

            expect(noAuthGuard.canActivate()).toEqual(true); 
        });

    });
});


