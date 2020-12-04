import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoggingService } from '../../services/logging.service';
import { SnackbarService } from '../../services/snackbar.service';

/**
 * Global error handler. Used it by adding to provider of the root module
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    if(!this.injector){
      console.log("no injector");
    }

    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(SnackbarService);
    const router = this.injector.get(Router);

    let message;

    if (error instanceof HttpErrorResponse) {

      //server error
      message = `SERVER ERROR: ${error.error && error.error.message}`;
      logger.logError(message, error.error);

      if (error.status == 500) {
        router.navigate(['/error']);
      }
    } else {
      //client error
      message = `CLIENT ERROR: ${error.message}`;
      const stackTrace = error.stack;
      logger.logError(message, stackTrace);
    }

    notifier.showError(message);

  }
}