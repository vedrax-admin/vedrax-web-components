import { UrlConstructor } from "./url-constructor";

describe('UrlConstructor', () => {

    it('should add fragments', () => {

        let url: string = new UrlConstructor()
            .setFragment('test')
            .setFragment('api')
            .build();

        expect(url).toBe('/test/api');

    });

    it('should add fragments for creating URL', () => {

        let url: string = new UrlConstructor()
            .setFragment('um/descriptor/form/users')
            .setFragment(null)
            .setFragment('finance@vedrax.com')
            .setFragment('credentials')
            .build();

        expect(url).toBe('/um/descriptor/form/users/finance@vedrax.com/credentials');

    });


});