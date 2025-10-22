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
  body: RichTextDocument;
  image: ContentfulImage;
  excerpt: string;
  seo?: any;
  metadata: {
    tags: { sys: { id: string; type: string; linkType: string } }[];
    concepts: any[];
  };
  tags?: { id: string; title: string }[];
};

export type UseContentfulResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};
