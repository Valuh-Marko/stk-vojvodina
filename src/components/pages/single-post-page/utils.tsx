import type { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Asset } from "contentful";

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
