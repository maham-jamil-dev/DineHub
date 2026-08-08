import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";
import upload from "../middleware/menuUploadMiddleware.js";

import {

    addMenuItem,
    getMyMenu,
    updateMenuItem,
    deleteMenuItem,
    getRestaurantMenu

} from "../controllers/menuController.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    ownerMiddleware,
    upload.single("image"),
    addMenuItem
);

router.get(
    "/my",
    authMiddleware,
    ownerMiddleware,
    getMyMenu
);

router.put(
    "/update/:id",
    authMiddleware,
    ownerMiddleware,
    upload.single("image"),
    updateMenuItem
);

router.delete(
    "/delete/:id",
    authMiddleware,
    ownerMiddleware,
    deleteMenuItem
);

router.get(
    "/restaurant/:restaurantId",
    getRestaurantMenu
);

export default router;