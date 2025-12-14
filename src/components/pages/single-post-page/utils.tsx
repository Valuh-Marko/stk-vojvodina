import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

export const richTextRenderOptions = {
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
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h1 className="rt-h1">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <h2 className="rt-h2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: any, children: React.ReactNode) => (
      <h3 className="rt-h3">{children}</h3>
    ),

    // Paragraph
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="rt-p">{children}</p>
    ),

    // Lists
    [BLOCKS.UL_LIST]: (_: any, children: React.ReactNode) => (
      <ul className="rt-ul">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
      <ol className="rt-ol">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_: any, children: React.ReactNode) => (
      <li className="rt-li">{children}</li>
    ),

    // Embedded image (OPTIMIZED)
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const asset = node.data.target;

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
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
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
