import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import MenuItemCard from "../components/MenuItemCard/MenuItemCard";
import API from "../api/api";

const IMAGE_URL = "http://localhost:5000";

function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchMenu();
  }, [id]);

  const fetchMenu = async () => {
    try {
      const res = await API.get(`/menu/restaurant/${id}`);

      setMenuItems(res.data.menu || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  const handleAddToCart = async (item, quantity) => {

  const token = localStorage.getItem("token");

  if (!token) {
    toast.info("Please login first to add items to cart.");
    navigate("/login");
    return;
  }

  try {
    await API.post(
      "/cart/add",
      {
        menuItem: item._id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      setCart((prev) => ({
        ...prev,
        [item._id]: {
          ...item,
          quantity,
        },
      }));

      toast.success("Added To Cart!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable To Add Cart"
      );
    }
  };

  const cartItems = Object.values(cart);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      await API.post(
        "/orders/place",
        {
          items: cartItems.map((item) => ({
            menuItem: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      toast.success("Order Placed Successfully!");

      setCart({});
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Order Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">

      <div className="max-w-7xl mx-auto px-4">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1">

            <h1 className="text-3xl font-bold mb-2">
              Restaurant Menu
            </h1>

            <p className="text-gray-500 mb-6">
              Choose your favourite dishes
            </p>

            <div className="flex gap-2 overflow-x-auto mb-6">

              {categories.map((cat) => (

                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                >
                  {cat}
                </button>

              ))}

            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-10">
                No Menu Available
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item._id}
                    item={{
                      ...item,
                      id: item._id,
                      image: item.image
                        ? `${IMAGE_URL}${item.image}`
                        : "/logo.png",
                    }}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
                    {/* Cart Sidebar */}

          <div className="lg:w-80">

            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100">

              <div className="flex items-center gap-2 mb-4">

                <ShoppingCart className="h-6 w-6 text-primary" />

                <h2 className="text-xl font-bold">
                  Your Cart
                </h2>

                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full ml-auto">
                  {cartCount}
                </span>

              </div>

              {cartItems.length === 0 ? (

                <p className="text-center text-gray-400 py-8">
                  Your cart is empty
                </p>

              ) : (

                <div className="space-y-3 mb-4">

                  {cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b pb-3"
                    >

                      <div>

                        <h4 className="font-semibold">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Qty : {item.quantity}
                        </p>

                      </div>

                      <div className="font-bold text-primary">
                        Rs. {item.price * item.quantity}
                      </div>

                    </div>

                  ))}

                </div>

              )}

              <div className="border-t pt-4">

                <div className="flex justify-between mb-4">

                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-primary">
                    Rs. {cartTotal}
                  </span>

                </div>

                <button
                  disabled={cartItems.length === 0}
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold"
                >
                  Place Order
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MenuPage;