export type PostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string;
  author_email: string | null;
  tags: string[];
  status: PostStatus;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export type NewBlogPost = Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>;
export type BlogPostUpdate = Partial<NewBlogPost>;

export interface BlogPostFormState {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  author_email: string;
  tags: string[];
  status: PostStatus;
}

export const EMPTY_POST: BlogPostFormState = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  featured_image: '',
  author: '',
  author_email: '',
  tags: [],
  status: 'draft',
};
