console.log("Restaurant Routes Loaded");
import express from "express";

import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
  deleteMyRestaurant,
  getOwnerDashboard
} from "../controllers/restaurantController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create Restaurant
router.post(
  "/create",
  authMiddleware,
  ownerMiddleware,
  upload.single("image"),
  createRestaurant
);

// Get All Restaurants
router.get("/", getRestaurants);

// Get My Restaurant
router.get("/my", authMiddleware, getMyRestaurant);

router.get(
  "/owner/dashboard",
  (req, res, next) => {
    console.log("✅ Owner Dashboard Route Hit");
    next();
  },
  authMiddleware,
  ownerMiddleware,
  getOwnerDashboard
);
// Get Single Restaurant
router.get("/:id", getRestaurant);

// Update My Restaurant
router.put(
  "/update",
  authMiddleware,
  ownerMiddleware,
  upload.single("image"),
  updateMyRestaurant
);

// Delete My Restaurant
router.delete(
  "/delete",
  authMiddleware,
  ownerMiddleware,
  deleteMyRestaurant
);

export default router;