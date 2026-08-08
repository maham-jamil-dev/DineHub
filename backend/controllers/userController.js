import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
// ==========================
// Get Profile
// ==========================

export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Update Profile
// ==========================

export const updateProfile = async (req, res) => {

    try {

        const { fullName, phone, address } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile Updated",

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// Change Password
// ==========================

export const changePassword = async (req, res) => {

    try {

        const {

            oldPassword,

            newPassword

        } = req.body;

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Old Password Incorrect"

            });

        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Changed Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// Logout
// ==========================

export const logout = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logout Successful"

    });

};
// ==========================
// Customer Dashboard
// ==========================

export const getCustomerDashboard = async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments({

            customer: req.user._id

        });

        const totalReviews = await Review.countDocuments({

            customer: req.user._id

        });

        const recentOrders = await Order.find({

            customer: req.user._id

        })
        .populate("restaurant", "name")
        .sort({ createdAt: -1 })
        .limit(5);

        const dashboard = {

            totalOrders,

            totalReviews,

            loyaltyPoints: totalOrders * 20,

            recentOrders

        };

        res.status(200).json({

            success: true,

            dashboard

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};