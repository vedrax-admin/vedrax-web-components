import { ApiStatus } from './api-status';

/**
 * Class that represents the API response wrapper
 */
export class ResponseWrapper {
    status: ApiStatus;
    data: any;
}