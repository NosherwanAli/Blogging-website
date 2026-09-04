function EmptyState({ message = "No posts found." }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Nothing found
      </h2>

      <p className="mt-3 text-gray-500">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;