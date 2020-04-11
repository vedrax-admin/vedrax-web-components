/**
 * Class for constructing a dynamic url
 */
export class UrlConstructor {

    constructor() { }

    private list: Array<string> = [];

    /**
     * insert fragment
     * @param value 
     */
    setFragment(value: string) {
        if (value) {
            this.list.push(value);
        }
        return this;
    }

    /**
     * Method for constructing a url
     */
    build(): string {
        return '/' + this.list.join("/");
    }

}