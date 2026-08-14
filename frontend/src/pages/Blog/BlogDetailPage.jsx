import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Clock } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../api/api";

function BlogDetailPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // Fetch Single Blog
  // ============================
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/blogs/${id}`);

      if (res.data.success) {
        setBlog(res.data.blog);
      } else {
        toast.error("Blog not found");
      }
    } catch (error) {
      console.error("Fetch blog error:", error);

      toast.error(
        error.response?.data?.message || "Blog not found"
      );

      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Loading
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ============================
  // Blog Not Found
  // ============================
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <h1 className="text-3xl font-display font-bold text-dark mb-3">
            Blog Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            The article you are looking for does not exist.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ============================
          Back Button
      ============================ */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* ============================
          Blog Header
      ============================ */}
      <article className="max-w-5xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          {/* Image */}
          <div className="w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">

            {/* Category */}
            <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-primary text-sm font-semibold mb-5">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-display font-bold text-dark leading-tight mb-5">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-500 leading-8 mb-6">
              {blog.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b border-gray-100 text-gray-500">

              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{blog.readTime}</span>
              </div>

              {blog.createdAt && (
                <div className="text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              )}

            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-8 whitespace-pre-line">
              {blog.content}
            </div>

          </div>

        </div>

      </article>

    </div>
  );
}

export default BlogDetailPage;