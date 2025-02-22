export interface Article {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  url: string;
  user: {
    name: string;
    profile_image: string;
  };
  public_reactions_count: number;
  comments_count: number;
}

export interface Comment {
  id: number;
  body_html: string;
  created_at: string;
  user: {
    name: string;
    profile_image: string;
  };
}