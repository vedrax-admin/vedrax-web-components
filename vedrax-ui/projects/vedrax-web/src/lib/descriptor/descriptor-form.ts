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