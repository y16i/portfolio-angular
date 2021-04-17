import { environment } from 'src/environments/environment';

export class WordpressApiConstants {
  public static serverUrl = `${environment.api.url}/${environment.api.version}/posts?slug=`;
  public static getPost = WordpressApiConstants.serverUrl;
}
