import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";
import Review from "../models/Review.js";

// ============================
// Admin Dashboard
// ============================

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOwners = await User.countDocuments({ role: "owner" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalRestaurants = await Restaurant.countDocuments();
    const totalMenus = await Menu.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalReviews = await Review.countDocuments();

    const pendingRestaurants = await Restaurant.countDocuments({
      status: "pending",
    });

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const deliveredOrders = await Order.find({
      orderStatus: "Delivered",
    });

    const totalRevenue = deliveredOrders.reduce(
      (total, order) => total + (order.totalAmount || 0),
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalOwners,
        totalCustomers,
        totalRestaurants,
        totalMenus,
        totalOrders,
        totalReservations,
        totalReviews,
        pendingRestaurants,
        pendingOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Platform Analytics
// ============================

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOwners = await User.countDocuments({ role: "owner" });
    const totalRestaurants = await Restaurant.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalReviews = await Review.countDocuments();

    const deliveredOrders = await Order.find({ orderStatus: "Delivered" });
    const totalRevenue = deliveredOrders.reduce(
      (total, order) => total + (order.totalAmount || 0),
      0
    );

    // Monthly Growth (Last 6 Months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const growthData = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const uCount = await User.countDocuments({ createdAt: { $lt: nextMonth } });
      const rCount = await Restaurant.countDocuments({ createdAt: { $lt: nextMonth } });
      const oCount = await Order.countDocuments({ createdAt: { $gte: d, $lt: nextMonth } });

      growthData.push({
        month: monthNames[d.getMonth()],
        users: uCount,
        restaurants: rCount,
        orders: oCount,
      });
    }

    // Weekly / Daily Orders (Last 7 Days)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

      const count = await Order.countDocuments({
        createdAt: { $gte: startOfDay, $lt: endOfDay }
      });

      dailyData.push({
        day: dayNames[d.getDay()],
        orders: count
      });
    }

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalOwners,
        totalRestaurants,
        totalOrders,
        totalReservations,
        totalReviews,
        totalRevenue,
        growthData,
        dailyData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Reports Raw Data
// ============================

export const getReportData = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    const restaurants = await Restaurant.find().populate("owner", "fullName email").sort({ createdAt: -1 });
    const orders = await Order.find().populate("customer", "fullName email").populate("restaurant", "name").sort({ createdAt: -1 });
    const reservations = await Reservation.find().populate("customer", "fullName email").populate("restaurant", "name").sort({ createdAt: -1 });
    const reviews = await Review.find().populate("customer", "fullName email").populate("restaurant", "name").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reportData: {
        users,
        restaurants,
        orders,
        reservations,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Users
// ============================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Restaurants
// ============================

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("owner", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Approve Restaurant
// ============================

export const approveRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    restaurant.status = "approved";
    restaurant.isApproved = true;

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant Approved Successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Reject Restaurant
// ============================

export const rejectRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    restaurant.status = "rejected";
    restaurant.isApproved = false;

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant Rejected Successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================
// Get All Reservations
// ============================

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("customer", "fullName email")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Delete Reservation
// ============================

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation Not Found",
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Reservation Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};