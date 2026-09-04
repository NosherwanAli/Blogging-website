import BlogCard from "./BlogCard";

function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-gray-200 pt-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Related Posts
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.sys.id}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedPosts;