import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Restaurant from "../models/Restaurant.js";

// ============================
// Place Order
// ============================

export const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod } = req.body;

    // ============================
    // Validate Delivery Address
    // ============================

    if (!deliveryAddress || !deliveryAddress.trim()) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    // ============================
    // Validate Payment Method
    // ============================

    const allowedPaymentMethods = [
      "Cash On Delivery",
      "Card",
      "Online",
    ];

    const selectedPaymentMethod =
      paymentMethod || "Cash On Delivery";

    if (!allowedPaymentMethods.includes(selectedPaymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // ============================
    // Get Cart
    // ============================

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("menuItem");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // ============================
    // Check Menu Items
    // ============================

    const invalidItem = cartItems.find(
      (item) => !item.menuItem
    );

    if (invalidItem) {
      return res.status(400).json({
        success: false,
        message: "One or more menu items are no longer available",
      });
    }

    // ============================
    // Get Restaurant
    // ============================

    const restaurantId =
      cartItems[0].menuItem.restaurant;

    const restaurant = await Restaurant.findById(
      restaurantId
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    // ============================
    // Calculate Total + Items
    // ============================

    let totalAmount = 0;

    const items = cartItems.map((item) => {
      const itemTotal =
        item.menuItem.price * item.quantity;

      totalAmount += itemTotal;

      return {
        menuItem: item.menuItem._id,
        quantity: item.quantity,
        price: item.menuItem.price,
      };
    });

    // ============================
    // Payment Status
    // ============================

    // COD and online/card payments
    // remain Pending until actual payment
    // confirmation is available.

    const paymentStatus = "Pending";

    // ============================
    // Create Order
    // ============================

    const order = await Order.create({
      customer: req.user._id,
      restaurant: restaurant._id,
      items,
      totalAmount,
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod: selectedPaymentMethod,
      paymentStatus,
    });

    // ============================
    // Clear Cart
    // ============================

    await Cart.deleteMany({
      user: req.user._id,
    });

    // ============================
    // Response
    // ============================

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get My Orders
// ============================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate("restaurant", "name image")
      .populate("items.menuItem", "name image price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Restaurant Orders
// ============================

export const getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    const orders = await Order.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "fullName email phone")
      .populate("items.menuItem", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Update Order Status
// ============================

export const updateOrderStatus = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      restaurant: restaurant._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    const allowedOrderStatuses = [
      "Pending",
      "Accepted",
      "Preparing",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedOrderStatuses.includes(
        req.body.orderStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Status Updated Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};