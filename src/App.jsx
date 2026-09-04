import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogPost from "./Pages/BlogPost";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Category from "./Pages/Category";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold text-purple-600">
        404
      </p>

      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Page Not Found
      </h1>

      <p className="mt-3 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug"element={<BlogPost />}/>
            <Route path="/category/:slug"element={<Category />}/>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;