import express from "express";
console.log("Order Routes Loaded");
import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

import {
  placeOrder,
  getMyOrders,
  getRestaurantOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Customer
router.post(
  "/create",
  authMiddleware,
  placeOrder
);

router.get(
  "/my",
  authMiddleware,
  getMyOrders
);

// Owner
router.get(
  "/restaurant",
  authMiddleware,
  ownerMiddleware,
  getRestaurantOrders
);

router.put(
  "/status/:id",
  authMiddleware,
  ownerMiddleware,
  updateOrderStatus
);

export default router;