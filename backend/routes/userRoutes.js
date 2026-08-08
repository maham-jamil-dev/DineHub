import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

    getProfile,

    updateProfile,

    changePassword,

    logout,

    getCustomerDashboard

} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

router.post("/logout", authMiddleware, logout);

router.get("/dashboard",authMiddleware,getCustomerDashboard
);
export default router;