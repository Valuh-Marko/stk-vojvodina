import type { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { Asset, Entry } from "contentful";

type PostFields = {
  title?: string;
  excerpt?: string;
  body?: Document;
  image?: Asset<undefined>;
  recommendedPosts?: Entry[];
};

/* Everything a post is drawn with. Any of it can be missing. */
export const getPostView = (entry?: unknown) => {
  const post = entry as Entry | undefined;
  const fields = post?.fields as unknown as PostFields | undefined;
  const photo = fields?.image?.fields;
  const { width, height } = photo?.file?.details?.image ?? {};
  const url = photo?.file?.url;

  return {
    entry: post as Entry,
    id: post?.sys?.id,
    title: fields?.title,
    excerpt: fields?.excerpt,
    body: fields?.body as Document,
    date: post?.sys?.updatedAt
      ? new Date(post.sys.updatedAt)
          .toLocaleDateString("sr-RS")
          .replace(/\s/g, "")
      : "",
    photoUrl: url && `${url}?w=2000&fm=webp&q=80`,
    photoAlt: photo?.description ?? "",
    recommended: (fields?.recommendedPosts ?? []).filter((item) => item?.fields),
    ratio: width && height ? width / height : 4 / 3,
    orientation: !url
      ? ("none" as const)
      : width && height && height > width
        ? ("portrait" as const)
        : ("landscape" as const),
  };
};

export const richTextRenderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="rt-bold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="rt-italic">{text}</em>
    ),
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="rt-code">{text}</code>
    ),
  },

  renderNode: {
    // Headings
    [BLOCKS.HEADING_1]: (_, children) => (
      <h1 className="rt-h1">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="rt-h2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="rt-h3">{children}</h3>
    ),

    // Paragraph
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="rt-p">{children}</p>
    ),

    // Lists
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="rt-ul">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="rt-ol">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className="rt-li">{children}</li>
    ),

    // Embedded image (OPTIMIZED)
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset: Asset<undefined> | undefined = node.data.target;

      if (!asset?.fields?.file) return null;

      const { url, details } = asset.fields.file;
      const { width, height } = details?.image || {};

      return (
        <figure className="rt-image">
          <img
            src={`https:${url}?w=1600&fm=webp`}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            alt={asset.fields.description || ""}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </figure>
      );
    },

    // Links
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="rt-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};
