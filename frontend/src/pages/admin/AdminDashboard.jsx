import { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Users,
  ChefHat,
  ShoppingBag,
  DollarSign,
  Clock,
  Utensils,
  Calendar,
  Star,
  UserCheck,
} from "lucide-react";

import StatCard from "../../components/StatCard/StatCard";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalRestaurants: 0,
    totalMenus: 0,
    totalOrders: 0,
    totalReservations: 0,
    totalReviews: 0,
    pendingRestaurants: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setDashboard(res.data.dashboard || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Platform overview and management
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          icon={Users}
          color="bg-primary"
        />

        <StatCard
          title="Restaurant Owners"
          value={dashboard.totalOwners || 0}
          icon={UserCheck}
          color="bg-indigo-500"
        />

        <StatCard
          title="Restaurants"
          value={dashboard.totalRestaurants}
          icon={ChefHat}
          color="bg-gold"
        />

        <StatCard
          title="Menu Items"
          value={dashboard.totalMenus}
          icon={Utensils}
          color="bg-purple-500"
        />

        <StatCard
          title="Total Orders"
          value={dashboard.totalOrders}
          icon={ShoppingBag}
          color="bg-green-500"
        />

        <StatCard
          title="Reservations"
          value={dashboard.totalReservations || 0}
          icon={Calendar}
          color="bg-cyan-500"
        />

        <StatCard
          title="Reviews"
          value={dashboard.totalReviews || 0}
          icon={Star}
          color="bg-amber-500"
        />

        <StatCard
          title="Pending Orders"
          value={dashboard.pendingOrders}
          icon={Clock}
          color="bg-yellow-500"
        />

        <StatCard
          title="Total Revenue"
          value={`Rs. ${dashboard.totalRevenue || 0}`}
          icon={DollarSign}
          color="bg-blue-500"
        />

      </div>

    </div>
  );
}

export default AdminDashboard;