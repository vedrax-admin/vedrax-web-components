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
     * Optional actions for the column
     */
    actions?: DescriptorAction[];
}