import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMethod } from '../enum/api-methods';
import { Validate } from '../util/validate';

@Injectable({ providedIn: 'root' })
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
     * Helper method for calling either a HTTP POST or a HTTP PUT 
     * @param path the endpoint
     * @param body the body of the request
     * @param method POST or PUT method
     */
    callEndpoint(path: string, body: object = {}, method: ApiMethod = ApiMethod.POST): Observable<any> {

        this.transformToISODate(body);

        return method === ApiMethod.POST ? this.post(path, body) : this.put(path, body);
    }

    /**
     * Helper method for transforming date to ISO format
     * @param body the body of the request
     */
    private transformToISODate(body: object = {}): void {
        for (const key in body) {
            const attribute = body[key];

            if (attribute instanceof Date) {
                body[key] = attribute.toISOString();
            }
        }
    }

    /**
     * Helper method for calling an HTTP PUT endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    private put(path: string, body: object = {}): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        return this.httpClient
            .put(path, JSON.stringify(body), this.options);
    }

    /**
     * Helper method for calling an HTTP POST endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    private post(path: string, body: object = {}): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        return this.httpClient
            .post(path, JSON.stringify(body), this.options);
    }

}