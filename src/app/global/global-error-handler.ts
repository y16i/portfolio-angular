import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    let message: string = '';
    let stackTrace: string = '';
    // Server error
    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      console.trace('server error:', error);
    } else {
    // Client error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      console.log(error.stack);
    }
  }
}
