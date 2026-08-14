import { useEffect, useState } from "react";
import { Search, User, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const categories = [
  "All",
  "Food Guide",
  "Recipes",
  "Dining Tips",
  "Restaurant Reviews",
  "Health",
];

function BlogListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // Fetch Blogs From Backend
  // ============================

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/blogs");

      setBlogPosts(res.data.blogs || []);
    } catch (error) {
      console.error("Fetch blogs error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load blogs"
      );

      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Search + Category Filter
  // ============================

  const filtered = blogPosts.filter((post) => {
    const searchText = search.trim().toLowerCase();

    const matchSearch =
      !searchText ||
      post.title?.toLowerCase().includes(searchText) ||
      post.excerpt?.toLowerCase().includes(searchText) ||
      post.author?.toLowerCase().includes(searchText) ||
      post.category?.toLowerCase().includes(searchText);

    const matchCategory =
      activeCategory === "All" ||
      post.category === activeCategory;

    return matchSearch && matchCategory;
  });

  // ============================
  // Featured Blog
  // ============================

  const showFeatured =
    activeCategory === "All" &&
    search.trim() === "" &&
    filtered.length > 0;

  const featuredPost = showFeatured ? filtered[0] : null;

  // ============================
  // Latest Articles
  // ============================

  const latestPosts = showFeatured
    ? filtered.filter(
        (post) => post._id !== featuredPost?._id
      )
    : filtered;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ============================
          Header
      ============================ */}

      <section className="bg-white pt-10 pb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-primary text-sm font-semibold mb-4">
            Dine Hub
          </span>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-3">
            Dine Hub Blog
          </h1>

          <p className="text-gray-500 text-lg">
            Stories, recipes, and guides from Pakistan's food community
          </p>

        </div>
      </section>


      {/* ============================
          Search + Categories
      ============================ */}

      <section className="bg-gray-50 pt-8 pb-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Search */}

          <div className="max-w-2xl mx-auto mb-6">

            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white"
              />

            </div>

          </div>


          {/* Categories */}

          <div className="flex gap-2 overflow-x-auto pb-2 justify-center">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

        </div>
      </section>


      {/* ============================
          Blog Content
      ============================ */}

      <section className="max-w-6xl mx-auto px-4 pb-16">

        {/* ============================
            Loading
        ============================ */}

        {loading && (

          <div className="flex justify-center items-center py-20">

            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

          </div>

        )}


        {/* ============================
            No Results
        ============================ */}

        {!loading && filtered.length === 0 && (

          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">

            <Search className="h-10 w-10 text-gray-300 mx-auto mb-4" />

            <h3 className="text-2xl font-display font-bold text-dark mb-2">
              No Articles Found
            </h3>

            <p className="text-gray-500 mb-5">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Clear Filters
            </button>

          </div>

        )}


        {/* ============================
            Featured Blog
        ============================ */}

        {!loading && showFeatured && featuredPost && (

          <div className="mb-12">

            <Link
              to={`/blog/${featuredPost._id}`}
              className="block relative overflow-hidden rounded-2xl group"
            >

              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>


              {/* Content */}

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">

                <span className="inline-block px-4 py-2 bg-primary rounded-full text-sm font-semibold mb-4">
                  Featured Article
                </span>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 max-w-4xl">
                  {featuredPost.title}
                </h2>

                <p className="text-gray-200 max-w-3xl mb-5 line-clamp-2">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-5 text-sm">

                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>

                  <span className="flex items-center gap-2 font-semibold">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </span>

                </div>

              </div>

            </Link>

          </div>

        )}


        {/* ============================
            Latest / Search Articles
        ============================ */}

        {!loading && filtered.length > 0 && (

          <div>

            <div className="mb-6">

              <h2 className="text-3xl font-display font-bold text-dark">

                {search.trim() || activeCategory !== "All"
                  ? "Search Results"
                  : "Latest Articles"}

              </h2>

              <p className="text-gray-500 mt-1">

                {filtered.length}{" "}

                {filtered.length === 1
                  ? "article"
                  : "articles"}{" "}
                found

              </p>

            </div>


            {/* Articles Grid */}

            {latestPosts.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {latestPosts.map((post) => (

                  <article
                    key={post._id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >

                    {/* ============================
                        Image
                    ============================ */}

                    <Link to={`/blog/${post._id}`}>

                      <div className="relative overflow-hidden">

                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <span className="absolute top-4 left-4 inline-flex items-center whitespace-nowrap px-3 py-1.5 rounded-full bg-white text-primary text-xs font-semibold shadow-sm">
                          {post.category}
                        </span>

                      </div>

                    </Link>


                    {/* ============================
                        Content
                    ============================ */}

                    <div className="p-5">

                      <Link to={`/blog/${post._id}`}>

                        <h3 className="text-xl font-display font-bold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                      </Link>


                      <p className="text-gray-500 text-sm leading-6 line-clamp-3 mb-5">
                        {post.excerpt}
                      </p>


                      {/* ============================
                          Meta
                      ============================ */}

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                          <User className="h-4 w-4" />

                          <span>
                            {post.author}
                          </span>

                        </div>


                        <div className="flex items-center gap-1 text-sm text-gray-500">

                          <Clock className="h-4 w-4" />

                          <span>
                            {post.readTime}
                          </span>

                        </div>

                      </div>


                      {/* ============================
                          Read Article
                      ============================ */}

                      <Link
                        to={`/blog/${post._id}`}
                        className="inline-flex items-center gap-2 mt-4 text-primary font-semibold text-sm hover:gap-3 transition-all"
                      >

                        Read Article

                        <ArrowRight className="h-4 w-4" />

                      </Link>

                    </div>

                  </article>

                ))}

              </div>

            )}


            {/* No remaining cards after featured */}

            {latestPosts.length === 0 && showFeatured && (

              <p className="text-gray-500 text-center py-8">
                This is the only published article.
              </p>

            )}

          </div>

        )}

      </section>

    </div>
  );
}

export default BlogListingPage;