import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService } from '../../services/logging.service';
import { SnackbarService } from '../../services/snackbar.service';

/**
 * Global error handler. Used it by adding to provider of the root module
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(SnackbarService)

    let message;

    if (error instanceof HttpErrorResponse) {
      //server error
      message = error.error && error.error.message;
      logger.logError(message, error.error);
    } else {
      //client error
      message = error.message;
      const stackTrace = error.stack;
      logger.logError(message, stackTrace);
    }

    notifier.showError(message);
    
  }
}