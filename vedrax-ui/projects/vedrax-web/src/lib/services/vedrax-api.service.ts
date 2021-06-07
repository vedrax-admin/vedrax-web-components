import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';

import { ApiMethod } from '../enum/api-methods';
import { Validate } from '../util/validate';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorEndpoint } from '../descriptor/descriptor-endpoint';


export class FormDataWithContentType {
    form: FormData;
    contentType: string;
}

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
     * Method for calling multiple request at once by passing a list of descriptorEndpoint
     * @param paths 
     */
    callEndpoints(apiCalls: DescriptorEndpoint[] = []): Observable<any> {

        let forkJoinObj: object = {};

        apiCalls.forEach(endpoint => {
            forkJoinObj[endpoint.key] = this.get<any>(endpoint.url);
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

        return descriptor.method === ApiMethod.POST ?
            this.post<T>(descriptor.endpoint, body, descriptor.multipart) :
            this.put<T>(descriptor.endpoint, body, descriptor.multipart);
    }

    /**
     * Helper method for calling an HTTP PUT endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    put<T>(path: string, body: object = {}, multipart: boolean = false): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        if (multipart) {
            const formDataWithContentType: FormDataWithContentType = this.toFormData(body);
            return this.httpClient.put(path, formDataWithContentType.form, this.setHeader(formDataWithContentType.contentType));
        }

        return this.httpClient
            .put(path, JSON.stringify(body), this.options);
    }

    /**
     * Helper method for calling an HTTP POST endpoint
     * @param path the endpoint
     * @param body the body of the request
     */
    post<T>(path: string, body: object = {}, multipart: boolean = false): Observable<any> {
        Validate.isNotNull(path, 'Path must be provided');

        if (multipart) {
            const formDataWithContentType: FormDataWithContentType = this.toFormData(body);
            return this.httpClient.post(path, formDataWithContentType.form, this.setHeader(formDataWithContentType.contentType));
        }

        return this.httpClient
            .post(path, JSON.stringify(body), this.options);
    }

    /**
     * Helper method for converting body to FormData.
     * Used for passing MultiPart file along with attributes
     * @param body 
     */
    private toFormData(body: object = {}): FormDataWithContentType {
        let formData = new FormData();

        let nbOfFile = 0;

        for (const key of Object.keys(body)) {
            const value = body[key];

            if (value) {

                nbOfFile += this.isFile(value);

                formData.append(key, value);
            }
        }

        const contentTypeValue = nbOfFile > 0 ? 'multipart/form-data' : 'application/json';

        return { form: formData, contentType: contentTypeValue };

    }

    private isFile(value: any): number {
        return value instanceof File ? 1 : 0;
    }

    private setHeader(contentType: string): any {
        return { headers: new HttpHeaders().set('Content-Type', contentType) };
    }

}