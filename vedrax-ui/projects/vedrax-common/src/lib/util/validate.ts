export class Validate {
    
    static isNotNull(value: any, message: string = 'value must be provided') {
        if (!value) {
            throw new Error(message);
        }
    }
}