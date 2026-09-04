import CategoryBadge from "./CategoryBadge";

function FeaturedPost({ post }) {
  if (!post) return null;

  const {
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    category,
    publishedDate,
    readingTime,
  } = post.fields;

  const imageUrl = featuredImage?.fields?.file?.url;

  return (
    <article className="overflow-hidden bg-[#10162F] text-white">
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="min-h-[300px]">
          {imageUrl && (
            <img
              src={`https:${imageUrl}?w=1200&fm=webp`}
              alt={featuredImage.fields.title || title}
              className="h-full min-h-[300px] w-full object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#00E56B] px-3 py-1 text-sm font-bold text-[#10162F]">
              Featured
            </span>

          {category && (<CategoryBadge category={category}   clickable={true} />)}
          </div>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            {title}
          </h2>

          <p className="mt-5 text-gray-300">
            {excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>
              By {author?.fields?.name || "Unknown Author"}
            </span>

            {publishedDate && (
              <span>
                {new Date(publishedDate).toLocaleDateString()}
              </span>
            )}

            {readingTime && (
              <span>
                {readingTime} min read
              </span>
            )}
          </div>

            <a
              href={`/blog/${slug}`}
              className="mt-8 w-fit rounded-lg bg-[#FFD300] px-6 py-3 font-bold text-[#10162F] transition hover:bg-[#00E56B]"
            >
              Read Featured Post →
            </a>
        </div>
      </div>
    </article>
  );
}

export default FeaturedPost;