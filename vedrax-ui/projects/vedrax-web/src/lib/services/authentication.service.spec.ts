import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { VedraxApiService } from './vedrax-api.service';
import { User } from '../shared/user.model';
import { Role } from '../shared/role.enum';

const SIMPLE_USER: User = {
    email: 'elodie.penchenat@vedrax.com',
    fullName: 'Elodie Penchenat',
    userRole: Role.USER,
    token: 'token'
}

describe('AuthenticationService', () => {
    let apiService: VedraxApiService;
    let authenticationService: AuthenticationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VedraxApiService,
                AuthenticationService
            ],
            imports: [HttpClientTestingModule]
        });
        apiService = TestBed.get(VedraxApiService);
        //returns an observable user when making login request
        spyOn(apiService, 'post').and.returnValue(of(SIMPLE_USER));
        httpMock = TestBed.get(HttpTestingController);
        authenticationService = TestBed.get(AuthenticationService);
    });

    it('When user provides valid credentials, it returns the user', () => {

        spyOn(localStorage, 'setItem');
        spyOn(authenticationService, 'setAuthentication');

        authenticationService.login({ email: 'username', password: 'password' })
            .subscribe((user: User) => {
                testUser(user);
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(authenticationService.setAuthentication).toHaveBeenCalledWith(user);
            });
    });

    it('When user logged out, remove from local storage', () => {

        spyOn(localStorage, 'removeItem');
        spyOn(authenticationService, 'setAuthentication');

        authenticationService.logout();

        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(authenticationService.setAuthentication).toHaveBeenCalledWith(null);
    });

    /**
     * Helping method for checking the returned user
     * 
     * @param data The returned data
     */
    function testUser(user: User) {
        expect(user.fullName).toBe(SIMPLE_USER.fullName);
        expect(user.token).toBe(SIMPLE_USER.token);
    }

});