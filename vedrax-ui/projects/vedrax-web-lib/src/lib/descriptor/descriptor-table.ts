import { DescriptorAction } from './descriptor-action';
import { DescriptorFormControl } from './descriptor-form-control';
import { DescriptorColumn } from './descriptor-column';

/**
 * Class that describes a table
 */
export class DescriptorTable {

    /**
     * The title / object of the table
     */
    title: string;

    /**
     * action descriptor for describing creation action
     */
    onCreate?: DescriptorAction;

    /**
     * Is the result paginated
     */
    paginated: boolean = false;

    /**
     * Should load data on component initialization
     */
    loadOnInit: boolean = false;

    /**
     * The endpoint for getting the data
     */
    path: string;

    /**
     * The controls to search the data for
     */
    searchControls?: DescriptorFormControl[];

    /**
     * The list of columns displayed
     */
    columns: DescriptorColumn[] = [];

    /**
     * The table values if any
     */
    values?: any[];
}