import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class RestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(errorResponse => this.catchError(errorResponse)),
    );
  }

  private catchError(errorResponse: HttpErrorResponse): Observable<never> {
    if (!errorResponse || !errorResponse.status) {
      return throwError(errorResponse);
    }
    switch (errorResponse.status) {
      // Bad Request
      case 400:
      // Unauthorized
      case 401:
      // Forbidden
      case 403:
      // Not Found
      case 404:
      // Conflict
      case 409:
      // Internal Server Error
      case 500:
      // Unavailable
      case 503:
        return EMPTY;
    }
    return throwError(errorResponse);
  }
}
