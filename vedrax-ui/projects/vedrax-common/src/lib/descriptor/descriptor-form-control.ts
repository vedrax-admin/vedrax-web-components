import { DescriptorProperty } from './descriptor-property';
import { DescriptorValidation } from './descriptor-validation';
import { DescriptorOption } from './descriptor-option';
import { DescriptorTable } from './descriptor-table';
import { ControlType } from '../enum/control-types';


/**
 * Class that describes a control
 */
export class DescriptorFormControl {

    /**
     * The control name or identification
     */
    controlName: string;

    /**
     * The control properties (e.g. text, hidden, multiple...)
     */
    controlProperties: DescriptorProperty[] = [];

    /**
     * The control label
     */
    controlLabel: string;

    /**
     * The control type (e.g. input, select, datepicker...)
     */
    controlType: ControlType;

    /**
     * The optional control hint
     */
    controlHint?: string;

    /**
     * The optional control value
     */
    controlValue?: any;

    /**
     * List of optional validations
     */
    controlValidations?: DescriptorValidation[];

    /**
     * List of optional options used mainly in the 'SELECT' control
     */
    controlOptions?: DescriptorOption[];

    /**
     * The 'ARRAY_CONTROLS' uses this list of inner controls 
     * for creating a dynamic form component.
     */
    controlChildren?: DescriptorFormControl[];

    /**
     * The 'SEARCH' control uses this key 
     * to select and display the object property accordingly
     */
    controlDisplayKey?: string;

    /**
     * The 'SEARCH' control uses this value 
     * to display an object property mapped to the controlDisplayKey
     * (e.g. company name rather than company ID)
     */
    controlDisplayValue?: string;

    /**
     * The 'SEARCH' control uses this optional object for 
     * generating the searching table accordingly
     */
    controlSearch?: DescriptorTable;
}