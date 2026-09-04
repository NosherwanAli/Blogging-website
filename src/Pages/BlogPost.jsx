import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorInfo from "../components/AuthorInfo";
import CategoryBadge from "../components/CategoryBadge";

import {
  getBlogPostBySlug,
  getBlogPosts,
} from "../services/contentful";

import RichTextRenderer from "../components/RichTextRenderer";
import RelatedPosts from "../components/RelatedPosts";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        const [postData, allPosts] = await Promise.all([
          getBlogPostBySlug(slug),
          getBlogPosts(),
        ]);
console.log("POST DATA:", postData);
console.log("AUTHOR DATA:", postData?.fields?.author);
console.log(
  "PROFILE IMAGE:",
  postData?.fields?.author?.fields?.profileImage
);
        if (!postData) {
          setPost(null);
          return;
        }

        setPost(postData);

        const currentCategoryId =
          postData.fields.category?.sys?.id;

        const related = allPosts
          .filter((item) => {
            const sameCategory =
              item.fields.category?.sys?.id ===
              currentCategoryId;

            const differentPost =
              item.sys.id !== postData.sys.id;

            return sameCategory && differentPost;
          })
          .slice(0, 3);

        setRelatedPosts(related);
      } catch (error) {
        console.error("Blog post error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Post Not Found
        </h1>

        <p className="mt-4 text-gray-600">
          The article you're looking for doesn't exist.
        </p>

        <Link
          to="/blog"
          className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const {
    title,
    excerpt,
    featuredImage,
    content,
    author,
    category,
    publishedDate,
    readingTime,
  } = post.fields;

  const imageUrl = featuredImage?.fields?.file?.url;

  return (
    <main className="bg-white">
      {/* Hero */}
      <article>
        <header className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center md:pt-20">
          {/* Category */}
         <CategoryBadge category={category} />

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              {excerpt}
            </p>
          )}

          {/* Author / Meta */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            {author && (
              <div className="flex items-center gap-3">
                {author.fields.profileImage?.fields?.file?.url && (
                  <img
                    src={`https:${author.fields.profileImage.fields.file.url}?w=80&h=80&fm=webp`}
                    alt={author.fields.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  
                  
                )}

                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {author.fields.name}
                  </p>

                  {author.fields.role && (
                    <p>{author.fields.role}</p>
                  )}
                </div>
              </div>
            )}

            {publishedDate && (
              <span>
                {new Date(
                  publishedDate
                ).toLocaleDateString()}
              </span>
            )}

            {readingTime && (
              <span>
                {readingTime} min read
              </span>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className="mx-auto max-w-6xl px-6">
            <img
              src={`https:${imageUrl}?w=1600&fm=webp`}
              alt={featuredImage.fields.title || title}
              className="max-h-[650px] w-full rounded-3xl object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <RichTextRenderer content={content} />
           <div className="mt-16">
          <AuthorInfo author={author} />
            </div>
        </div>
      </article>

      {/* Related Posts */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <RelatedPosts posts={relatedPosts} />
      </div>
    </main>
  );
}

export default BlogPost;