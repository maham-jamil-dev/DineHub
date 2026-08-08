import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";
import DataTable from "../../components/DataTable/DataTable";

function OwnerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Orders
  // ==========================

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/restaurant");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================
  // Update Status
  // ==========================

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/status/${id}`, {
        orderStatus: status,
      });

      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update order");
    }
  };

  // ==========================
  // Table Columns
  // ==========================

  const columns = [
    {
      key: "_id",
      label: "Order ID",
      render: (row) => `#${row._id.slice(-6).toUpperCase()}`,
    },
    {
      key: "customer",
      label: "Customer",
      render: (row) => row.customer?.fullName || "N/A",
    },
    {
      key: "items",
      label: "Items",
      render: (row) =>
        row.items
          ?.map(
            (item) =>
              `${item.menuItem?.name || "Item"} (x${item.quantity})`
          )
          .join(", "),
    },
    {
      key: "totalAmount",
      label: "Total",
      render: (row) => (
        <span className="font-bold text-primary">
          Rs. {row.totalAmount}
        </span>
      ),
    },
    {
      key: "orderStatus",
      label: "Status",
      render: (row) => (
        <select
          value={row.orderStatus}
          onChange={(e) =>
            updateStatus(row._id, e.target.value)
          }
          className="border rounded-lg px-3 py-2 bg-white"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Preparing">Preparing</option>
          <option value="Out For Delivery">
            Out For Delivery
          </option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) =>
        new Date(row.createdAt).toLocaleString(),
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-10 text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Track and manage customer orders
      </p>

      <DataTable columns={columns} data={orders} />
    </div>
  );
}

export default OwnerOrders;