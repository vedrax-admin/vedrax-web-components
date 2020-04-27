import { DescriptorFormControl } from './descriptor-form-control';
import { DescriptorFormGroup } from './descriptor-form-group';
import { ApiMethod } from '../enum/api-methods';
import { DescriptorEndpoint } from './descriptor-endpoint';


/**
 * Class that describes a simple form
 */
export class DescriptorForm {

    /**
     * Title of the form
     */
    title: string;

    /**
     * List of form controls
     */
    controls: DescriptorFormControl[] = [];

    /**
     * Set optional Group of controls
     */
    groups?: DescriptorFormGroup[];

    /**
     * The list of endpoint
     */
    lovs?: DescriptorEndpoint[];

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

    /**
     * The label of the submit button
     */
    submitLabel?: string = 'Submit';

    /**
     * The label of the cancel button
     */
    cancelLabel?: string = 'Cancel';

    /**
     * The success message
     */
    successMessage?: string = 'Success';

    /**
     * when true the table is updated with the returned item
     */
    updateTable?: boolean;

}