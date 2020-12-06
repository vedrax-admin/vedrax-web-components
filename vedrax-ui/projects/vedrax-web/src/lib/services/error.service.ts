import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs';
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

    reportToStackdriver(error: Error, path: string, user: string = 'User') {
        Validate.isNotNull(error, 'error must be provided');
        Validate.isNotNull(path, 'path must be provided');

        this.resolveError(error).then(stack => {
            const reportedErrorEvent = this.errorToReportedErrorEvent(stack, path, user);
            this.sendError(reportedErrorEvent);
        });
    }

    private resolveError(error: Error) {

        return StackTrace.fromError(error).then(stack => {

            let lines = [error.toString()];

            stack.forEach(s => {
                lines.push([
                    '    at ',
                    s.getFunctionName() || '<anonymous>', ' (',
                    s.getFileName(), ':',
                    s.getLineNumber(), ':',
                    s.getColumnNumber(), ')',
                ].join(''));
            })

            return lines.join('\n');
        });

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

    private sendError(reportedErrorEvent) {
        this.httpClient
            .post(this.config.getGCPErrorReportingApiEndpoint(), JSON.stringify(reportedErrorEvent),
                { headers: new HttpHeaders().set('Content-Type', 'application/json') })
            .pipe(
                catchError(error => of({}))
            ).subscribe();
    }


}