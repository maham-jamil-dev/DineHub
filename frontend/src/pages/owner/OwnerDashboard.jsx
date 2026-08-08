import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import {
  ShoppingBag,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";

import StatCard from "../../components/StatCard/StatCard";

function OwnerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await API.get(
        "/restaurants/owner/dashboard"
      );

      setDashboard(res.data.dashboard);
    } catch (error) {
      if (error.response?.status === 404) {
        navigate("/owner/restaurant");
        return;
      }

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
      <div className="text-center py-10">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        Owner Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your restaurant performance
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Orders"
          value={dashboard.totalOrders}
          icon={ShoppingBag}
          color="bg-primary"
        />

        <StatCard
          title="Revenue"
          value={`Rs. ${dashboard.totalRevenue}`}
          icon={DollarSign}
          color="bg-green-500"
        />

        <StatCard
          title="Customers"
          value={dashboard.totalCustomers}
          icon={Users}
          color="bg-blue-500"
        />

        <StatCard
          title="Preparing"
          value={dashboard.preparingOrders}
          icon={Clock}
          color="bg-yellow-500"
        />

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Orders
        </h2>

        {dashboard.recentOrders.length === 0 ? (

          <p className="text-gray-500">
            No Orders Found
          </p>

        ) : (

          <div className="space-y-4">

            {dashboard.recentOrders.map((order) => (

              <div
                key={order._id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">
                    {order.customer?.fullName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm mt-1">
                    Status :
                    <span className="font-semibold ml-1">
                      {order.orderStatus}
                    </span>
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-primary text-xl">
                    Rs. {order.totalAmount}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {order.items.length} Items
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default OwnerDashboard;