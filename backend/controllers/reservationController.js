import Reservation from "../models/Reservation.js";
import Restaurant from "../models/Restaurant.js";

// ======================================
// Create Reservation
// ======================================

export const createReservation = async (req, res) => {
  try {

    const {
      restaurant,
      reservationDate,
      reservationTime,
      guests,
      specialRequest,
    } = req.body;

    if (!reservationDate || !reservationTime || !guests) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required reservation details",
      });
    }

    const selectedDate = new Date(reservationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: "Reservation date must be today or a future date",
      });
    }

    const restaurantData = await Restaurant.findById(restaurant);

    if (!restaurantData) {
      return res.status(404).json({
        success:false,
        message:"Restaurant Not Found"
      });
    }

   const bookedTables = await Reservation.countDocuments({
  restaurant,
  reservationDate,
  reservationTime,
  status: "Confirmed",
});

    if(bookedTables >= restaurantData.totalTables){

      return res.status(400).json({

        success:false,

        message:"No Table Available For This Time"

      });

    }

    const reservation = await Reservation.create({

      customer:req.user._id,

      restaurant,

      reservationDate,

      reservationTime,

      guests,

      specialRequest,

      status:"Pending"

    });

    res.status(201).json({

      success:true,

      message:"Reservation Request Sent",

      reservation

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// ======================================
// Customer Reservations
// ======================================

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      customer: req.user._id,
    })
      .populate("restaurant", "name image location")
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

// ======================================
// Owner Reservations
// ======================================

export const getRestaurantReservations = async (req, res) => {
  try {
    // Owner ka restaurant find karo
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found",
      });
    }

    // Sirf us restaurant ki reservations
    const reservations = await Reservation.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "fullName email")
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

// ======================================
// Update Reservation Status
// ======================================

export const updateReservationStatus = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation Not Found",
      });
    }

    reservation.status = req.body.status;
    reservation.tableNumber = req.body.tableNumber;

    console.log("Before Save:", reservation);

    await reservation.save();

    console.log("After Save:", reservation);

    res.status(200).json({
      success: true,
      message: "Reservation Updated Successfully",
      reservation,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};