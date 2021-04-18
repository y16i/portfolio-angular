import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from './base-rest-api';
import { WordpressApiConstants } from './wordpress-api.constant';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http);
  }
  
  public getPage(slug: string): Observable<any> {
    return this.get<any>(`${WordpressApiConstants.getPost}${slug}`);
  }
}
