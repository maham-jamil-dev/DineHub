import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

    addToCart,

    getMyCart,

    updateCartItem,

    removeCartItem,

    clearCart

} from "../controllers/cartController.js";

const router = express.Router();

router.post(
    "/add",
    authMiddleware,
    addToCart
);

router.get(
    "/my",
    authMiddleware,
    getMyCart
);

router.put(
    "/update/:id",
    authMiddleware,
    updateCartItem
);

router.delete(
    "/delete/:id",
    authMiddleware,
    removeCartItem
);

router.delete(
    "/clear",
    authMiddleware,
    clearCart
);

export default router;