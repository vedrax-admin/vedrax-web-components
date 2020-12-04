import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DescriptorErrorEvent } from '../descriptor/descriptor-error-event';
import { Observable } from 'rxjs';

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
        return error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        return error.error && error.error.message;;
    }

    reportToStackdriver(projectId:string, apiKey:string, reportedErrorEvent:DescriptorErrorEvent): Observable<any>{
        const url = `https://clouderrorreporting.googleapis.com/v1beta1/projects/${projectId}/events:report?key=${apiKey}`;
        return this.httpClient
            .post(url, JSON.stringify(reportedErrorEvent), { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }

}