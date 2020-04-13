import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService } from '../../services/logging.service';
import { SnackbarService } from '../../services/snackbar.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(SnackbarService)

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      //server error
      message = error.message;
      stackTrace = 'stack';
    } else {
      //client error
      message = error.message;
      stackTrace = error.stack;
    }

    notifier.showError(message);
    logger.logError(message, stackTrace);
  }
}