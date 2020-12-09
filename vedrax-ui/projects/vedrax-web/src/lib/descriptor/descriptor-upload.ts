import { ApiMethod } from '../enum/api-methods';

/**
 * Class that describes a upload form
 */
export class DescriptorUpload {

    /**
     * Title of the form
     */
    title: string;

    /**
     * Label of button
     */
    label: string;

    /**
     * API endpoint to call when submit
     */
    endpoint: string;

    /**
     * API Method
     */
    method: ApiMethod;

    /**
     * Accept multiple files
     */
    multiple: boolean = false;

    /**
     * Type of files accepted as a list of MIME (e.g.: "image/png, image/jpeg") 
     */
    accept?: string;

}