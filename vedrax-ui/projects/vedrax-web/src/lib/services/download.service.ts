import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(private httpClient: HttpClient) { }

    download(url: string, params: HttpParams = new HttpParams()): Observable<Blob> {
        return this.httpClient.get(url, {
            responseType: 'blob',
            params: params
        });
    }

}