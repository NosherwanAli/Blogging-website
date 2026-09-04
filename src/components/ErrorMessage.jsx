function ErrorMessage() {
  return (
    <div className="rounded-xl bg-red-50 p-6 text-center">
      <h2 className="text-xl font-semibold text-red-700">
        Something went wrong
      </h2>

      <p className="mt-2 text-red-600">
        We couldn't load the blog posts. Please try again.
      </p>
    </div>
  );
}

export default ErrorMessage;