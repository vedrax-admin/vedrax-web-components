import { ComparatorType } from "../enum/comparator-type";

export class DescriptorActivate {

    /**
     * Field name to be tested
     */
    field: string;

    /**
     * The comparison type
     */
    comparator: ComparatorType;

    /**
     * expected value
     */
    value: any;

}