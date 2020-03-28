import { DescriptorFormControl } from './descriptor-form-control';
import { DescriptorFormGroup } from './descriptor-form-group';
import { ApiMethod } from '../enum/api-methods';


/**
 * Class that describes a simple form
 */
export class DescriptorForm {

    /**
     * List of form controls
     */
    controls: DescriptorFormControl[] = [];

    /**
     * Set optional Group of controls
     */
    groups?: DescriptorFormGroup[];

    /**
     * API endpoint to call when submit
     */
    endpoint: string;

    /**
     * API Method
     */
    method: ApiMethod;

    /**
     *  Redirect url when the API returns OK
     */
    successUrl?: string;

}