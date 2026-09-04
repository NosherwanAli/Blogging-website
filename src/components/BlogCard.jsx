import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";

function BlogCard({ post }) {
  const {
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    publishedDate,
    readingTime,
  } = post.fields;

  const imageUrl = coverImage?.fields?.file?.url;

  return (
    <article className="group overflow-hidden border border-[#D9DCE5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Cover Image */}
      {imageUrl && (
        <img
          src={`https:${imageUrl}?w=800&fm=webp`}
          alt={coverImage.fields.title || title}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      )}

      <div className="p-6">
        {/* Category */}
      <CategoryBadge category={category} />

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-[#10162F]">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-3 text-[#5B6178]">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
          <span>
            {author?.fields?.name || "Unknown Author"}
          </span>

          <span>
            {readingTime ? `${readingTime} min read` : ""}
          </span>
        </div>

        {/* Date */}
        {publishedDate && (
          <p className="mt-2 text-sm text-gray-400">
            {new Date(publishedDate).toLocaleDateString()}
          </p>
        )}

        {/* Read More */}
     <Link to={`/blog/${slug}`} className="mt-5 inline-block font-bold text-[#00A950] hover:text-[#007A3D]">Read More →
     </Link>
      </div>
    </article>
  );
}

export default BlogCard;