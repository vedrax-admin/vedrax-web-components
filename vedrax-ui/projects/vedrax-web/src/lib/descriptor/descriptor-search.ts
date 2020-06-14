import { DescriptorFormControl } from './descriptor-form-control';
import { DescriptorEndpoint } from './descriptor-endpoint';

export class DescriptorSearch {

    /**
     * List of form controls
     */
    controls: DescriptorFormControl[] = [];

    /**
    * The list of endpoint if any
    */
    lovs?: DescriptorEndpoint[];

}