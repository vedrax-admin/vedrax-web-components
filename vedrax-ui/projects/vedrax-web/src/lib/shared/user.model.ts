import { Role } from "./role.enum";

/**
 * The returned User representation for authentication API
 */
export class User {
    /**
     * Username
     */
    email: string;

    /**
     * Full name
     */
    fullName: string;

    /**
     * User role
     */
    userRole: Role;

    /**
     * The security JWT which will be used in each subsequent request
     */
    token: string;
}

