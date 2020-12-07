import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { ConfigService } from '../../services/config.service';

// case insensitive check against config and value
const startsWithAny = (arr: string[] = []) => (value = '') => {
    return arr.some(test => value.toLowerCase().startsWith(test.toLowerCase()));
};

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['https', 'http', '//']);

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private config: ConfigService) { }

    /**
     * Add JWT token when available in request header
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add authorization header only for API
        if (this.config.isRegisterApi(request.url)) {

            let currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }

        }

        return next.handle(request);
    }
}

export let jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};