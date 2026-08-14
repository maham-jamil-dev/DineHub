import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getMyCart,
  updateCartItem,
  removeCartItem,
} from "../../api/api";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ============================
  // Fetch Cart
  // ============================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getMyCart();

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
  // Increase Quantity
  // ============================

  const increaseQty = async (item) => {
    try {
      setUpdating(true);

      await updateCartItem(item._id, {
        quantity: item.quantity + 1,
      });

      await fetchCart();
    } catch (error) {
      console.error("Increase quantity error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // Decrease Quantity
  // ============================

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) {
      toast.info("Minimum quantity is 1");
      return;
    }

    try {
      setUpdating(true);

      await updateCartItem(item._id, {
        quantity: item.quantity - 1,
      });

      await fetchCart();
    } catch (error) {
      console.error("Decrease quantity error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // Remove Item
  // ============================

  const deleteItem = async (id) => {
    try {
      setUpdating(true);

      await removeCartItem(id);

      toast.success("Item removed from cart");

      await fetchCart();
    } catch (error) {
      console.error("Delete cart item error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // Subtotal
  // ============================

  const subtotal = cart.reduce((total, item) => {
    const price = item.menuItem?.price || 0;
    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);

  // ============================
  // Delivery Fee
  // ============================

  const deliveryFee = 200;

  // ============================
  // Final Total
  // ============================

  const total = subtotal + deliveryFee;

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">

          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">
            Loading your cart...
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

        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">

          <ShoppingBag
            size={80}
            className="mx-auto text-gray-300 mb-5"
          />

          <h2 className="text-2xl font-bold text-dark mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mb-6">
            Add some delicious food to your cart
            and come back here.
          </p>

          <Link
            to="/restaurants"
            className="btn-primary inline-flex items-center justify-center"
          >
            Browse Restaurants
          </Link>

        </div>

      </div>
    );
  }

  // ============================
  // Cart Page
  // ============================

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* ============================
            Header
        ============================ */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-display font-bold text-dark">
            My Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your items before checkout
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ============================
              Cart Items
          ============================ */}

          <div className="lg:col-span-2 space-y-5">

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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >

                  <div className="flex gap-5">

                    {/* ============================
                        Image
                    ============================ */}

                    <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

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
                          <ShoppingBag
                            size={32}
                            className="text-gray-400"
                          />
                        </div>
                      )}

                    </div>

                    {/* ============================
                        Item Details
                    ============================ */}

                    <div className="flex-1 min-w-0">

                      <h2 className="text-xl font-bold text-dark">
                        {menuItem.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Rs. {menuItem.price}
                      </p>

                      {/* Quantity */}

                      <div className="flex items-center gap-3 mt-5">

                        <button
                          onClick={() =>
                            decreaseQty(item)
                          }
                          disabled={updating}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition disabled:opacity-50"
                        >
                          <Minus size={17} />
                        </button>

                        <span className="font-semibold text-lg min-w-[25px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(item)
                          }
                          disabled={updating}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition disabled:opacity-50"
                        >
                          <Plus size={17} />
                        </button>

                      </div>

                    </div>

                    {/* ============================
                        Right Side
                    ============================ */}

                    <div className="flex flex-col justify-between items-end">

                      <button
                        onClick={() =>
                          deleteItem(item._id)
                        }
                        disabled={updating}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div className="text-right">

                        <p className="text-sm text-gray-500 mb-1">
                          Item Total
                        </p>

                        <h3 className="font-bold text-lg text-dark">
                          Rs. {itemTotal}
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ============================
              Order Summary
          ============================ */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit lg:sticky lg:top-6">

            <h2 className="text-xl font-bold text-dark mb-6">
              Order Summary
            </h2>

            {/* Subtotal */}

            <div className="flex justify-between mb-4 text-gray-600">

              <span>
                Subtotal
              </span>

              <span className="font-medium text-dark">
                Rs. {subtotal}
              </span>

            </div>

            {/* Delivery */}

            <div className="flex justify-between mb-4 text-gray-600">

              <span>
                Delivery Fee
              </span>

              <span className="font-medium text-dark">
                Rs. {deliveryFee}
              </span>

            </div>

            <hr className="my-5" />

            {/* Total */}

            <div className="flex justify-between items-center text-xl font-bold">

              <span className="text-dark">
                Total
              </span>

              <span className="text-primary">
                Rs. {total}
              </span>

            </div>

            {/* Payment Information */}

            <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100">

              <p className="text-sm font-semibold text-dark">
                Payment Method
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Cash on Delivery
              </p>

            </div>

            {/* Checkout */}

            <Link
              to="/customer/checkout"
              className="btn-primary w-full mt-6 py-3.5 flex justify-center items-center gap-2"
            >
              Proceed to Checkout

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartPage;