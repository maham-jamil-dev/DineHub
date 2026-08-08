import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

import {
  createReservation,
  getMyReservations,
  getRestaurantReservations,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

// ==========================
// Customer
// ==========================

router.post(
  "/create",
  authMiddleware,
  createReservation
);

router.get(
  "/my",
  authMiddleware,
  getMyReservations
);

// ==========================
// Owner
// ==========================

router.get(
  "/restaurant",
  authMiddleware,
  ownerMiddleware,
  getRestaurantReservations
);

router.put(
  "/status/:id",
  authMiddleware,
  ownerMiddleware,
  updateReservationStatus
);

export default router;