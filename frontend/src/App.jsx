import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// ============================
// Public Pages
// ============================
import LandingPage from "./pages/LandingPage";
import RestaurantListingPage from "./pages/RestaurantListingPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import MenuPage from "./pages/MenuPage";
import BlogListingPage from "./pages/BlogListingPage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
// ============================
// Auth Pages
// ============================
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ============================
// Customer Pages
// ============================
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MyOrders from "./pages/customer/MyOrders";
import CheckoutPage from "./pages/customer/CheckoutPage";
import CartPage from "./pages/customer/Cart";
import ReserveTable from "./pages/customer/ReserveTable";
import MyReservations from "./pages/customer/MyReservations";
// ============================
// Owner Pages
// ============================
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import ManageRestaurant from "./pages/owner/ManageRestaurant";
import ManageMenu from "./pages/owner/ManageMenu";
import OwnerOrders from "./pages/owner/OwnerOrders";
import OwnerAnalytics from "./pages/owner/OwnerAnalytics";
import AddMenu from "./pages/owner/AddMenu";
import EditMenu from "./pages/owner/EditMenu";
import OwnerReservations from "./pages/owner/OwnerReservations";
import OwnerReviews from "./pages/owner/OwnerReviews";

// ============================
// Admin Pages
// ============================
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminReports from "./pages/admin/AdminReports";
import ManageReservations from "./pages/admin/ManageReservations";
import ManageBlogs from "./pages/admin/ManageBlogs";
function App() {
  return (
    <>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/restaurants"
            element={<RestaurantListingPage />}
          />

          <Route
            path="/restaurant/:id"
            element={<RestaurantDetailPage />}
          />

          <Route
            path="/menu/:id"
            element={<MenuPage />}
          />

          {/* Blog */}
          <Route
            path="/blog"
            element={<BlogListingPage />}
          />

          <Route
            path="/blog/:id"
            element={<BlogDetailPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />
        </Route>

        {/* =====================================================
            AUTH ROUTES
        ====================================================== */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Route>

        {/* =====================================================
            CUSTOMER ROUTES
        ====================================================== */}
        <Route
          element={
            <DashboardLayout allowedRoles={["customer"]} />
          }
        >
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/cart"
            element={<CartPage />}
          />

          <Route
            path="/customer/reserve-table/:restaurantId"
            element={<ReserveTable />}
          />

          <Route
            path="/customer/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/customer/orders"
            element={<MyOrders />}
          />

          <Route
            path="/customer/reservations"
            element={<MyReservations />}
          />
  
        </Route>

        {/* =====================================================
            OWNER ROUTES
        ====================================================== */}
        <Route
          element={
            <DashboardLayout allowedRoles={["owner"]} />
          }
        >
          <Route
            path="/owner/dashboard"
            element={<OwnerDashboard />}
          />

          <Route
            path="/owner/restaurant"
            element={<ManageRestaurant />}
          />

          <Route
            path="/owner/menu"
            element={<ManageMenu />}
          />

          <Route
            path="/owner/menu/add"
            element={<AddMenu />}
          />

          <Route
            path="/owner/menu/edit/:id"
            element={<EditMenu />}
          />

          <Route
            path="/owner/orders"
            element={<OwnerOrders />}
          />

          <Route
            path="/owner/analytics"
            element={<OwnerAnalytics />}
          />

          <Route
            path="/owner/reservations"
            element={<OwnerReservations />}
          />

          <Route
            path="/owner/reviews"
            element={<OwnerReviews />}
          />
        </Route>

        {/* =====================================================
            ADMIN ROUTES
        ====================================================== */}
        <Route
          element={
            <DashboardLayout allowedRoles={["admin"]} />
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

          <Route
            path="/admin/restaurants"
            element={<ManageRestaurants />}
          />

          <Route
            path="/admin/analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="/admin/reports"
            element={<AdminReports />}
          />

          <Route
            path="/admin/reservations"
            element={<ManageReservations />}
          />
          <Route
  path="/admin/blogs"
  element={<ManageBlogs />}
/>
        </Route>
      </Routes>

      {/* =====================================================
          GLOBAL TOAST NOTIFICATIONS
      ====================================================== */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;