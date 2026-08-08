import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import {
  getMyCart,
  updateCartItem,
  removeCartItem,
} from "../../api/api";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Cart
  // ==========================

  const fetchCart = async () => {
    try {
      const res = await getMyCart();
      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ==========================
  // Increase Quantity
  // ==========================

  const increaseQty = async (item) => {
    try {
      await updateCartItem(item._id, {
        quantity: item.quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Decrease Quantity
  // ==========================

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateCartItem(item._id, {
        quantity: item.quantity - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Remove Item
  // ==========================

  const deleteItem = async (id) => {
    try {
      await removeCartItem(id);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Total
  // ==========================

  const subtotal = cart.reduce((total, item) => {
    return (
      total +
      item.menuItem.price * item.quantity
    );
  }, 0);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Cart
      </h1>

      {cart.length === 0 ? (

        <div className="text-center py-20">

          <ShoppingBag
            size={80}
            className="mx-auto text-gray-300 mb-5"
          />

          <h2 className="text-2xl font-semibold mb-3">
            Cart is Empty
          </h2>

          <p className="text-gray-500 mb-6">
            Add delicious food to your cart.
          </p>

          <Link
            to="/restaurants"
            className="btn-primary"
          >
            Browse Restaurants
          </Link>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 flex gap-5"
              >

                <img
                  src={`http://localhost:5000${item.menuItem.image}`}
                  alt={item.menuItem.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.menuItem.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Rs {item.menuItem.price}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

                <div className="flex flex-col justify-between items-end">

                  <button
                    onClick={() =>
                      deleteItem(item._id)
                    }
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>

                  <h3 className="font-bold text-lg">

                    Rs{" "}
                    {item.menuItem.price *
                      item.quantity}

                  </h3>

                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="bg-white rounded-xl shadow p-6 h-fit">

            <h2 className="text-xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">

              <span>Subtotal</span>

              <span>Rs {subtotal}</span>

            </div>

            <div className="flex justify-between mb-3">

              <span>Delivery Fee</span>

              <span>Rs 200</span>

            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>
                Rs {subtotal + 200}
              </span>

            </div>

            <Link
  to="/customer/checkout"
  className="btn-primary w-full mt-6 flex justify-center items-center gap-2"
>

              Checkout

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default CartPage;