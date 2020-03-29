import { DescriptorForm } from './descriptor-form';


/**
 * Class that represents a form embedded in a modal component
 */
export class DescriptorModal {

    constructor(
        /**
         * The modal title
         */
        public title: string,

        /**
         * The form to be embedded in the content section of the modal
         */
        public formDescriptor: DescriptorForm
    ) { }

}