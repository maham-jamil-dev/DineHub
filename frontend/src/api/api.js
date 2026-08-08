import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===========================
// Add JWT Token Automatically
// ===========================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===========================
// AUTH
// ===========================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ===========================
// RESTAURANT
// ===========================

// Public
export const getRestaurants = () =>
  API.get("/restaurants");

export const getRestaurantById = (id) =>
  API.get(`/restaurants/${id}`);

// Owner
export const createRestaurant = (data) =>
  API.post("/restaurants/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMyRestaurant = () =>
  API.get("/restaurants/my");

export const updateRestaurant = (data) =>
  API.put("/restaurants/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteRestaurant = () =>
  API.delete("/restaurants/delete");

// Owner Dashboard
export const getOwnerDashboard = () =>
  API.get("/restaurants/owner/dashboard");

// ===========================
// MENU
// ===========================

// Customer
export const getRestaurantMenu = (restaurantId) =>
  API.get(`/menu/restaurant/${restaurantId}`);

// Owner
export const getMyMenu = () =>
  API.get("/menu/my");

export const addMenuItem = (data) =>
  API.post("/menu/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateMenuItem = (id, data) =>
  API.put(`/menu/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteMenuItem = (id) =>
  API.delete(`/menu/delete/${id}`);

// ===========================
// ADMIN
// ===========================

export const getAdminRestaurants = () =>
  API.get("/admin/restaurants");

export const getAdminAnalytics = () =>
  API.get("/admin/analytics");

export const getAdminReportsData = () =>
  API.get("/admin/reports-data");

export const approveRestaurant = (id) =>
  API.put(`/admin/restaurant/approve/${id}`);

export const rejectRestaurant = (id) =>
  API.put(`/admin/restaurant/reject/${id}`);
// ===========================
// CART
// ===========================

export const addToCart = (data) =>
  API.post("/cart/add", data);

export const getMyCart = () =>
  API.get("/cart/my");

export const updateCartItem = (id, data) =>
  API.put(`/cart/update/${id}`, data);

export const removeCartItem = (id) =>
  API.delete(`/cart/delete/${id}`);

export const clearCart = () =>
  API.delete("/cart/clear");

// ===========================
// ORDER
// ===========================

export const placeOrder = (data) =>
  API.post("/orders/create", data);

export const getMyOrders = () =>
  API.get("/orders/my");


// ===========================
// RESERVATIONS
// ===========================

// Customer
export const createReservation = (data) =>
  API.post("/reservations/create", data);

export const getMyReservations = () =>
  API.get("/reservations/my");

// Owner
export const getRestaurantReservations = () =>
  API.get("/reservations/restaurant");

export const updateReservationStatus = (id, data) =>
  API.put(`/reservations/status/${id}`, data);


// ===========================
// ADMIN RESERVATIONS
// ===========================

export const getAllReservations = () =>
  API.get("/admin/reservations");

export const deleteReservation = (id) =>
  API.delete(`/admin/reservation/${id}`);

export const createReview = (data) => {
  return API.post("/reviews/add", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getOwnerReviews = () =>
  API.get("/reviews/my");
export default API;
