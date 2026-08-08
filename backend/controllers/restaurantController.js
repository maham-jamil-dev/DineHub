import Restaurant from "../models/Restaurant.js";
import Order from "../models/Order.js";
// ============================
// Create Restaurant
// ============================

export const createRestaurant = async (req, res) => {
  try {
    const alreadyExists = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "You already own a restaurant",
      });
    }

    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user._id,
      image: req.file
        ? `/uploads/restaurants/${req.file.filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Restaurant Created Successfully",
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
// Get All Restaurants
// ============================

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

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
// Get Single Restaurant
// ============================

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    res.status(200).json({
      success: true,
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
// Get My Restaurant
// ============================

export const getMyRestaurant = async (req, res) => {
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

    res.status(200).json({
      success: true,
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
// Update My Restaurant
// ============================

export const updateMyRestaurant = async (req, res) => {
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

    Object.assign(restaurant, req.body);

    if (req.file) {
      restaurant.image = `/uploads/restaurants/${req.file.filename}`;
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant Updated Successfully",
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
// Delete My Restaurant
// ============================

export const deleteMyRestaurant = async (req, res) => {
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

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================
// Owner Dashboard
// ============================

export const getOwnerDashboard = async (req, res) => {

    try {

        const restaurant = await Restaurant.findOne({

            owner: req.user._id

        });

        if (!restaurant) {

            return res.status(404).json({

                success: false,

                message: "Restaurant Not Found"

            });

        }

        const orders = await Order.find({

            restaurant: restaurant._id

        });

        const totalOrders = orders.length;

        const totalRevenue = orders
            .filter(order => order.orderStatus === "Delivered")
            .reduce((sum, order) => sum + order.totalAmount, 0);

        const pendingOrders = orders.filter(

            order => order.orderStatus === "Pending"

        ).length;

        const preparingOrders = orders.filter(

            order => order.orderStatus === "Preparing"

        ).length;

        const deliveredOrders = orders.filter(

            order => order.orderStatus === "Delivered"

        ).length;

        const totalCustomers = new Set(

            orders.map(order => order.customer.toString())

        ).size;

        const recentOrders = await Order.find({

            restaurant: restaurant._id

        })

        .populate("customer", "fullName")

        .sort({ createdAt: -1 })

        .limit(5);

        res.status(200).json({

            success: true,

            dashboard: {

                totalOrders,

                totalRevenue,

                pendingOrders,

                preparingOrders,

                deliveredOrders,

                totalCustomers,

                recentOrders

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};