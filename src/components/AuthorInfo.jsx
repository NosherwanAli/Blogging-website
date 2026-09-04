import RichTextRenderer from "./RichTextRenderer";

function AuthorInfo({ author }) {
  if (!author?.fields) {
    return null;
  }

  const {
    name,
    profileImage,
    bio,
    role,
  } = author.fields;

  const imageUrl = profileImage?.fields?.file?.url;

  return (
   <section className="border border-[#D9DCE5] bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

        {/* Author Image */}
        {imageUrl ? (
          <img
            src={`https:${imageUrl}?w=160&h=160&fm=webp&q=80`}
            alt={name || "Author"}
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full  bg-[#E8FFF1] text-2xl font-bold text-[#007A3D]"
            aria-hidden="true"
          >
            {name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        )}

        {/* Author Details */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00A950]">
            About the Author
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {name || "Unknown Author"}
          </h2>

          {role && (
            <p className="mt-1 text-sm font-medium text-gray-500">
              {role}
            </p>
          )}

          {/* Rich Text Bio */}
          {bio && (
            <div className="mt-4">
              <RichTextRenderer content={bio} />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default AuthorInfo;