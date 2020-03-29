import { Injectable } from '@angular/core';

/**
 * Class for constructing a dynamic url
 */
@Injectable({
    providedIn: 'root'
})
export class UrlService {

    private list: Array<string> = [];

    /**
     * Reset the list
     */
    reset() {
        this.list = [];
    }

    /**
     * insert fragment
     * @param value 
     */
    insertFragment(value: string): void {
        if (value) {
            this.list.push(value);
        }
    }

    /**
     * Method for constructing a url
     */
    construct(): string {
        return '/' + this.list.join("/");
    }

}