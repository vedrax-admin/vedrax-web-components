/**
 * Class that represents the library configuration
 */
export class Configuration {

    /**
     * The hostname where the application is deployed
     */
    hostname:string;

    /**
     * The GCP project ID
     */
    gcpProjectId:string;

    /**
     * The GCP Stackdriver API Key used for authorization
     */
    gcpErrorReportingApiKey:string;

}