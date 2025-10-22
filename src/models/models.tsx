export type Category = "topNews" | "scoreboard" | "events";

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

export type ContentfulCategory = {
  sys: {
    id: string;
    type: string;
    contentType?: { sys: { id: string } };
    [key: string]: any;
  };
  fields: {
    title: string;
    slug: string;
    description: RichTextDocument;
  };
};

export type ContentfulImage = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
};

export type BlogPage = {
  id: string;
  title: string;
  slug: string;
  category: ContentfulCategory[];
  body: RichTextDocument;
  image: ContentfulImage;
  excerpt: string;
};

export type UseContentfulResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};
