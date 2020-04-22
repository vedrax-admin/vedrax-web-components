import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';

import { ApiMethod } from '../enum/api-methods';
import { Validate } from '../util/validate';
import { DescriptorForm } from '../descriptor/descriptor-form';

@Injectable({
    providedIn: 'root'
})
export class VedraxApiService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    constructor(private httpClient: HttpClient) { }

    /**
     * Helper method for invoking a HTTP GET
     * @param path the endpoint
     * @param params the query params
     */
    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        Validate.isNotNull(path, 'Path must be provided');

        return this.httpClient.get<T>(path, { params });
    }

    /**
     * Method for calling multiple request at once by passing a map of key/endpoint
     * @param paths 
     */
    getMultipleSource(descriptorForm: DescriptorForm, apiCalls: Map<string, string> = new Map()): Observable<any> {

        let forkJoinObj: object = {
            descriptor: of(descriptorForm)
        };

        apiCalls.forEach((endpoint, key) => {
            forkJoinObj[key] = this.get<any>(endpoint);
        });

        return forkJoin(forkJoinObj);
    }

    /**
     * Helper method for calling either a HTTP POST or a HTTP PUT 
     * @param descriptor the form descriptor
     * @param body the body of the request
     */
    callEndpoint<T>(descriptor: DescriptorForm, body: object = {}): Observable<T> {
        Validate.isNotNull(descriptor, 'Form descriptor must be provided');
        Validate.isNotNull(descriptor.method, 'methid in descriptor must be provided');

        return descriptor.method === ApiMethod.POST ? this.post<T>(descriptor.endpoint, body) : this.put<T>(descriptor.endpoint, body);
    }

    /**
     * Helper method for calling an HTTP PUT endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    put<T>(path: string, body: object = {}): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        return this.httpClient
            .put(path, JSON.stringify(body), this.options);
    }

    /**
     * Helper method for calling an HTTP POST endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    post<T>(path: string, body: object = {}): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        return this.httpClient
            .post(path, JSON.stringify(body), this.options);
    }

}