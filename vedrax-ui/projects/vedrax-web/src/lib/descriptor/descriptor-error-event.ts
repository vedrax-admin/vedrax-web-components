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

    /**
     * Complete stack trace
     */
    stack_trace: any;

    context: {
        httpRequest: {
            method: string,
            url: string,
            userAgent: string
        },
        user: string
    };


}