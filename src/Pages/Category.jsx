import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getCategoryBySlug,
  getPostsByCategory,
} from "../services/contentful";

import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Category() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(false);

        const categoryData = await getCategoryBySlug(slug);

        if (!categoryData) {
          setCategory(null);
          setPosts([]);
          return;
        }

        setCategory(categoryData);

        const postsData = await getPostsByCategory(
          categoryData.sys.id
        );

        setPosts(postsData);
      } catch (error) {
        console.error("Category page error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!category) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-6xl font-bold text-[#00E56B]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#10162F]">
          Category Not Found
        </h1>

        <p className="mt-3 text-[#3F465C]">
          The category you're looking for doesn't exist.
        </p>

        <Link
          to="/blog"
          className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const {
    title,
    color,
  } = category.fields;

  return (
    <main className="bg-white">
      {/* Category Header */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link
            to="/blog"
            className="text-sm font-semibold text-[#00A950] hover:text-[#007A3D]"
          >
            ← All Articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor: color || "#f3e8ff",
                color: "rgb(0, 107, 54)",
              }}
            >
              Category
            </span>

            <span className="text-sm text-gray-500">
              {posts.length}{" "}
              {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Explore all articles published in the {title} category.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-7xl px-6 py-12 pb-20">
        {posts.length === 0 ? (
          <EmptyState
            message={`There are no articles in ${title} yet.`}
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.sys.id}
                post={post}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Category;