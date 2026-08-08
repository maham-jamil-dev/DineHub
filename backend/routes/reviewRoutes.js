import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

    addReview,

    getRestaurantReviews,

    deleteReview,

    getMyRestaurantReviews,

} from "../controllers/reviewController.js";

const router = express.Router();

// Add Review
router.post(
    "/add",
    authMiddleware,
    addReview
);

// Get Restaurant Reviews
router.get(
    "/restaurant/:restaurantId",
    getRestaurantReviews
);

// Delete My Review
router.delete(
    "/delete/:id",
    authMiddleware,
    deleteReview
);
router.get(
  "/my",
  authMiddleware,
  getMyRestaurantReviews
);
export default router;