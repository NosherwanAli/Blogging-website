import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0B1026] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold"
            >
              Dev<span className="text-[#00E56B]">Blog</span>
            </Link>

            <p className="mt-4 max-w-sm text-gray-400">
              Practical articles about React, JavaScript,
              CSS, and modern web development.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 transition hover:text-[#00E56B]"
              >
                Home
              </Link>

              <Link
                to="/blog"
                className="text-gray-400 hover:text-white"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-semibold">
              Topics
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-gray-400">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS & UI</span>
              <span>Web Development</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DevBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;