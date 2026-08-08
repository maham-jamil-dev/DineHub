import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";
import { createReview } from "../../api/api";
import ReviewModal from "../../components/ReviewModal";

import {
  Calendar,
  CheckCircle,
  Clock,
  ShoppingBag,
  CreditCard,
  MapPin,
} from "lucide-react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReviewSubmit = async (data) => {
    try {
      const res = await createReview(data);

      toast.success(res.data.message || "Review Added Successfully!");

      setShowReview(false);
      setSelectedOrder(null);

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Review Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-fade-in">

      <h1 className="text-3xl font-bold mb-2">
        My Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Track all your food orders
      </p>

      {orders.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <ShoppingBag
            size={60}
            className="mx-auto text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-bold">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't placed any order yet.
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                            {/* Restaurant */}

              <div className="flex items-center gap-4 p-5 border-b">

                <img
                  src={`http://localhost:5000${order.restaurant?.image}`}
                  alt={order.restaurant?.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {order.restaurant?.name}
                  </h2>

                  <p className="flex items-center text-gray-500 mt-2">
                    <Calendar size={16} className="mr-2" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-2xl font-bold text-primary">
                    Rs {order.totalAmount}
                  </h2>

                  {order.orderStatus === "Delivered" && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full mt-2">
                      <CheckCircle size={16} />
                      Delivered
                    </span>
                  )}

                  {order.orderStatus === "Preparing" && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mt-2">
                      <Clock size={16} />
                      Preparing
                    </span>
                  )}

                  {order.orderStatus !== "Delivered" &&
                    order.orderStatus !== "Preparing" && (
                      <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full mt-2">
                        {order.orderStatus}
                      </span>
                    )}

                </div>

              </div>

              {/* Ordered Items */}

              <div className="p-5">

                <h3 className="font-bold text-lg mb-4">
                  Ordered Items
                </h3>

                <div className="space-y-4">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b pb-4"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={`http://localhost:5000${item.menuItem?.image}`}
                          alt={item.menuItem?.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />

                        <div>

                          <h4 className="font-semibold">
                            {item.menuItem?.name}
                          </h4>

                          <p className="text-gray-500">
                            Quantity : {item.quantity}
                          </p>

                        </div>

                      </div>

                      <h4 className="font-bold">
                        Rs {item.price}
                      </h4>

                    </div>

                  ))}

                </div>

              </div>

              {/* Payment */}

              <div className="grid md:grid-cols-2 gap-6 p-5 bg-gray-50">

                <div>

                  <h3 className="font-semibold flex items-center gap-2">
                    <CreditCard size={18} />
                    Payment
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {order.paymentMethod}
                  </p>

                  <p className="text-gray-600">
                    Status : {order.paymentStatus}
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin size={18} />
                    Delivery Address
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {order.deliveryAddress}
                  </p>

                </div>

              </div>

              {/* Review Button */}

              {order.orderStatus === "Delivered" && (

                <div className="p-5 border-t flex justify-end">

                  <button
  onClick={() => {
    console.log(order);
    setSelectedOrder(order);
    setShowReview(true);
  }}
  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg"
>
  Write Review
</button>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

      {showReview && selectedOrder && (

        <ReviewModal
          order={selectedOrder}
          restaurantId={selectedOrder.restaurant._id}
          onClose={() => {
            setShowReview(false);
            setSelectedOrder(null);
          }}
          onSubmit={handleReviewSubmit}
        />

      )}

    </div>

  );

}

export default MyOrders;