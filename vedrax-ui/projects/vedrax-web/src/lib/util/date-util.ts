export class DateUtil {
    
    static transformToISODate(body: object = {}): void {
        for (const key in body) {
            const attribute = body[key];

            if (attribute instanceof Date) {
                body[key] = attribute.toISOString();
            }
        }
    }

    static addMonths(date: Date, n: number) {
        n = n > 0 ? n : 0;
        date = date == null ? new Date() : new Date(date);
        return new Date(date.setMonth(date.getMonth() + n));
    }
    
}