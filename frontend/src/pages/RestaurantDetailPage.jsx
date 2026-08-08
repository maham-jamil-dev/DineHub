import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";

import API, { addToCart } from "../api/api";
import ReviewCard from "../components/ReviewCard/ReviewCard";

const IMAGE_URL = "http://localhost:5000";

function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
    fetchReviews();
  }, [id]);
  const handleAddToCart = async (item) => {

  const token = localStorage.getItem("token");

  if (!token) {
    toast.info("Please login first to add items to cart.");
    navigate("/login");
    return;
  }

  try {
    // existing code...

    const res = await addToCart({

      menuItem: item._id,
      quantity: 1,

    });

    toast.success(res.data.message);

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed To Add To Cart"
    );

  }

};

  const fetchRestaurant = async () => {
    try {
      const res = await API.get(`/restaurants/${id}`);

      setRestaurant(res.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await API.get(`/menu/restaurant/${id}`);

      setMenuItems(res.data.menu || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/restaurant/${id}`);

      setReviews(res.data.reviews || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Restaurant Not Found
      </div>
    );
  }

  const image =
    restaurant.image && restaurant.image.startsWith("http")
      ? restaurant.image
      : `${IMAGE_URL}${restaurant.image}`;

  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}

      <div className="relative h-80 md:h-96">

        <img
          src={image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-xl text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

          <div className="max-w-7xl mx-auto">

            <div className="flex items-start justify-between">

              <div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {restaurant.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">

                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {restaurant.rating || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {restaurant.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.timing}
                  </span>

                </div>

              </div>

              <div className="flex gap-2">

                <button className="p-3 bg-white/20 rounded-xl text-white">
                  <Heart className="h-5 w-5" />
                </button>

                <button className="p-3 bg-white/20 rounded-xl text-white">
                  <Share2 className="h-5 w-5" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            {/* About */}

            <div className="card p-6">

              <h2 className="text-xl font-bold mb-3">
                About Restaurant
              </h2>

              <p className="text-gray-500">
                {restaurant.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">
                    Cuisine
                  </p>

                  <p className="font-semibold">
                    {restaurant.cuisine}
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">
                    Price
                  </p>

                  <p className="font-semibold">
                    {restaurant.priceRange}
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {restaurant.phone}
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">
                    Timing
                  </p>

                  <p className="font-semibold">
                    {restaurant.timing}
                  </p>
                </div>

              </div>

            </div>
                        {/* Menu Preview */}

            <div className="card p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold">
                  Popular Menu
                </h2>

                <Link
                  to={`/menu/${restaurant._id}`}
                  className="flex items-center gap-1 text-primary font-semibold"
                >
                  Full Menu
                  <ChevronRight className="h-4 w-4" />
                </Link>

              </div>

              {menuItems.length === 0 ? (

                <p className="text-gray-500">
                  No Menu Available
                </p>

              ) : (

                <div className="space-y-4">

                  {menuItems.slice(0, 5).map((item) => {

                    const menuImage =
                      item.image &&
                      item.image.startsWith("http")
                        ? item.image
                        : `${IMAGE_URL}${item.image}`;

                    return (

                      <div
                        key={item._id}
                        className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                      >

                        <img
                          src={menuImage}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                          onError={(e) => {
                            e.target.src = "/logo.png";
                          }}
                        />

                        <div className="flex-1">

                          <div className="flex justify-between">

                            <h4 className="font-bold">
                              {item.name}
                            </h4>

                            <span className="text-primary font-bold">
                              Rs. {item.price}
                            </span>

                          </div>

                          <p className="text-gray-500 text-sm mt-1">
                            {item.description}
                          </p>

                          <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {item.category}
                          </span>
<button
  onClick={() => handleAddToCart(item)}
  className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
>
  Add To Cart
</button>
                        </div>

                      </div>

                    );

                  })}

                </div>

              )}

            </div>

            {/* Reviews */}

            <div className="card p-6">

              <h2 className="text-xl font-bold mb-4">
                Customer Reviews
              </h2>

              {reviews.length === 0 ? (

                <p className="text-gray-500">
                  No Reviews Yet
                </p>

              ) : (

                <div className="space-y-4">

                  {reviews.map((review) => (

                    <ReviewCard
                      key={review._id}
                      review={review}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* Right Side */}

          <div className="space-y-6">

            <div className="card p-6 bg-primary text-white rounded-xl">

              <h3 className="text-xl font-bold mb-2">
                Reserve a Table
              </h3>

              <p className="text-white/80 text-sm mb-5">
                Book your dining experience now.
              </p>

  <Link
  to={`/customer/reserve-table/${restaurant._id}`}
  className="btn-primary"
>
  Book Now
</Link>
            </div>

            <div className="card p-6">

              <h3 className="font-bold text-xl mb-5">
                Restaurant Info
              </h3>

              <div className="space-y-5">

                <div className="flex gap-3">

                  <MapPin className="text-primary mt-1" />

                  <div>

                    <p className="font-semibold">
                      Address
                    </p>

                    <p className="text-gray-500">
                      {restaurant.location}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Phone className="text-primary mt-1" />

                  <div>

                    <p className="font-semibold">
                      Phone
                    </p>

                    <p className="text-gray-500">
                      {restaurant.phone}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Clock className="text-primary mt-1" />

                  <div>

                    <p className="font-semibold">
                      Timing
                    </p>

                    <p className="text-gray-500">
                      {restaurant.timing}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RestaurantDetailPage;