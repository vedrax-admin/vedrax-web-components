export class DescriptorErrorEvent {

    /**
     * error time
     */
    eventTime: string;

    /**
     * service context : web by default
     */
    serviceContext: {
        service: string
    };

    /**
     * error message
     */
    message: string;

    context: {
        httpRequest: {
            url: string,
            userAgent?: string
        },
        user?: string
    };


}