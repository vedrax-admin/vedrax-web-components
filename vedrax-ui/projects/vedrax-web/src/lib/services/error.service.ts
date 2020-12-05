import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DescriptorErrorEvent } from '../descriptor/descriptor-error-event';
import { Observable } from 'rxjs';

import * as StackTrace from 'stacktrace-js';
import { Validate } from '../util/validate';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private httpClient: HttpClient) { }

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

    getServerStack(error: HttpErrorResponse): string {
        return 'stack';
    }

    reportToStackdriver(projectId: string, apiKey: string, error: Error, path: string): Observable<any> {
        Validate.isNotNull(projectId, 'project ID must be provided');
        Validate.isNotNull(apiKey, 'api key must be provided');
        Validate.isNotNull(error, 'error must be provided');
        Validate.isNotNull(path, 'path must be provided');

        const url = `https://clouderrorreporting.googleapis.com/v1beta1/projects/${projectId}/events:report?key=${apiKey}`;
        const stacktrace = this.stacktraceToString(error);
        const reportedErrorEvent = this.errorToReportedErrorEvent(stacktrace, path);

        return this.httpClient
            .post(url, JSON.stringify(reportedErrorEvent), { headers: new HttpHeaders().set('Content-Type', 'application/json') });

    }

    private stacktraceToString(error: Error): string {

        let stackString = '';

        StackTrace.fromError(error).then(stackframes => {
            stackString = stackframes
                .splice(0, 20)
                .map(function (sf) {
                    return sf.toString();
                }).join('\n');
        });

        return stackString;
    }

    private errorToReportedErrorEvent(stacktrace: string, url: string, user: string = 'User') {
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