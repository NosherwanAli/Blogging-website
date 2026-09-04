import { Link } from "react-router-dom";

function CategoryBadge({ category, clickable = true }) {
  if (!category?.fields) {
    return null;
  }

  const {
    title,
    slug,
    color,
  } = category.fields;

  const badgeStyle = {
    backgroundColor: color || "#E8FFF1",
    color: "#006B36",
  };

  if (clickable && slug) {
    return (
      <Link
        to={`/category/${slug}`}
        style={badgeStyle}
        className="inline-block rounded-full px-3 py-1 text-sm font-bold transition hover:opacity-80"
      >
        {title}
      </Link>
    );
  }

  return (
    <span
      style={badgeStyle}
      className="inline-block rounded-full px-3 py-1 text-sm font-bold"
    >
      {title}
    </span>
  );
}

export default CategoryBadge;