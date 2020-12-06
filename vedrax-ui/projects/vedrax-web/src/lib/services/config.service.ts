import { Inject, Injectable } from '@angular/core';
import { Configuration } from '../shared/configuration';
import { VEDRAX_CONFIG } from '../shared/di';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(@Inject(VEDRAX_CONFIG) private config: Configuration) { }

    getHostname(): string {
        return this.config.hostname;
    }

    getBaseUrl(): string {
        return `https://${this.getHostname()}`;
    }

    getGCPProjectId(): string {
        return this.config.gcpProjectId;
    }

    getGCPErrorReportingApiKey(): string {
        return this.config.gcpErrorReportingApiKey;
    }

    getGCPErrorReportingApiEndpoint(): string {
        return `https://clouderrorreporting.googleapis.com/v1beta1/projects/${this.getGCPProjectId()}/events:report?key=${this.getGCPErrorReportingApiKey()}`;
    }

}