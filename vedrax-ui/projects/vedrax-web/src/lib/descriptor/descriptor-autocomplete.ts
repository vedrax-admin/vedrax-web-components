import { NVP } from '../shared/nvp';

export class DescriptorAutocomplete {
    
    /**
     * The search URL
     */
    endpoint: string;

    /**
     * The display key
     */
    displayKey: string;

    /**
     * Default params
     */
    defaultParams?: NVP[] = [];
}