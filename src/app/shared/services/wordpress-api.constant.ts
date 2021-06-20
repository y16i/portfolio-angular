import { environment } from 'src/environments/environment';

export class WordpressUrl {
  public static pagesUri = `${environment.api.server}/${environment.api.url}/${environment.api.version}/pages`;
  public static getPost = WordpressUrl.pagesUri;
}
