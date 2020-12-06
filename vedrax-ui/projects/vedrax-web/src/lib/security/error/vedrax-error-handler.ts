import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggingService } from '../../services/logging.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ErrorService } from '../../services/error.service';

/**
 * Global error handler. Used it by adding to provider of the root module
 */
@Injectable()
export class VedraxErrorHandler implements ErrorHandler {

  errorReporting: any;

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {

    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(SnackbarService);
    const errorService = this.injector.get(ErrorService);
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';

    let message;
    let stack;

    if (error instanceof HttpErrorResponse) {

      //server error
      if (error.status == 500) {
        this.redirectToErrorPage();
      } else {
        message = errorService.getServerMessage(error);
        stack = errorService.getServerStack(error);
        notifier.showError(message);
      }

    } else {
      //client error
      message = errorService.getClientMessage(error);
      stack = errorService.getClientStack(error);
      errorService.reportToStackdriver(error, url)
        .subscribe();
      this.redirectToErrorPage();
    }

    //always log error
    logger.logError(message, stack);

  }

  private redirectToErrorPage() {
    const router = this.injector.get(Router);
    router.navigate(['/error']);
  }
}