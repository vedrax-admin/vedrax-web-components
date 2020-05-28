import { NVP } from './nvp';

/**
 * Class that represents a matrix
 */
export class MatrixColumn {

    /**
     * Flag set when visible
     */
    visible: boolean;

    /**
     * The matrix key
     */
    key: string;

    /**
     * The matrix entries
     */
    entries: NVP[]
}