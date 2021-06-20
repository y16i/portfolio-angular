import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {
  }

  // Client Error
  public getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet';
    }
    return error.message ? error.message : error.toString();
  }

  public getClientStack(error: Error): string {
    return error.stack;
  }

  // Server Error
  public getServerMessage(error: Error): string {
    return error.message;
  }

  public getServerStack(error: Error): string {
    return 'server stack';
  }
}
