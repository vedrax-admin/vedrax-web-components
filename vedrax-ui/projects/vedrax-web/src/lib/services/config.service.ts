import { Inject, Injectable } from '@angular/core';
import { Configuration } from '../shared/configuration';
import { VEDRAX_CONFIG_TOKEN } from '../shared/di';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(@Inject(VEDRAX_CONFIG_TOKEN) private config: Configuration) { }

    getHostname(): string {
        return this.config.hostname;
    }

    getGCPProjectId(): string {
        return this.config.gcpProjectId;
    }

    getGCPErrorReportingApiKey(): string {
        return this.config.gcpErrorReportingApiKey;
    }

    getGCPErrorReportingApiEndpoint(): string {
        return `https://clouderrorreporting.googleapis.com/v1beta1/projects/${this.getGCPProjectId}/events:report?key=${this.getGCPErrorReportingApiKey}`;
    }

}