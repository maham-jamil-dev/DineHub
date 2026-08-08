import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getDashboard,
  getAnalytics,
  getReportData,
  getAllUsers,
  getAllRestaurants,
  approveRestaurant,
  rejectRestaurant,
  getAllReservations,
  deleteReservation,
} from "../controllers/adminController.js";

const router = express.Router();

// Dashboard
router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboard
);

// Analytics
router.get(
    "/analytics",
    authMiddleware,
    adminMiddleware,
    getAnalytics
);

// Reports Data
router.get(
    "/reports-data",
    authMiddleware,
    adminMiddleware,
    getReportData
);

// Get All Users
router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

// Get All Restaurants
router.get(
    "/restaurants",
    authMiddleware,
    adminMiddleware,
    getAllRestaurants
);

// Approve Restaurant
router.put(
    "/restaurant/approve/:id",
    authMiddleware,
    adminMiddleware,
    approveRestaurant
);

// Reject Restaurant
router.put(
    "/restaurant/reject/:id",
    authMiddleware,
    adminMiddleware,
    rejectRestaurant
);
router.get(
  "/reservations",
  authMiddleware,
  adminMiddleware,
  getAllReservations
);

router.delete(
  "/reservation/:id",
  authMiddleware,
  adminMiddleware,
  deleteReservation
);

export default router;