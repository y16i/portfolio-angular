export interface IRendered {
  rendered: string;
  protected?: boolean;
}

export interface IWordpressPageInterface {
  id: number;
  title: IRendered;
  content: IRendered;
  date?: Date;
  date_gmt?: Date;
  guid?: IRendered;
  modified?: Date;
  modified_gmt?: Date;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  excerpt?: IRendered;
  author?: number;
  featured_media?: number;
  parent?: number;
  menu_order?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;
  meta?: [];
  _links?: any;
}

export class WordpressPage implements IWordpressPageInterface {
  id: number;
  title: IRendered;
  content: IRendered;

  constructor(data: IWordpressPageInterface) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
  }
}