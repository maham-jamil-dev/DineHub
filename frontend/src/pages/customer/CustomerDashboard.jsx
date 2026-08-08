import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

import {
  ShoppingBag,
  Star,
  TrendingUp,
  ChevronRight,
  Store,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";

import StatCard from "../../components/StatCard/StatCard";

function CustomerDashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    totalReviews: 0,
    loyaltyPoints: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/user/dashboard");
      setDashboard(res.data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">

      {/* Welcome */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-dark mb-2">
          Welcome back, {user?.fullName}! 👋
        </h1>

        <p className="text-gray-500">
          Here's what's happening with your account.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Total Orders"
          value={dashboard.totalOrders}
          change={0}
          icon={ShoppingBag}
          color="bg-primary"
        />

        <StatCard
          title="Reviews Given"
          value={dashboard.totalReviews}
          change={0}
          icon={Star}
          color="bg-gold"
        />

        <StatCard
          title="Loyalty Points"
          value={dashboard.loyaltyPoints}
          change={0}
          icon={TrendingUp}
          color="bg-green-500"
        />

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <Link
          to="/restaurants"
          className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
        >
          <Store className="h-10 w-10 text-primary mb-4" />

          <h2 className="text-xl font-bold mb-2">
            Browse Restaurants
          </h2>

          <p className="text-gray-500">
            Discover restaurants and menus.
          </p>
        </Link>

        <Link
          to="/customer/cart"
          className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
        >
          <ShoppingCart className="h-10 w-10 text-primary mb-4" />

          <h2 className="text-xl font-bold mb-2">
            My Cart
          </h2>

          <p className="text-gray-500">
            View your selected food items.
          </p>
        </Link>

        <Link
          to="/customer/orders"
          className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
        >
          <ClipboardList className="h-10 w-10 text-primary mb-4" />

          <h2 className="text-xl font-bold mb-2">
            My Orders
          </h2>

          <p className="text-gray-500">
            Track your previous orders.
          </p>
        </Link>

      </div>

      {/* Recent Orders */}

      <div className="card p-6">

        <div className="flex justify-between items-center mb-6">

          <h3 className="text-xl font-bold">
            Recent Orders
          </h3>

          <Link
            to="/customer/orders"
            className="text-primary flex items-center gap-1 font-semibold"
          >
            View All

            <ChevronRight size={18} />

          </Link>

        </div>

        {dashboard.recentOrders.length === 0 ? (

          <div className="text-center py-10 text-gray-500">

            No Orders Found

          </div>

        ) : (

          <div className="space-y-4">

            {dashboard.recentOrders.map((order) => (

              <div
                key={order._id}
                className="flex justify-between items-center bg-gray-50 rounded-xl p-5"
              >

                <div>

                  <h2 className="font-bold text-lg">
                    {order.restaurant?.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-primary text-lg">
                    Rs {order.totalAmount}
                  </p>

                  <span
                    className={`text-sm font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerDashboard;