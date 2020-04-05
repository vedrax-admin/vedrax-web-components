export class DateUtil {
    
    static transformToISODate(body: object = {}): void {
        for (const key in body) {
            const attribute = body[key];

            if (attribute instanceof Date) {
                body[key] = attribute.toISOString();
            }
        }
    }
    
}