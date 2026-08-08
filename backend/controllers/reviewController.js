import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import Order from "../models/Order.js";

// ======================================
// Add Review
// ======================================

export const addReview = async (req, res) => {
  try {
    const {
      restaurant,
      order,
      rating,
      comment,
    } = req.body;

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const restaurantExists = await Restaurant.findById(
      restaurant
    );

    if (!restaurantExists) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    // Check Order

    const orderData = await Order.findById(order);

    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    // Only Customer can review

    if (
      orderData.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Order Must Be Delivered

    if (orderData.orderStatus !== "Delivered") {
      return res.status(400).json({
        success: false,
        message:
          "Order must be delivered before review.",
      });
    }

    // Already Reviewed

    const alreadyReviewed =
      await Review.findOne({
        order,
      });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message:
          "You already reviewed this order.",
      });
    }

    // Create Review

    const review = await Review.create({
      customer: req.user._id,
      restaurant,
      order,
      rating,
      comment,
    });

    // Update Restaurant Rating

    const reviews = await Review.find({
      restaurant,
    });

    const totalReviews = reviews.length;

    const averageRating =
      reviews.reduce(
        (sum, item) => sum + item.rating,
        0
      ) / totalReviews;

    restaurantExists.rating =
      averageRating.toFixed(1);

    restaurantExists.totalReviews =
      totalReviews;

    await restaurantExists.save();

    res.status(201).json({
      success: true,
      message:
        "Review Added Successfully",
      review,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Restaurant Reviews
// ======================================

export const getRestaurantReviews =
  async (req, res) => {
    try {

      const reviews = await Review.find({
        restaurant:
          req.params.restaurantId,
      })
        .populate(
          "customer",
          "fullName profileImage"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: reviews.length,
        reviews,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };

// ======================================
// Delete Review
// ======================================

export const deleteReview =
  async (req, res) => {
    try {

      const review =
        await Review.findOne({
          _id: req.params.id,
          customer: req.user._id,
        });

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            "Review Not Found",
        });
      }

      const restaurantId =
        review.restaurant;

      await review.deleteOne();

      const reviews =
        await Review.find({
          restaurant: restaurantId,
        });

      const restaurant =
        await Restaurant.findById(
          restaurantId
        );

      restaurant.totalReviews =
        reviews.length;

      if (reviews.length > 0) {

        const averageRating =
          reviews.reduce(
            (sum, item) =>
              sum + item.rating,
            0
          ) / reviews.length;

        restaurant.rating =
          averageRating.toFixed(1);

      } else {

        restaurant.rating = 0;

      }

      await restaurant.save();

      res.status(200).json({
        success: true,
        message:
          "Review Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
  // ======================================
// Owner Reviews
// ======================================

export const getMyRestaurantReviews = async (req, res) => {
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

    const reviews = await Review.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};