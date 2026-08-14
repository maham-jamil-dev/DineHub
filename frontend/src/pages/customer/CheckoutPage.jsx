import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapPin, ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";

import API from "../../api/api";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod] = useState("Cash On Delivery");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ============================
  // Fetch Cart
  // ============================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await API.get("/cart/my");

      setCart(res.data.cart || []);
    } catch (error) {
      console.error("Fetch cart error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ============================
  // Calculate Total
  // ============================

  const total = cart.reduce((sum, item) => {
    const price = item.menuItem?.price || 0;
    const quantity = item.quantity || 0;

    return sum + price * quantity;
  }, 0);

  // ============================
  // Place Order
  // ============================

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await API.post("/orders/create", {
        deliveryAddress: address.trim(),
        paymentMethod: "Cash On Delivery",
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");

        setCart([]);
        setAddress("");

        navigate("/customer/orders");
      } else {
        toast.error(
          res.data.message || "Order placement failed"
        );
      }
    } catch (error) {
      console.error("Place order error:", error);

      toast.error(
        error.response?.data?.message ||
          "Order placement failed"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  // ============================
  // Empty Cart
  // ============================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">

          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-dark mb-2">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-6">
            Add some delicious items to your cart before
            checking out.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
            className="btn-primary px-6 py-3"
          >
            Browse Restaurants
          </button>

        </div>
      </div>
    );
  }

  // ============================
  // Checkout UI
  // ============================

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-display font-bold text-dark">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order and delivery details
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ============================
              Order Summary
          ============================ */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-dark">
                  Your Order
                </h2>

                <p className="text-sm text-gray-500">
                  {cart.length}{" "}
                  {cart.length === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

            </div>

            {/* Cart Items */}

            <div className="space-y-4">

              {cart.map((item) => {

                const menuItem = item.menuItem;

                if (!menuItem) {
                  return null;
                }

                const itemTotal =
                  (menuItem.price || 0) *
                  (item.quantity || 0);

                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4"
                  >

                    {/* Image */}

                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                      {menuItem.image ? (
                        <img
                          src={
                            menuItem.image.startsWith(
                              "http"
                            )
                              ? menuItem.image
                              : `http://localhost:5000${menuItem.image}`
                          }
                          alt={menuItem.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-7 w-7 text-gray-400" />
                        </div>
                      )}

                    </div>

                    {/* Item Details */}

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-dark truncate">
                        {menuItem.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Rs. {menuItem.price} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    {/* Item Total */}

                    <p className="font-bold text-dark">
                      Rs. {itemTotal}
                    </p>

                  </div>
                );
              })}

            </div>

            {/* Total */}

            <div className="border-t border-gray-200 mt-6 pt-5">

              <div className="flex items-center justify-between">

                <span className="text-lg font-semibold text-gray-700">
                  Total
                </span>

                <span className="text-2xl font-bold text-primary">
                  Rs. {total}
                </span>

              </div>

            </div>

          </div>

          {/* ============================
              Delivery + Payment
          ============================ */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            {/* Delivery Details */}

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-dark">
                  Delivery Details
                </h2>

                <p className="text-sm text-gray-500">
                  Where should we deliver your order?
                </p>
              </div>

            </div>

            {/* Address */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </label>

              <textarea
                rows="5"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Enter your complete delivery address..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
              />

            </div>

            {/* Payment Method */}

            <div className="mb-6">

              <div className="flex items-center gap-2 mb-3">

                <CreditCard className="h-5 w-5 text-primary" />

                <label className="text-sm font-semibold text-gray-700">
                  Payment Method
                </label>

              </div>

              <div className="border border-primary/30 bg-red-50 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">

                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>

                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order is delivered
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Place Order Button */}

            <button
              onClick={handleOrder}
              disabled={placingOrder}
              className="w-full btn-primary py-3.5 text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {placingOrder
                ? "Placing Order..."
                : `Place Order — Rs. ${total}`}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;