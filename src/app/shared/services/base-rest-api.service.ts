import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export abstract class BaseRestApiService {
  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  public get<T>(url: string, options?: object, raw = false): Observable<T> {
    return this.httpClient.get<T>(url, options).pipe(map((response: any) => {
      return <T> response;
    }));
  }

  public post<T>(url: string, body?: any | any, options?: any): Observable<T> {
    return this.httpClient.post<T>(url, body, options).pipe(map((response: any) => {
      return <T> response;
    }));
  }

  public put<T>(url: string, body?: any, options?: any): Observable<T> {
    return this.httpClient.put<T>(url, body, options).pipe(map((response: any) => {
      return <T> response;
    }));
  }

  public patch<T>(url: string, body?: any, options?: any): Observable<T> {
    return this.httpClient.patch<T>(url, body, options).pipe(map((response: any) => {
      return <T> response;
    }));
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.httpClient.delete<T>(url, options).pipe(map((response: any) => {
      return <T> response;
    }));
  }
}
