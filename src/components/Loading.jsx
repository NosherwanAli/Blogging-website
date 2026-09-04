function Loading() {
  return (
    <div
      className="flex min-h-[300px] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

        <p className="mt-4 text-gray-500">
          Loading posts...
        </p>
      </div>
    </div>
  );
}

export default Loading;