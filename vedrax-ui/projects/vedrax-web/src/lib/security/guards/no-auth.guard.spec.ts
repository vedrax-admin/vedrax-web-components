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

const router = {
    navigate: jasmine.createSpy('navigate')
  }

describe('NoAuthGuard', () => {
    describe('canActivate', () => {
        let noAuthGuard: NoAuthGuard;
        let authService: AuthenticationService;
        
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [NoAuthGuard,
                    { provide: Router, useValue: router },
                    { provide: AuthenticationService, useClass: AuthenticationServiceStub }
                ]
            });
            
            authService = TestBed.get(AuthenticationService);
            //set logged in administrator by default
            authService.setAuthentication(ADMINISTRATOR);
            noAuthGuard = TestBed.get(NoAuthGuard);
        });

        it('When user is logged in returns false', () => {

            expect(noAuthGuard.canActivate()).toEqual(false);
            //redirect to home page
            expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        });

        it('When user is NOT logged in returns true', () => {

            //no user currently logged in
            authService.setAuthentication(null);

            expect(noAuthGuard.canActivate()).toEqual(true); 
        });

    });
});


