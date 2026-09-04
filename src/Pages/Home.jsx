import { useEffect, useState } from "react";
import { getBlogPosts, getFeaturedPosts } from "../services/contentful";

import BlogCard from "../components/BlogCard";
import FeaturedPost from "../components/FeaturedPost";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(false);

        const [allPosts, featuredPosts] = await Promise.all([
          getBlogPosts(),
          getFeaturedPosts(),
        ]);

        setPosts(allPosts);
        setFeaturedPost(featuredPosts[0] || null);
      } catch (error) {
        console.error("Contentful error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <main>
      {/* HERO */}
      <section className="bg-[#10162F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 font-bold tracking-widest text-[#00E56B]">
              DEV BLOG
            </p>

           <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Learn. Build. Grow.
            </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
              Explore practical articles about React, JavaScript,
              web development, CSS, and modern frontend technologies.
            </p>

            <a
               href="/blog"
              className="mt-8 inline-block bg-[#00E56B] px-6 py-3 font-bold text-[#10162F] transition hover:bg-[#FFD300]">Explore Articles →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="font-bold tracking-widest text-[#00A950]">
              FEATURED
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#10162F]">
              Featured Article
            </h2>
          </div>

          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* LATEST POSTS */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-semibold text-[#00E56B]">
              BLOG
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#10162F]">
              Latest Posts
            </h2>
          </div>

          <a
            href="/blog"
            className="hidden font-semibold text-[#00A950] hover:text-[#007A3D] md:block"
          >
            View All →
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-10 text-center">
            <p className="text-gray-500">
              No blog posts found.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
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

export default Home;