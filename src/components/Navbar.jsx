import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#10162F] text-white">
      <nav className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-[#00E56B]">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="font-semibold transition hover:text-[#00E56B]"
            >
              Home
            </Link>

            <Link
              to="/blog"
              className="font-semibold transition hover:text-[#00E56B]"
            >
              Blog
            </Link>

            <Link
              to="/blog"
              className="bg-[#00E56B] px-5 py-2.5 font-bold text-[#10162F] transition hover:bg-[#FFD300]"
            >
              Explore
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="border border-white/30 px-3 py-2 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-5 flex flex-col gap-4 border-t border-white/20 pt-5 md:hidden">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-semibold hover:text-[#00E56B]"
            >
              Home
            </Link>

            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="font-semibold hover:text-[#00E56B]"
            >
              Blog
            </Link>

            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="bg-[#00E56B] px-5 py-3 text-center font-bold text-[#10162F]"
            >
              Explore
            </Link>

          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;