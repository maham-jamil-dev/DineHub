import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food Guide",
        "Recipes",
        "Dining Tips",
        "Restaurant Reviews",
        "Health",
      ],
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    readTime: {
      type: String,
      default: "5 min",
    },

    image: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;