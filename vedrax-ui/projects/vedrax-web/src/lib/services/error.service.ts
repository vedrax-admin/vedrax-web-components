import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import * as StackTrace from 'stacktrace-js';
import { Validate } from '../util/validate';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private httpClient: HttpClient, private config: ConfigService) { }

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : 'Unexpected Client error';
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.error && error.error.message;
    }

    getServerStack(error: HttpErrorResponse): any {
        return error.error;
    }

    reportToStackdriver(error: Error, path: string, user: string = 'User'): Observable<any> {
        Validate.isNotNull(error, 'error must be provided');
        Validate.isNotNull(path, 'path must be provided');

        const stacktrace = this.stacktraceToString(error);
        const reportedErrorEvent = this.errorToReportedErrorEvent(stacktrace, path, user);

        return this.httpClient
            .post(this.config.getGCPErrorReportingApiEndpoint(), JSON.stringify(reportedErrorEvent), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
            .pipe(
                catchError(error => of({}))
            );

    }

    private stacktraceToString(error: Error): string {

        let lines = [error.toString()];

        StackTrace.fromError(error).then(stackframes => {

            stackframes.forEach(stack => {

                console.log(stack);

                lines.push([
                    '    at ',
                    // If a function name is not available '<anonymous>' will be used.
                    stack.getFunctionName() || '<anonymous>', ' (',
                    stack.getFileName(), ':',
                    stack.getLineNumber(), ':',
                    stack.getColumnNumber(), ')',
                ].join(''));

            });

        });

        return lines.join('\n');
    }

    private errorToReportedErrorEvent(stacktrace: string, url: string, user: string) {
        return {
            eventTime: new Date().toISOString(),
            serviceContext: {
                service: 'web'
            },
            message: stacktrace,
            context: {
                httpRequest: {
                    url: url,
                    userAgent: navigator.userAgent
                },
                user: user
            }
        };
    }


}