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
    // this.loadingService.loadingStart();
    if (request.headers) {
      // add a token to all http outgoings
      // const auth = request.headers.get('Authorization');
      // if (!auth?.includes('Bearer ')) {
        // const token = this.cookieService.get('AccessToken');
      //   if (token) {
      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });
      //   }
      // }
    }

    // When you send a file, it will be FormData
    if (!(request.body instanceof FormData)) {
      if (!request.headers.has('Content-Type')) {
        if (request.method === 'PATCH') {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json-patch; charset=utf-8') });
        } else {
          if (request?.body?.updates?.length > 0) {
          // Query Param
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8') });
          } else {
          // others
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
          }
        }
      }
    }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      catchError(errorResponse => this.catchError(errorResponse)),
      // finalize(() => this.loadingService.loadingEnd())
    );
  }

  private catchError(errorResponse: HttpErrorResponse) {
    if (!errorResponse || !errorResponse.status) {
      return throwError(errorResponse);
    }
    switch (errorResponse.status) {
      case (401):
        const errorName = errorResponse.error && errorResponse.error.error;
        // if (errorName === 'InvalidToken') {
        // } else {
        //   const token = this.cookieService.get('AccessToken');
        //   if (!token || token === '') {
        //     this.router.navigate(['/login']);
        //   } else {
        //   }
        // }
        return EMPTY;
      case (400):
        const possibleBadCredentialMsg = errorResponse.error.error_description;
        if (possibleBadCredentialMsg && possibleBadCredentialMsg === 'Bad credentials') {
          return EMPTY;
        }
        break;
    }
    return throwError(errorResponse);
  }
}
