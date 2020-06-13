import { DescriptorAction } from './descriptor-action';


/**
 * A class that describes a column
 */
export class DescriptorColumn {

    /**
     * Identification of the column
     */
    id: string;

    /**
     * Label of the column
     */
    label: string;

    /**
     * When boolean value
     */
    withBool?: boolean = false;

    /**
     * Display this value when true
     */
    valueWhenTrue?: string;

    /**
     * Display this value when false
     */
    valueWhenFalse?: string;

    /**
     * Optional actions for the column
     */
    actions?: DescriptorAction[];
}