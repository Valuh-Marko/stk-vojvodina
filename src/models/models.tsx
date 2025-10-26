import type { Asset, Entry } from "contentful";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category = "topNews" | "scoreboard" | "events";
export type TeamNavigationConfig = "seniors" | "coaching-staff" | "delegation";

export type RichTextContent = {
  nodeType: string;
  value?: string;
  marks?: any[];
  data: any;
  content: RichTextContent[];
};

export type RichTextDocument = {
  nodeType: "document";
  data: any;
  content: RichTextContent[];
};

export interface TypeSeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface TypeSeoSkeleton {
  fields: TypeSeoFields;
  contentTypeId: "seo";
}

export interface TypeBlogPageFields {
  title?: string;
  slug: string;
  body?: {
    nodeType: "document";
    seo?: Entry<TypeSeoSkeleton>;
  };
  image?: Asset;
  excerpt?: string;
  recommendedPosts?: TypeBlogPage[];
  seo?: Entry<TypeSeoSkeleton>;
}

export interface TypeBlogPageSkeleton {
  fields: TypeBlogPageFields;
  contentTypeId: "blogPage";
}

export type TypeBlogPage = Entry<TypeBlogPageSkeleton>;

export type UseContentfulResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};

export type PlayerFields = {
  playerName: string;
  age: string;
  attributes: string;
  image?: Asset;
};

export type PlayerSkeleton = {
  fields: PlayerFields;
  contentTypeId: "player";
};

export type PlayerEntry = Entry<PlayerSkeleton>;
