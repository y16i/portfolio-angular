export interface IRendered {
  rendered: string;
  protected?: boolean;
}

// for go wordpress api
export interface WordpressPageMin {
  id: number;
  title: IRendered;
  content: IRendered;
}

// for wordpress api
export interface WordpressPage extends WordpressPageMin {
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
