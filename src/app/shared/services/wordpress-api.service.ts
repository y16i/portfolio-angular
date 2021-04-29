import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseRestApiService } from './base-rest-api';
import { WordpressApiConstants } from './wordpress-api.constant';
import { WordpressPage } from './wordpress-page.model';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService extends BaseRestApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getPage(slug: string): Observable<WordpressPage[]> {
    return this.get<WordpressPage[]>(`${WordpressApiConstants.getPost}`, {params: {slug: slug}})
      .pipe(
        map(results => results.map(result => new WordpressPage(result)))
      );
  }
}
