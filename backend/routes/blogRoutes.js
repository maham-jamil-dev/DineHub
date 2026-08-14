import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// ============================
// Public Blog Routes
// ============================

// Get all published blogs
router.get("/", getBlogs);

// Get single published blog
router.get("/:id", getBlogById);

// ============================
// Admin Blog Routes
// ============================

// Create blog
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createBlog
);

// Update blog
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateBlog
);

// Delete blog
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteBlog
);

export default router;