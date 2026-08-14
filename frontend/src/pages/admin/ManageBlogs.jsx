import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import API from "../../api/api";

const categories = [
  "Food Guide",
  "Recipes",
  "Dining Tips",
  "Restaurant Reviews",
  "Health",
];

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Food Guide",
  author: "",
  readTime: "5 min",
  image: "",
  isPublished: true,
};

function ManageBlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [search, setSearch] = useState("");

  // ============================
  // Fetch Blogs
  // ============================

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/blogs");

      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Form Input
  // ============================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ============================
  // Open Add Form
  // ============================

  const handleAddBlog = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // ============================
  // Open Edit Form
  // ============================

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);

    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Food Guide",
      author: blog.author || "",
      readTime: blog.readTime || "5 min",
      image: blog.image || "",
      isPublished:
        typeof blog.isPublished === "boolean"
          ? blog.isPublished
          : true,
    });

    setShowForm(true);
  };

  // ============================
  // Close Form
  // ============================

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBlog(null);
    setForm(emptyForm);
  };

  // ============================
  // Submit Blog
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.excerpt.trim() ||
      !form.content.trim() ||
      !form.author.trim() ||
      !form.image.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingBlog) {
        // Update Blog

        const res = await API.put(
          `/blogs/${editingBlog._id}`,
          form
        );

        toast.success(
          res.data.message || "Blog updated successfully"
        );
      } else {
        // Create Blog

        const res = await API.post("/blogs", form);

        toast.success(
          res.data.message || "Blog created successfully"
        );
      }

      handleCloseForm();

      fetchBlogs();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ============================
  // Delete Blog
  // ============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const res = await API.delete(`/blogs/${id}`);

      toast.success(
        res.data.message || "Blog deleted successfully"
      );

      fetchBlogs();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete blog"
      );
    }
  };

  // ============================
  // Publish / Unpublish
  // ============================

  const handleTogglePublish = async (blog) => {
    try {
      const updatedData = {
        ...blog,
        isPublished: !blog.isPublished,
      };

      delete updatedData._id;
      delete updatedData.__v;
      delete updatedData.createdAt;
      delete updatedData.updatedAt;

      const res = await API.put(
        `/blogs/${blog._id}`,
        updatedData
      );

      toast.success(
        blog.isPublished
          ? "Blog unpublished successfully"
          : "Blog published successfully"
      );

      setBlogs((prev) =>
        prev.map((item) =>
          item._id === blog._id
            ? res.data.blog
            : item
        )
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update blog status"
      );
    }
  };

  // ============================
  // Search
  // ============================

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(searchText) ||
      blog.category?.toLowerCase().includes(searchText) ||
      blog.author?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">
      {/* ============================
          Header
      ============================ */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-dark">
            Manage Blog Posts
          </h1>

          <p className="text-gray-500 mt-1">
            Create, edit and manage DineHub blog posts
          </p>
        </div>

        <button
          onClick={handleAddBlog}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition"
        >
          <Plus className="h-5 w-5" />

          Add Blog Post
        </button>
      </div>

      {/* ============================
          Search
      ============================ */}

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* ============================
          Blog List
      ============================ */}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading blog posts...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No blog posts found.
            </p>

            <button
              onClick={handleAddBlog}
              className="mt-4 text-primary font-medium"
            >
              Create your first blog post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Blog
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Author
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    {/* Blog */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 min-w-[280px]">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-dark line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {blog.readTime || "5 min"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full bg-red-50 text-primary text-sm font-medium">
  {blog.category}
</span>
                    </td>

                    {/* Author */}

                    <td className="px-6 py-4 text-gray-600">
                      {blog.author}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      {blog.isPublished ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                          <EyeOff className="h-4 w-4" />
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() =>
                            handleTogglePublish(blog)
                          }
                          title={
                            blog.isPublished
                              ? "Unpublish"
                              : "Publish"
                          }
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                          {blog.isPublished ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleEditBlog(blog)
                          }
                          title="Edit"
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(blog._id)
                          }
                          title="Delete"
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ============================
          Add / Edit Modal
      ============================ */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            {/* Modal Header */}

            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-dark">
                  {editingBlog
                    ? "Edit Blog Post"
                    : "Add Blog Post"}
                </h2>

                <p className="text-sm text-gray-500">
                  Fill in the blog information below
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              {/* Title */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              {/* Excerpt */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Short description of the blog..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  required
                />
              </div>

              {/* Content */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Write your complete blog content..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
                  required
                />
              </div>

              {/* Category + Author */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  >
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>

                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Read Time + Image */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time
                  </label>

                  <input
                    type="text"
                    name="readTime"
                    value={form.readTime}
                    onChange={handleChange}
                    placeholder="5 min"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Publish */}

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="h-5 w-5 accent-primary"
                />

                <label
                  htmlFor="isPublished"
                  className="text-sm font-medium text-gray-700"
                >
                  Publish this blog immediately
                </label>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90"
                >
                  {editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageBlogPosts;