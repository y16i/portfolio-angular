import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from './base-rest-api.service';
import { WordpressUrl } from './wordpress-api.constant';
import { WordpressPageMin } from './wordpress-page.model';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getPage(slug: string): Observable<WordpressPageMin[]> {
    return this.get<WordpressPageMin[]>(`${WordpressUrl.getPost}`, {params: {slug: slug}});
  }
}
