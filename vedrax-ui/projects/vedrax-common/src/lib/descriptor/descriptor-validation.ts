/**
 * Class that describes a control validation
 */
export class DescriptorValidation {

    /**
     * Validation name (e.g. required, min, max...)
     */
    validationName: string;

    /**
     * Validation value may be a boolean, string (pattern) or number (limit)
     */
    validationValue: any;

    /**
     * Error message
     */
    validationMessage: string;
}