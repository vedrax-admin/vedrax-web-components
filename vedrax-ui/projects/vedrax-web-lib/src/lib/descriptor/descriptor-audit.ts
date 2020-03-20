/**
 * Class for describing the auditing information
 */
export class DescriptorAudit {

    /**
     * Date as ISO string representing when the entity has been created
     */
    createdDate: string;

    /**
     * User identification responsible for the creation of the entity
     */
    createdBy: string;

    /**
     * Date as ISO string representing when the entity has been updated
     */
    modifiedDate: string;

    /**
     * User identification responsible for the modification of the entity
     */
    modifiedBy: string;
}