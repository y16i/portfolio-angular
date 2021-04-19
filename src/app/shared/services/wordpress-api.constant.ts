import { environment } from 'src/environments/environment';

export class WordpressApiConstants {
  public static pagesUri = `${environment.api.server}/${environment.api.url}/${environment.api.version}/pages`;
  public static getPost = WordpressApiConstants.pagesUri;
}
