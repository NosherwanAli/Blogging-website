import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Get all blog posts
export const getBlogPosts = async () => {
  const response = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.publishedDate",
    include: 2,
  });

  return response.items;
};

// Get all categories
export const getCategories = async () => {
  const response = await client.getEntries({
    content_type: "category",
    order: "fields.title",
  });

  return response.items;
};

// Get featured posts
export const getFeaturedPosts = async () => {
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.featured": true,
    order: "-fields.publishedDate",
    include: 2,
  });

  return response.items;
};

//Rich Text Rendering
export const getBlogPostBySlug = async (slug) => {
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  });

  return response.items[0] || null;
};
// Get one category by slug
export const getCategoryBySlug = async (slug) => {
  const response = await client.getEntries({
    content_type: "category",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] || null;
};

// Get posts by category
export const getPostsByCategory = async (categoryId) => {
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.category.sys.id": categoryId,
    order: "-fields.publishedDate",
    include: 2,
  });
   return response.items;
};
export default client;