import { ActionType } from '../enum/action-types';

/**
 * A class that describes the available actions for a column
 */
export class DescriptorAction {

    /**
     * The action label
     */
    label: string;

    /**
     * when set to true the action redirect to the given url, 
     * otherwise the action call an API with the URL
     */
    action: ActionType;

    /**
     * Base url used for redirection or for API call
     */
    url?: string;

    /**
     * An optional fragment to append to the url and item identification
     * <url>/<id>/<fragment>
     */
    fragment?: string;

    /**
     * Flag for defining if the table should be updated
     */
    updatable?: boolean;
}