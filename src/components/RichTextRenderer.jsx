import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function RichTextRenderer({ content }) {
  if (!content) {
    return null;
  }

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-6 mt-10 text-4xl font-bold text-[#10162F]">
        {children}
      </h1>
    ),

        [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-5 mt-10 text-3xl font-bold text-[#10162F]">
        {children}
      </h2>
    ),

      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="mb-4 mt-8 text-2xl font-bold text-[#10162F]">
          {children}
        </h3>
      ),

      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-6 text-lg leading-8 text-[#3F465C]">
          {children}
        </p>
      ),
        [INLINES.HYPERLINK]: (node, children) => (
    <a
      href={node.data.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-[#00A950] underline hover:text-[#007A3D]"
    >
      {children}
    </a>
  ),

      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-[#3F465C]">
          {children}
        </ul>
      ),

      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-gray-700">
          {children}
        </ol>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li>{children}</li>
      ),

          [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="my-8 border-l-4 border-[#00E56B] bg-[#E8FFF1] px-6 py-5 text-xl italic text-[#3F465C]">
          {children}
        </blockquote>
      ),

      [BLOCKS.HR]: () => (
        <hr className="my-10 border-gray-200" />
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target;

        const imageUrl = asset?.fields?.file?.url;
        const title = asset?.fields?.title || "";

        if (!imageUrl) return null;

        return (
          <figure className="my-10">
            <img
              src={`https:${imageUrl}?w=1200&fm=webp`}
              alt={title}
              loading="lazy"
              className="w-full rounded-2xl"
            />

            {title && (
              <figcaption className="mt-3 text-center text-sm text-gray-500">
                {title}
              </figcaption>
            )}
          </figure>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = node.data.target;

        if (!entry?.fields) return null;

        return (
          <aside className="my-8 rounded-2xl border border-purple-200 bg-purple-50 p-6">
            {entry.fields.title && (
              <h3 className="text-xl font-bold text-purple-900">
                {entry.fields.title}
              </h3>
            )}

            {entry.fields.message && (
              <p className="mt-2 leading-7 text-purple-800">
                {entry.fields.message}
              </p>
            )}
          </aside>
        );
      },

      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-purple-600 underline hover:text-purple-800"
        >
          {children}
        </a>
      ),
    },

    renderMark: {
      CODE: (text) => (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-purple-700">
          {text}
        </code>
      ),
    },
  };

  return (
    <div className="prose max-w-none">
      {documentToReactComponents(content, options)}
    </div>
  );
}

export default RichTextRenderer;