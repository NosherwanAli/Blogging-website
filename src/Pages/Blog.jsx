import { useEffect, useMemo, useState } from "react";
import {
  getBlogPosts,
  getCategories,
} from "../services/contentful";

import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [postsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getCategories(),
        ]);

        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Blog page error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search + category filtering
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.fields.title || "";

      const matchesSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

      const category = post.fields.category;

      const matchesCategory =
        selectedCategory === "all" ||
        category?.sys?.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, selectedCategory]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-[#10162F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="font-semibold text-[#00E56B]">
            DEV BLOG
          </p>

          <h1 className="mt-3 text-4xl font-bold  md:text-5xl ">
            All Articles
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-300">
            Explore our latest articles about React, JavaScript,
            CSS, and modern web development.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row">
          
          {/* Search */}
          <div className="flex-1">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Search articles
            </label>

            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title..."
              className="w-full border border-[#D9DCE5] bg-white px-4 py-3 text-[#10162F] outline-none transition focus:border-[#00A950] focus:ring-2 focus:ring-[#00E56B]/20"
            />
          </div>

          {/* Category */}
          <div className="md:w-64">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
              className="w-full border border-[#D9DCE5] bg-white px-4 py-3 text-[#10162F] outline-none transition focus:border-[#00A950] focus:ring-2 focus:ring-[#00E56B]/20"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.sys.id}
                  value={category.sys.id}
                >
                  {category.fields.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest Articles
          </h2>

          <p className="text-sm text-gray-500">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <EmptyState
            message={
              search
                ? `No articles found for "${search}".`
                : "There are no articles in this category yet."
            }
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
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

export default Blog;