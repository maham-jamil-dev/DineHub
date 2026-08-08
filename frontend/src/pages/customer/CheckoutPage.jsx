import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";
function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart/my");
      setCart(res.data.cart || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.menuItem?.price || 0) * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter a valid delivery address");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      await API.post("/orders/create", {
        deliveryAddress: address.trim(),
        paymentMethod,
      });
      toast.success("Order Placed Successfully!");

      navigate("/customer/orders");

    } catch (err) {
      toast.error(err.response?.data?.message || "Order placement failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <h2 className="text-xl font-semibold mb-4">
            Your Order
          </h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="flex justify-between border-b py-3"
            >

              <div>

                <p className="font-semibold">
                  {item.menuItem.name}
                </p>

                <p>
                  Qty : {item.quantity}
                </p>

              </div>

              <p>
                Rs{" "}
                {item.menuItem.price *
                  item.quantity}
              </p>

            </div>

          ))}

          <h2 className="text-xl font-bold mt-5">
            Total : Rs {total}
          </h2>

        </div>

        <div>

          <h2 className="text-xl font-semibold mb-4">
            Delivery Details
          </h2>

          <textarea
            className="input-field w-full"
            rows="4"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <select
            className="input-field mt-4 w-full"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option>Cash On Delivery</option>
            <option>Card</option>
            <option>Online</option>
          </select>

          <button
            onClick={handleOrder}
            className="btn-primary mt-6 w-full"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;